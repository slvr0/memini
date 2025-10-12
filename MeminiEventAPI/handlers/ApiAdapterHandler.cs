using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeminiEventAPI.adapters;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Diagnostics;
using MeminiEventAPI.structures;
using MeminiEventAPI.mapping;
using MeminiEventAPI.api_datamodels;

namespace MeminiEventAPI.handlers
{
    public class ApiAdapterHandler
    {
        private readonly Dictionary<string, HttpConnectionResponse> _httpConnectionResponseInformation = new();
        private readonly Dictionary<string, ApiFetchMetrics> _apiFetchMetrics = new();
        private readonly IEnumerable<BaseAdapter> _adapters;
        private readonly bool connectionOutput = true;
        private readonly bool metricsOutput = true;

        private void OnSuccessfulFetch(object sender, HttpConnectionResponse httpConnectionResponse)
        {
            if (sender is not BaseAdapter adapter || httpConnectionResponse == null)
                return;

            _httpConnectionResponseInformation[adapter.AdapterId] = httpConnectionResponse;
        }

        private void OnSuccessfulCollectMetrics(object sender, ApiFetchMetrics apiFetchMetrics)
        {
            if (sender is not BaseAdapter adapter || apiFetchMetrics == null)
                return;

            _apiFetchMetrics[adapter.AdapterId] = apiFetchMetrics;
        }

        public ApiAdapterHandler(IEnumerable<BaseAdapter> adapters)
        {
            _adapters = adapters.ToList();

            foreach (var adapter in _adapters)
                Subscribe(adapter);
        }

        public void Subscribe(BaseAdapter adapter)
        {
            if (connectionOutput)
                adapter.FetchResponse += OnSuccessfulFetch!;
            if (metricsOutput)
                adapter.MetricsResponse += OnSuccessfulCollectMetrics!;
        }

        public async Task<MeminiApiResponse> FetchDataFromApis(Dictionary<string, ICollection<IApiRequest>> apiFetchRequestFormat)
        {
            var results = new MeminiApiResponse();
            var tasks = new List<Task<IApiResult?>>();

            foreach (var apiFetchRequest in apiFetchRequestFormat)
            {
                var baseAdapter = _adapters.FirstOrDefault(adapter => adapter.AdapterId == apiFetchRequest.Key);
                if (baseAdapter == null)
                    continue;

                tasks.Add(FetchDataFromApi(baseAdapter: baseAdapter, requestConfigs: apiFetchRequest.Value));
            }
            var completedResults = await Task.WhenAll(tasks);

            foreach(IApiResult? apiResult in completedResults)
            {
                if(apiResult == null)
                    continue;

                results.ApiResults[apiResult.AdapterId] = apiResult;
            }

            return results;                
        }

        private EventsApiResult CreateEventApiResult(string adapterId, List<MappingResult<NormalizedEvent>> mappedResult, int totalFetched, int totalMapped) => 
            new(adapterId, mappedResult, totalFetched, totalMapped);
        private PlacesApiResult CreatePlaceApiResult(string adapterId, List<MappingResult<NormalizedPlace>> mappedResult, int totalFetched, int totalMapped) =>
            new(adapterId, mappedResult, totalFetched, totalMapped);
        private NewsApiResult CreateNewsApiResult(string adapterId, List<MappingResult<NormalizedNews>> mappedResult, int totalFetched, int totalMapped) =>
            new(adapterId, mappedResult, totalFetched, totalMapped);
        private WeatherApiResult CreateWeatherApiResult(string adapterId, List<MappingResult<NormalizedWeather>> mappedResult, int totalFetched, int totalMapped) =>
            new(adapterId, mappedResult, totalFetched, totalMapped);

        private async Task<IApiResult?> FetchDataFromApi(BaseAdapter baseAdapter, ICollection<IApiRequest> requestConfigs)
        {
            IApiResult apiResult = null;
            try
            {
                if (baseAdapter is IEventAdapter eventApiBaseAdapter)
                {
                    await eventApiBaseAdapter.FetchAllAndDeserialize(requestConfigs, new System.Text.Json.JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
                    List<MappingResult<NormalizedEvent>> mappingResult = eventApiBaseAdapter.MapToNormalizedEvents();
                    apiResult = CreateEventApiResult(mappedResult: mappingResult, adapterId: baseAdapter.AdapterId, totalFetched: eventApiBaseAdapter.GetAccumulatedFetchData(), totalMapped: mappingResult.Count);
                }
                else if (baseAdapter is IPlaceAdapter placeApiBaseAdapter)
                {
                    await placeApiBaseAdapter.FetchAllAndDeserialize(requestConfigs, new System.Text.Json.JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
                    List<MappingResult<NormalizedPlace>> mappingResult = placeApiBaseAdapter.MapToNormalizedPlaces();
                    apiResult = CreatePlaceApiResult(mappedResult: mappingResult, adapterId: baseAdapter.AdapterId, totalFetched: placeApiBaseAdapter.GetAccumulatedFetchData(), totalMapped: mappingResult.Count);
                }
                else if (baseAdapter is INewsAdapter newsApiBaseAdapter)
                {
                    await newsApiBaseAdapter.FetchAllAndDeserialize(requestConfigs, new System.Text.Json.JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
                    List<MappingResult<NormalizedNews>> mappingResult = newsApiBaseAdapter.MapToNormalizedNews();
                    apiResult = CreateNewsApiResult(mappedResult: mappingResult, adapterId: baseAdapter.AdapterId, totalFetched: newsApiBaseAdapter.GetAccumulatedFetchData(), totalMapped: mappingResult.Count);
                }
                else if (baseAdapter is IWeatherAdapter weatherApiBaseAdapter)
                {
                    await weatherApiBaseAdapter.FetchAllAndDeserialize(requestConfigs, new System.Text.Json.JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
                    List<MappingResult<NormalizedWeather>> mappingResult = weatherApiBaseAdapter.MapToNormalizedWeather();
                    apiResult = CreateWeatherApiResult(mappedResult: mappingResult, adapterId: baseAdapter.AdapterId, totalFetched: weatherApiBaseAdapter.GetAccumulatedFetchData(), totalMapped: mappingResult.Count);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);               
            }

            return apiResult;
        }



    }
}

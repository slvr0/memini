using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using MeminiEventAPI.Attributes;
using MeminiEventAPI.handlers;
using MeminiEventAPI.structures;
using MeminiEventAPI.api_datamodels;
using MeminiEventAPI.api_datamodels.ticketmaster;
using MeminiEventAPI.mapping;

namespace MeminiEventAPI.adapters;

public abstract class BaseAdapter
{
    protected readonly HttpClient _httpClient;
    public string AdapterId;
    public string ApiKey { get; set; } = string.Empty;

    public event EventHandler<HttpConnectionResponse>? FetchResponse;
    public event EventHandler<ApiFetchMetrics>? MetricsResponse;

    protected BaseAdapter(HttpClient httpClient, string adapterId)
    {
        _httpClient = httpClient;
        AdapterId = adapterId;
        ApiKey = BaseAdapter.ExtractApiKey(_httpClient);
    }
    /* Requires implementation */
    public abstract string GenerateApiRequestUrl(IApiRequest requestConfig);    

    public void InvokeHttpResponse(string url, int statusCode, Exception? exception = null)
    {
        FetchResponse?.Invoke(this, new HttpConnectionResponse
        {
            Source = AdapterId,
            Url = url,
            StatusCode = statusCode,
            Exception = exception,
            ErrorMessage = exception?.Message ?? ""
        });
    }

    public void InvokeDataMetricsResponse(int eventCount, int responseSizeInBytes, Exception? exception = null)
    {
        MetricsResponse?.Invoke(this, new ApiFetchMetrics
        {
            EventCount = eventCount,
            ResponseSizeBytes = responseSizeInBytes,
            Exception = exception,
            ErrorMessage = exception?.Message ?? ""
        });
    }
    private static string ExtractApiKey(HttpClient httpClient)
    {
        var authHeader = httpClient.DefaultRequestHeaders.Authorization;
        if (authHeader != null && authHeader.Scheme == "Bearer")
        {
            return authHeader.Parameter ?? "";
        }
        return "";
    }
    public virtual async Task<string> FetchDataAsync(IApiRequest requestConfig)
    {
        string url = GenerateApiRequestUrl(requestConfig);
        HttpResponseMessage? response = null;
        try
        {
            response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            InvokeHttpResponse(url, (int)response.StatusCode, null);
            return content;
        }
        catch (OperationCanceledException)
        {
            InvokeHttpResponse(url, 408, new Exception("Request timeout")); // 408 = Request Timeout
            throw;
        }
        catch (Exception e)
        {
            InvokeHttpResponse(url, (int?)response?.StatusCode ?? 0, e);
            throw;
        }
    }

    public Task FetchOneAndDeserialize(IApiRequest requestconfig, JsonSerializerOptions options) => FetchAllAndDeserialize(new List<IApiRequest> () { requestconfig }, options);
    public abstract Task FetchAllAndDeserialize(ICollection<IApiRequest> requestconfigs, JsonSerializerOptions options);
}
public abstract class ApiBaseAdapter<TDModel, TDModelResult> : BaseAdapter where TDModel : IApiDataModel
{
    protected List<TDModelResult> AccumulatedData { get; } = new List<TDModelResult>(); //Accumulated data from each http fetch to the API.
    protected ApiBaseAdapter(HttpClient httpClient, string adapterId)
      : base(httpClient, adapterId) { }

    /* Requires implementation */
    protected abstract int ApiDataModelTotalResult(TDModel dataModel); // The datamodel tree varies, specific adapter points the nested total result
    protected abstract Task<List<TDModelResult>> ApiDataModelResult(TDModel dataModel); // The datamodel tree varies, specific adapter points the nested result  
    
    public void ClearAccumulatedData() => AccumulatedData.Clear();
}

public abstract class EventApiBaseAdapter<TDModel, TDModelResult> : ApiBaseAdapter<TDModel, TDModelResult>, IEventAdapter where TDModel : IApiDataModel {
     
    protected EventApiBaseAdapter(HttpClient httpClient, string adapterId)
      : base(httpClient, adapterId) { }

    public abstract List<MappingResult<NormalizedEvent>> MapToNormalizedEvents(double keepThreshold = 0.1);
    public int GetAccumulatedFetchData()  => AccumulatedData.Count;

    //I dont enjoy this being in two places in the IEvent/PlaceAdapter but at this point i need to move on
    public override async Task FetchAllAndDeserialize(ICollection<IApiRequest> requestconfigs, JsonSerializerOptions options)
    {
        try
        {
            int delayMilliseconds = 1000;
            foreach (IApiRequest requestConfig in requestconfigs)
            {
                string jsonData = await this.FetchDataAsync(requestConfig);
                long responseSizeBytes = System.Text.Encoding.UTF8.GetByteCount(jsonData);
                using var stream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(jsonData));
                var result = await System.Text.Json.JsonSerializer.DeserializeAsync<TDModel>(stream, options);
                int eventCount = ApiDataModelTotalResult(result);
                InvokeDataMetricsResponse(eventCount, (int)responseSizeBytes, null);
                List<TDModelResult> resultData = await ApiDataModelResult(result);
                AccumulatedData.AddRange(resultData);
                await Task.Delay(delayMilliseconds);
            }
        }       
        catch (Exception ex)
        {
            InvokeDataMetricsResponse(0, (int)0, ex);
        }
        return;
    }
}

public abstract class PlacesApiBaseAdapter<TDModel, TDModelResult> : ApiBaseAdapter<TDModel, TDModelResult>, IPlaceAdapter where TDModel : IApiDataModel
{
    protected PlacesApiBaseAdapter(HttpClient httpClient, string adapterId)
      : base(httpClient, adapterId) { }

    public abstract List<MappingResult<NormalizedPlace>> MapToNormalizedPlaces(double keepThreshold = 0.1);
    public int GetAccumulatedFetchData() => AccumulatedData.Count;

    public override async Task FetchAllAndDeserialize(ICollection<IApiRequest> requestconfigs, JsonSerializerOptions options)
    {
        try
        {
            int delayMilliseconds = 1000;
            foreach (IApiRequest requestConfig in requestconfigs)
            {
                string jsonData = await this.FetchDataAsync(requestConfig);
                long responseSizeBytes = System.Text.Encoding.UTF8.GetByteCount(jsonData);
                using var stream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(jsonData));
                var result = await System.Text.Json.JsonSerializer.DeserializeAsync<TDModel>(stream, options);
                int eventCount = ApiDataModelTotalResult(result);
                InvokeDataMetricsResponse(eventCount, (int)responseSizeBytes, null);
                List<TDModelResult> resultData = await ApiDataModelResult(result);
                AccumulatedData.AddRange(resultData);
                await Task.Delay(delayMilliseconds);
            }
        }
        catch (Exception ex)
        {
            InvokeDataMetricsResponse(0, (int)0, ex);
        }

        return;
    }
}

public abstract class NewsApiBaseAdapter<TDModel, TDModelResult> : ApiBaseAdapter<TDModel, TDModelResult>, INewsAdapter where TDModel : IApiDataModel
{
    protected NewsApiBaseAdapter(HttpClient httpClient, string adapterId)
      : base(httpClient, adapterId) { }

    public abstract List<MappingResult<NormalizedNews>> MapToNormalizedNews(double keepThreshold = 0.1);
    public int GetAccumulatedFetchData() => AccumulatedData.Count;
    public override async Task FetchAllAndDeserialize(ICollection<IApiRequest> requestconfigs, JsonSerializerOptions options)
    {
        try
        {
            foreach (IApiRequest requestConfig in requestconfigs)
            {
                string jsonData = await this.FetchDataAsync(requestConfig);
                long responseSizeBytes = System.Text.Encoding.UTF8.GetByteCount(jsonData);
                using var stream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(jsonData));
                var result = await System.Text.Json.JsonSerializer.DeserializeAsync<TDModel>(stream, options);
                int eventCount = ApiDataModelTotalResult(result);
                InvokeDataMetricsResponse(eventCount, (int)responseSizeBytes, null);
                List<TDModelResult> resultData = await ApiDataModelResult(result);
                AccumulatedData.AddRange(resultData);
            }
        }
        catch (Exception ex)
        {
            InvokeDataMetricsResponse(0, (int)0, ex);
        }

        return;
    }
}

public abstract class WeatherApiBaseAdapter<TDModel, TDModelResult> : ApiBaseAdapter<TDModel, TDModelResult>, IWeatherAdapter where TDModel : IApiDataModel
{
    protected WeatherApiBaseAdapter(HttpClient httpClient, string adapterId)
      : base(httpClient, adapterId) { }

    public abstract List<MappingResult<NormalizedWeather>> MapToNormalizedWeather(double keepThreshold = 0.1);
    public int GetAccumulatedFetchData() => AccumulatedData.Count;
    public override async Task FetchAllAndDeserialize(ICollection<IApiRequest> requestconfigs, JsonSerializerOptions options)
    {
        try
        {
            foreach (IApiRequest requestConfig in requestconfigs)
            {
                string jsonData = await this.FetchDataAsync(requestConfig);
                long responseSizeBytes = System.Text.Encoding.UTF8.GetByteCount(jsonData);
                using var stream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(jsonData));
                var result = await System.Text.Json.JsonSerializer.DeserializeAsync<TDModel>(stream, options);
                int eventCount = ApiDataModelTotalResult(result);
                InvokeDataMetricsResponse(eventCount, (int)responseSizeBytes, null);
                List<TDModelResult> resultData = await ApiDataModelResult(result);
                AccumulatedData.AddRange(resultData);
            }
        }
        catch (Exception ex)
        {
            InvokeDataMetricsResponse(0, (int)0, ex);
        }

        return;
    }
}





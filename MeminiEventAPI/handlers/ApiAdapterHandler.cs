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
        private readonly IEnumerable<EventApiBaseAdapter> _adapters;

        private readonly bool connectionOutput = true;
        private readonly bool metricsOutput = true;

        private string FormatBytes(long bytes)
        {
            string[] sizes = { "B", "KB", "MB", "GB" };
            double len = bytes;
            int order = 0;

            while (len >= 1024 && order < sizes.Length - 1)
            {
                order++;
                len /= 1024;
            }

            return $"{len:0.##} {sizes[order]}";
        }

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

        public ApiAdapterHandler(IEnumerable<EventApiBaseAdapter> adapters)
        {
            _adapters = adapters.ToList();

            foreach (var adapter in _adapters)
                Subscribe(adapter);
        }

        public void Subscribe(BaseAdapter adapter)
        {
            if(connectionOutput)
                adapter.FetchResponse += OnSuccessfulFetch!;
            if(metricsOutput)
                adapter.MetricsResponse += OnSuccessfulCollectMetrics!;
        }

        public async Task<UnifiedFetchResult> FetchDataFromAllApis(MeminiEventApiRequest requestConfig)
        {
            var unifiedEvents = new List<NormalizedEvent>();
            var resultsBySource = new Dictionary<string, BulkMappingResult>();
            var startTime = DateTime.UtcNow;

            try
            {
                foreach (var adapter in _adapters)
                {
                    var result              = await adapter.FetchDataAsync(requestConfig);
                    var deserializedData    = await adapter.DeserializeData(result);
                    var mappedBulkData      = await adapter.MapEventResultBulkData(deserializedData);

                    resultsBySource[adapter.AdapterId] = mappedBulkData;
                    unifiedEvents.AddRange(mappedBulkData.Events);

                    Console.WriteLine("=== PERFORMANCE METRICS ===");
                    Console.WriteLine($"Total Events Processed: {mappedBulkData.TotalProcessed}");
                    Console.WriteLine($"Successfully Mapped: {mappedBulkData.TotalMapped}");
                    Console.WriteLine($"Filtered Out: {mappedBulkData.TotalFiltered}");
                    Console.WriteLine($"Duration: {mappedBulkData.Duration.TotalSeconds:F2} seconds");
                    Console.WriteLine($"Events per Second: {mappedBulkData.EventsPerSecond:F2}");
                    Console.WriteLine($"Average Processing Time: {mappedBulkData.Duration.TotalMilliseconds / mappedBulkData.TotalProcessed:F2}ms per event");

                    PrintFetchSummary();                    
                }
            }
            catch (Exception e)
            {
                _httpConnectionResponseInformation["Error"] = new HttpConnectionResponse()
                {
                    ErrorMessage = e.Message,
                };
            }
            var endTime = DateTime.UtcNow;
            return new UnifiedFetchResult
            {
                UnifiedEvents = unifiedEvents,
                ResultsBySource = resultsBySource,
                TotalEvents = unifiedEvents.Count,
                TotalProcessed = resultsBySource.Values.Sum(r => r.TotalProcessed),
                OverallAverageQuality = unifiedEvents.Any()
                  ? unifiedEvents.Average(e => e.DataQuality ?? 0)
                  : 0,
                StartTime = startTime,
                EndTime = endTime,
                HttpConnectionResponses = _httpConnectionResponseInformation,
                FetchMetrics = _apiFetchMetrics
            };
        }

        public async Task<string> FetchDataFromApi(string api, MeminiEventApiRequest requestConfig)
        {
            var selectedApi = _adapters.FirstOrDefault(adapter => adapter.AdapterId == api);

            if (selectedApi == null)
                return "";

            var result = await selectedApi.FetchDataAsync(requestConfig);
            var deserializedData = await selectedApi.DeserializeData(result);
            var mappedBulkData = await selectedApi.MapEventResultBulkData(deserializedData);


            return "";
        }

        private void PrintFetchSummary()
        {
            Console.WriteLine("\n" + new string('=', 80));
            Console.WriteLine("API FETCH SUMMARY");
            Console.WriteLine(new string('=', 80));

            // Print HTTP Connection Information
            Console.WriteLine("\n--- HTTP Connection Details ---");
            foreach (var (adapterId, response) in _httpConnectionResponseInformation)
            {
                Console.WriteLine($"\nAdapter: {adapterId}");
                Console.WriteLine($"  Source: {response.Source}");
                Console.WriteLine($"  URL: {response.Url}");
                Console.WriteLine($"  Status Code: {response.StatusCode}");
            }

            // Print Fetch Metrics
            Console.WriteLine("\n--- Fetch Metrics ---");
            foreach (var (adapterId, metrics) in _apiFetchMetrics)
            {
                Console.WriteLine($"\nAdapter: {adapterId}");
                Console.WriteLine($"  Events Fetched: {metrics.EventCount}");
                Console.WriteLine($"  Response Size: {FormatBytes(metrics.ResponseSizeBytes)}");
            }

            // Print Aggregated Stats
            Console.WriteLine("\n--- Aggregated Statistics ---");
            var totalEvents = _apiFetchMetrics.Values.Sum(m => m.EventCount);
            var totalSize = _apiFetchMetrics.Values.Sum(m => m.ResponseSizeBytes);

            Console.WriteLine($"  Total Events: {totalEvents}");
            Console.WriteLine($"  Total Data: {FormatBytes(totalSize)}");

            Console.WriteLine("\n" + new string('=', 80) + "\n");
        }
    }
}

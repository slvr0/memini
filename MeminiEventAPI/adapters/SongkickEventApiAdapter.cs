using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeminiEventAPI.structures;
using MeminiEventAPI.mapping;
using MeminiEventAPI.api_datamodels.songkick;
namespace MeminiEventAPI.adapters
{
    internal class SongkickEventApiAdapter(HttpClient httpClient) : EventApiBaseAdapter(httpClient, "Songkick")
    {
        public override Task<BulkMappingResult> MapEventResultBulkData(IApiDataModel deserializedData)
        {
            return null;
        }

        public const string ConnectionString = "https://api.songkick.com/api/3.0/events";

        public override string GenerateApiRequestUrl(MeminiEventApiRequest requestConfig)
        {
            var queryParams = new Dictionary<string, string>();

            if (!string.IsNullOrEmpty(requestConfig.City))
                queryParams["location"] = $"sk:{GetSongkickCityId(requestConfig.City)}";

            if (!string.IsNullOrEmpty(requestConfig.Location))
                queryParams["location"] = $"geo:{requestConfig.Location}"; // latitude,longitude

            if (requestConfig.StartDate.HasValue)
                queryParams["min_date"] = requestConfig.StartDate.Value.ToString("yyyy-MM-dd");

            if (requestConfig.EndDate.HasValue)
                queryParams["max_date"] = requestConfig.EndDate.Value.ToString("yyyy-MM-dd");

            if (!string.IsNullOrEmpty(requestConfig.Category))
                queryParams["type"] = requestConfig.Category.ToLower();

            if (requestConfig.SearchSize.HasValue)
                queryParams["per_page"] = requestConfig.SearchSize.Value.ToString();

            if (requestConfig.PageOffset.HasValue)
                queryParams["page"] = requestConfig.PageOffset.Value.ToString();

            if (!string.IsNullOrEmpty(requestConfig.Labels))
                queryParams["query"] = requestConfig.Labels;

            // Build query string only (base address and headers are already handled by HttpClient)
            var queryString = string.Join("&", queryParams.Select(kvp => $"{kvp.Key}={Uri.EscapeDataString(kvp.Value)}"));

            return $".json?{queryString}";
        }

        public async override Task<IApiDataModel> DeserializeData(string jsonContent)
        {
            try
            {
                var options = new System.Text.Json.JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };
                long responseSizeBytes = System.Text.Encoding.UTF8.GetByteCount(jsonContent);
                using var stream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(jsonContent));
                var result = await System.Text.Json.JsonSerializer.DeserializeAsync<SongkickDatamodel>(stream, options);
                int eventCount = result?.ResultsPage?.Results?.Events?.Count ?? 0;
                InvokeDataMetricsResponse(eventCount, (int)responseSizeBytes, null);
                return result ?? new SongkickDatamodel();
            }
            catch (Exception ex)
            {
                InvokeDataMetricsResponse(0, (int)0, ex);
                return new SongkickDatamodel();
            }
        }
        // Example helper to map city name to Songkick city ID
        private string GetSongkickCityId(string city)
        {
            // You would fetch a city ID from Songkick API: /search/locations.json?query={city}
            // For now, you can hardcode known cities or implement a lookup
            return city switch
            {
                "London" => "24426",
                "New York" => "7644",
                _ => throw new Exception($"Unknown city: {city}")
            };
        }

    }
}

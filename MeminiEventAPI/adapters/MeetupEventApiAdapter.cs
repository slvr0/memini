using System.Text;
using System.Text.Json;

using MeminiEventAPI.structures;
using MeminiEventAPI.api_datamodels.meetup;
using MeminiEventAPI.mapping;
namespace MeminiEventAPI.adapters
{
    internal class MeetupEventApiAdapter(HttpClient httpClient) : EventApiBaseAdapter(httpClient, "Meetup")
    {
        public override Task<BulkMappingResult> MapEventResultBulkData(IApiDataModel deserializedData)
        {
            return null;
        }

        public const string ConnectionString = "https://api.meetup.com/2/events/";
        #region generate request
        public override string GenerateApiRequestUrl(MeminiEventApiRequest requestConfig)
        {
            var queryParams = new List<string>();

            // Geographical filters
            if (!string.IsNullOrWhiteSpace(requestConfig.City))
                queryParams.Add($"venue.city={Uri.EscapeDataString(requestConfig.City)}");

            if (!string.IsNullOrWhiteSpace(requestConfig.State))
                queryParams.Add($"venue.state={Uri.EscapeDataString(requestConfig.State)}");

            if (!string.IsNullOrWhiteSpace(requestConfig.CountryCode))
                queryParams.Add($"venue.country={Uri.EscapeDataString(requestConfig.CountryCode)}");

            // Coordinates
            if (!string.IsNullOrWhiteSpace(requestConfig.Location))
            {
                var parts = requestConfig.Location.Split(',');
                if (parts.Length == 2)
                {
                    queryParams.Add($"lat={parts[0]}");
                    queryParams.Add($"lon={parts[1]}");
                }
            }

            if (!string.IsNullOrWhiteSpace(requestConfig.Radius))
                queryParams.Add($"radius={Uri.EscapeDataString(requestConfig.Radius)}");

            // Date range filters
            if (requestConfig.StartDate.HasValue)
                queryParams.Add($"time.gte={requestConfig.StartDate.Value:yyyy-MM-dd}");

            if (requestConfig.EndDate.HasValue)
                queryParams.Add($"time.lte={requestConfig.EndDate.Value:yyyy-MM-dd}");

            // Pagination / Size
            if (requestConfig.PageSize.HasValue)
                queryParams.Add($"page={requestConfig.PageSize.Value}");

            if (requestConfig.PageOffset.HasValue)
                queryParams.Add($"offset={requestConfig.PageOffset.Value}");

            // Sorting
            if (!string.IsNullOrWhiteSpace(requestConfig.SortBy))
                queryParams.Add($"sort={Uri.EscapeDataString(requestConfig.SortBy)}");

            // Optional text search (Meetup 'q' = query)
            if (!string.IsNullOrWhiteSpace(requestConfig.Labels))
                queryParams.Add($"text={Uri.EscapeDataString(requestConfig.Labels)}");

            // Always include API key
            queryParams.Add($"client_id={ApiKey}");

            var queryString = string.Join("&", queryParams);
            return $"https://api.meetup.com/2/events?{queryString}";
        }
        #endregion

        public override async Task<IApiDataModel> DeserializeData(string jsonContent)
        {
            try
            {
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };
                long responseSizeBytes = Encoding.UTF8.GetByteCount(jsonContent);
                using var stream = new MemoryStream(Encoding.UTF8.GetBytes(jsonContent));
                var result = await JsonSerializer.DeserializeAsync<MeetupDataModel>(stream, options);
                int eventCount = result?.Meta?.TotalCount ?? 0;
                InvokeDataMetricsResponse(eventCount, (int)responseSizeBytes, null);
                return result ?? new MeetupDataModel();
            }
            catch (Exception ex)
            {
                InvokeDataMetricsResponse(0, (int)0, ex);
                return new MeetupDataModel();
            }
        }

    }
}

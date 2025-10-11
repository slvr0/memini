using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using MeminiEventAPI.Attributes;
using MeminiEventAPI.handlers;
using MeminiEventAPI.structures;
using MeminiEventAPI.mapping;
using MeminiEventAPI.mapping.profiles;
using MeminiEventAPI.api_datamodels.predict_hq;


namespace MeminiEventAPI.adapters;

public class PredictHQEventApiAdapter(HttpClient httpClient) : EventApiBaseAdapter(httpClient, "PredictHQ")
{
    public override Task<BulkMappingResult> MapEventResultBulkData(IApiDataModel deserializedData)
    {
        if (deserializedData is not PredictHqDataModel predictHqDataModel)
            return Task.FromResult(new BulkMappingResult()); // or handle error / return null, depending on context

        const double keepThreshold = 0.1; // data quality for storing the data

        var predictHqEvents = predictHqDataModel.Results;
        if (predictHqEvents == null || !predictHqEvents.Any())
            return Task.FromResult(new BulkMappingResult()); 

        var predictHqDataMapper = new PredictHqMapper();

        var result = BulkMappingHelper.MapEventsAsync(
            sources: predictHqEvents,
            mapFunction: evt => predictHqDataMapper.Map(evt),
            minQuality: keepThreshold
        );

        return result;
    }

    public readonly static string ConnectionString = "https://api.predicthq.com/v1/events/";

    #region generate request
    public override string GenerateApiRequestUrl(MeminiEventApiRequest requestConfig)
    {
        var queryParams = new List<string>();

        // Location parameters
        if (!string.IsNullOrEmpty(requestConfig.Location))
        {
            if (!string.IsNullOrEmpty(requestConfig.Radius))
            {
                // Ensure radius includes unit (mi, km, m, or ft)
                queryParams.Add($"within={requestConfig.Radius}@{requestConfig.Location}");
            }
        }

        // Date parameters
        if (requestConfig.StartDate.HasValue)
        {
            queryParams.Add($"active.gte={requestConfig.StartDate.Value:yyyy-MM-dd}");
        }

        if (requestConfig.EndDate.HasValue)
        {
            queryParams.Add($"active.lte={requestConfig.EndDate.Value:yyyy-MM-dd}");
        }

        // Category filter
        if (!string.IsNullOrEmpty(requestConfig.Category))
        {
            queryParams.Add($"category={requestConfig.Category}");
        }

        if (!string.IsNullOrEmpty(requestConfig.Country))
        {
            // But use CountryCode (2-letter) for the API parameter
            queryParams.Append($"&country={requestConfig.CountryCode}");
        }

        // State filter
        if (!string.IsNullOrEmpty(requestConfig.State))
        {
            queryParams.Add($"state={requestConfig.State}");
        }

        // Labels
        if (!string.IsNullOrEmpty(requestConfig.Labels))
        {
            queryParams.Add($"phq_labels={Uri.EscapeDataString(requestConfig.Labels)}");
        }

        // Sort order
        if (!string.IsNullOrEmpty(requestConfig.SortBy))
        {
            // Map your internal sort values to PredictHQ's valid sort fields
            var sortValue = requestConfig.SortBy.ToLower() switch
            {
                "score.desc" => "-rank",           // Map to descending rank
                "score.asc" => "rank",             // Map to ascending rank
                "date.desc" => "-start",           // Map to descending start date
                "date.asc" => "start",             // Map to ascending start date  
                "relevance" => "relevance,-start", // Default
                _ => requestConfig.SortBy          // Pass through if already valid
            };
            queryParams.Add($"sort={sortValue}");
        }

        // Pagination
        var pageSize = requestConfig.PageSize ?? 20;
        queryParams.Add($"limit={pageSize}");

        if (requestConfig.PageOffset.HasValue && requestConfig.PageOffset.Value > 1)
        {
            var offset = (requestConfig.PageOffset.Value - 1) * pageSize;
            queryParams.Add($"offset={offset}");
        }

        return queryParams.Count > 0
            ? $"?{string.Join("&", queryParams)}"
            : string.Empty;
    }
    #endregion generate request

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
            var result = await JsonSerializer.DeserializeAsync<PredictHqDataModel>(stream, options);
            int eventCount = result?.Results?.Count ?? 0;
            InvokeDataMetricsResponse(eventCount, (int)responseSizeBytes, null);
            return result ?? new PredictHqDataModel();
        }
        catch (Exception ex)
        {
            InvokeDataMetricsResponse(0, (int)0, ex);
            return new PredictHqDataModel();
        }
    }

}

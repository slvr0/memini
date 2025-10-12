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
using MeminiEventAPI.api_datamodels;
namespace MeminiEventAPI.adapters;

internal class PredictHqEventApiAdapter(HttpClient httpClient) : EventApiBaseAdapter<PredictHqDataModel, PredictHqEvent>(httpClient, "Ticketmaster")
{
    public readonly static string ConnectionString = "https://api.predicthq.com/v1/events/";

    protected override int ApiDataModelTotalResult(PredictHqDataModel dataModel) => dataModel.Results?.Count ?? 0;

    protected override Task<List<PredictHqEvent>> ApiDataModelResult(PredictHqDataModel dataModel) => Task.FromResult(dataModel.Results ?? []);

    #region generate request url
    public override string GenerateApiRequestUrl(IApiRequest requestConfig) 
    {
        if (!(requestConfig is MeminiEventApiRequest eventRequestConfig))
            return "";

        var queryParams = new List<string>();

        // Location parameters
        if (!string.IsNullOrEmpty(eventRequestConfig.Location))
        {
            if (!string.IsNullOrEmpty(eventRequestConfig.Radius))
            {
                // Ensure radius includes unit (mi, km, m, or ft)
                queryParams.Add($"within={eventRequestConfig.Radius}@{eventRequestConfig.Location}");
            }
        }

        // Date parameters
        if (eventRequestConfig.StartDate.HasValue)
        {
            queryParams.Add($"active.gte={eventRequestConfig.StartDate.Value:yyyy-MM-dd}");
        }

        if (eventRequestConfig.EndDate.HasValue)
        {
            queryParams.Add($"active.lte={eventRequestConfig.EndDate.Value:yyyy-MM-dd}");
        }

        // Category filter
        if (!string.IsNullOrEmpty(eventRequestConfig.Category))
        {
            queryParams.Add($"category={eventRequestConfig.Category}");
        }

        if (!string.IsNullOrEmpty(eventRequestConfig.Country))
        {
            // But use CountryCode (2-letter) for the API parameter
            queryParams.Append($"&country={eventRequestConfig.CountryCode}");
        }

        // State filter
        if (!string.IsNullOrEmpty(eventRequestConfig.State))
        {
            queryParams.Add($"state={eventRequestConfig.State}");
        }

        // Labels
        if (!string.IsNullOrEmpty(eventRequestConfig.Labels))
        {
            queryParams.Add($"phq_labels={Uri.EscapeDataString(eventRequestConfig.Labels)}");
        }

        // Sort order
        if (!string.IsNullOrEmpty(eventRequestConfig.SortBy))
        {
            // Map your internal sort values to PredictHQ's valid sort fields
            var sortValue = eventRequestConfig.SortBy.ToLower() switch
            {
                "score.desc" => "-rank",           // Map to descending rank
                "score.asc" => "rank",             // Map to ascending rank
                "date.desc" => "-start",           // Map to descending start date
                "date.asc" => "start",             // Map to ascending start date  
                "relevance" => "relevance,-start", // Default
                _ => eventRequestConfig.SortBy          // Pass through if already valid
            };
            queryParams.Add($"sort={sortValue}");
        }

        // Pagination
        var pageSize = eventRequestConfig.PageSize ?? 20;
        queryParams.Add($"limit={pageSize}");

        if (eventRequestConfig.PageOffset.HasValue && eventRequestConfig.PageOffset.Value > 1)
        {
            var offset = (eventRequestConfig.PageOffset.Value - 1) * pageSize;
            queryParams.Add($"offset={offset}");
        }

        return queryParams.Count > 0
            ? $"?{string.Join("&", queryParams)}"
            : string.Empty;
    }
    #endregion generate request url

    public override List<MappingResult<NormalizedEvent>> MapToNormalizedEvents(double keepThreshold = 0.1)
    {
        var mapper = new mapping.profiles.PredictHqMapper();
        return EventsMapperExecutor.Execute<PredictHqEvent>(AccumulatedData, mapper, keepThreshold);
    }
}

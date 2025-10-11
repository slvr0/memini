using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using MeminiEventAPI.Attributes;
using MeminiEventAPI.handlers;
using MeminiEventAPI.structures;
using MeminiEventAPI.mapping;
using MeminiEventAPI.api_datamodels.seatgeek;
namespace MeminiEventAPI.adapters;

//internal class SeatGeekEventApiAdapter(HttpClient httpClient) : EventApiBaseAdapter(httpClient, "SeatGeek")
//{
//    public override Task<BulkMappingResult> MapEventResultBulkData(IApiDataModel deserializedData)
//    {
//        return null;
//    }

//    public const string ConnectionString = "https://api.predicthq.com/v1/events/";

//    public override string GenerateApiRequestUrl(MeminiEventApiRequest requestConfig)
//    {
//        var queryParams = new List<string>();

//        // Geographical filters
//        if (!string.IsNullOrWhiteSpace(requestConfig.City))
//            queryParams.Add($"venue.city={Uri.EscapeDataString(requestConfig.City)}");

//        if (!string.IsNullOrWhiteSpace(requestConfig.State))
//            queryParams.Add($"venue.state={Uri.EscapeDataString(requestConfig.State)}");

//        if (!string.IsNullOrWhiteSpace(requestConfig.CountryCode))
//            queryParams.Add($"venue.country={Uri.EscapeDataString(requestConfig.CountryCode)}");

//        // Coordinates
//        if (!string.IsNullOrWhiteSpace(requestConfig.Location))
//        {
//            var parts = requestConfig.Location.Split(',');
//            if (parts.Length == 2)
//            {
//                queryParams.Add($"lat={parts[0]}");
//                queryParams.Add($"lon={parts[1]}");
//            }
//        }

//        if (!string.IsNullOrWhiteSpace(requestConfig.Radius))
//            queryParams.Add($"range={Uri.EscapeDataString(requestConfig.Radius)}");

//        // Date range filters
//        if (requestConfig.StartDate.HasValue)
//            queryParams.Add($"datetime_local.gte={requestConfig.StartDate.Value:yyyy-MM-dd}");

//        if (requestConfig.EndDate.HasValue)
//            queryParams.Add($"datetime_local.lte={requestConfig.EndDate.Value:yyyy-MM-dd}");

//        // Pagination / Size
//        if (requestConfig.PageSize.HasValue)
//            queryParams.Add($"per_page={requestConfig.PageSize.Value}");

//        if (requestConfig.PageOffset.HasValue)
//            queryParams.Add($"page={requestConfig.PageOffset.Value}");

//        // Sorting
//        if (!string.IsNullOrWhiteSpace(requestConfig.SortBySeatGeek))
//            queryParams.Add($"sort={Uri.EscapeDataString(requestConfig.SortBySeatGeek)}");

//        // Optional text search (SeatGeek 'q' = query)
//        if (!string.IsNullOrWhiteSpace(requestConfig.Labels))
//            queryParams.Add($"q={Uri.EscapeDataString(requestConfig.Labels)}");

//        // Always include API key
//        queryParams.Add($"client_id={ApiKey}");

//        var queryString = string.Join("&", queryParams);
//        return $"https://api.seatgeek.com/2/events?{queryString}";
//    }

//    public override async Task<IApiDataModel> DeserializeData(string jsonContent)
//    {
//        try
//        {
//            var options = new JsonSerializerOptions
//            {
//                PropertyNameCaseInsensitive = true
//            };
//            long responseSizeBytes = Encoding.UTF8.GetByteCount(jsonContent);
//            using var stream = new MemoryStream(Encoding.UTF8.GetBytes(jsonContent));
//            var result = await JsonSerializer.DeserializeAsync<SeatGeekDataModel>(stream, options);
//            int eventCount = result?.Events?.Count ?? 0;
//            InvokeDataMetricsResponse(eventCount, (int)responseSizeBytes, null);
//            return result ?? new SeatGeekDataModel();
//        }
//        catch (Exception ex)
//        {
//            InvokeDataMetricsResponse(0, (int)0, ex);
//            return new SeatGeekDataModel();
//        }
//    }


//}
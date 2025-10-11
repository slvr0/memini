using MeminiEventAPI.structures;
using MeminiEventAPI.mapping;
using MeminiEventAPI.mapping.profiles;
using MeminiEventAPI.api_datamodels.ticketmaster;

namespace MeminiEventAPI.adapters;

internal class TicketmasterEventApiAdapter(HttpClient httpClient) : EventApiBaseAdapter(httpClient, "Ticketmaster")
{
    public override Task<BulkMappingResult> MapEventResultBulkData(IApiDataModel deserializedData)
    {
        if (deserializedData is not TicketmasterDatamodel tmDataModel)
            return Task.FromResult(new BulkMappingResult());

        const double keepThreshold = 0.1; // data quality for storing the data

        var ticketmasterEvents = tmDataModel.Embedded?.Events;
        if (ticketmasterEvents == null || !ticketmasterEvents.Any())
            return Task.FromResult(new BulkMappingResult());

        var ticketmasterDataMapper = new TicketmasterMapper();

        var result = BulkMappingHelper.MapEventsAsync(
            sources: ticketmasterEvents,
            mapFunction: evt => ticketmasterDataMapper.Map(evt),
            minQuality: keepThreshold
        );

        return result;
    }

    public readonly static string ConnectionString = "https://app.ticketmaster.com/discovery/v2/";

    public override string GenerateApiRequestUrl(MeminiEventApiRequest requestConfig)
    {
        var queryParams = new Dictionary<string, string>()
        {
            ["city"] = requestConfig.City,
            ["countryCode"] = requestConfig.CountryCode,
            ["apikey"] = ApiKey,
            ["size"] = requestConfig.SearchSize.ToString()
        };

        var queryString = string.Join("&",
        queryParams
            .Where(kvp => !string.IsNullOrWhiteSpace(kvp.Value))
            .Select(kvp => $"{kvp.Key}={Uri.EscapeDataString(kvp.Value!)}"));

        return $"events.json?{queryString}";
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
            var result = await System.Text.Json.JsonSerializer.DeserializeAsync<TicketmasterDatamodel>(stream, options);
            int eventCount = result?.Embedded?.Events?.Count ?? 0;
            InvokeDataMetricsResponse(eventCount, (int)responseSizeBytes, null);
            return result ?? new TicketmasterDatamodel();
        }
        catch (Exception ex)
        {
            InvokeDataMetricsResponse(0, (int)0, ex);
            return new TicketmasterDatamodel();
        }
    }
}

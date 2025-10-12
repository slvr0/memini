using MeminiEventAPI.structures;
using MeminiEventAPI.mapping;
using MeminiEventAPI.mapping.profiles;
using MeminiEventAPI.api_datamodels.ticketmaster;
using MeminiEventAPI.api_datamodels;

namespace MeminiEventAPI.adapters;

internal class TicketmasterApiAdapter(HttpClient httpClient) : EventApiBaseAdapter<TicketmasterDatamodel, TicketmasterEvent>(httpClient, "Ticketmaster")
{
    public readonly static string ConnectionString = "https://app.ticketmaster.com/discovery/v2/";

    protected override int ApiDataModelTotalResult(TicketmasterDatamodel dataModel) => dataModel.Embedded?.Events?.Count ?? 0;

    protected override Task<List<TicketmasterEvent>> ApiDataModelResult(TicketmasterDatamodel dataModel) => Task.FromResult(dataModel.Embedded?.Events ?? []);

    public override string GenerateApiRequestUrl(IApiRequest requestConfig)
    {
        if (!(requestConfig is MeminiEventApiRequest eventRequestConfig))
            return "";

        var queryParams = new Dictionary<string, string>()
        {
            ["city"] = eventRequestConfig.City,
            ["countryCode"] = eventRequestConfig.CountryCode,
            ["apikey"] = ApiKey,
            ["size"] = eventRequestConfig.SearchSize.ToString()
        };

        var queryString = string.Join("&",
        queryParams
            .Where(kvp => !string.IsNullOrWhiteSpace(kvp.Value))
            .Select(kvp => $"{kvp.Key}={Uri.EscapeDataString(kvp.Value!)}"));

        return $"events.json?{queryString}";
    }

    public override List<MappingResult<NormalizedEvent>> MapToNormalizedEvents(double keepThreshold = 0.1)
    {
        var mapper = new mapping.profiles.TicketmasterMapper();
        return EventsMapperExecutor.Execute<TicketmasterEvent>(AccumulatedData, mapper, keepThreshold);
    } 
} 


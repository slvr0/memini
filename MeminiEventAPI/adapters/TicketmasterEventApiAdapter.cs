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

        var queryParams = new Dictionary<string, string?>();

        // Always add apikey
        queryParams["apikey"] = ApiKey;

        // Always add locale
        queryParams["locale"] = "*";

        // Conditionally add other parameters
        if (!string.IsNullOrWhiteSpace(eventRequestConfig.CountryCode))
        {
            queryParams["countryCode"] = eventRequestConfig.CountryCode;
        }

        if (!string.IsNullOrWhiteSpace(eventRequestConfig.City))
        {
            queryParams["city"] = eventRequestConfig.City;
        }

        if (!string.IsNullOrWhiteSpace(eventRequestConfig.Location))
        {
            queryParams["latlong"] = eventRequestConfig.Location; // "lat,long"
        }

        if (!string.IsNullOrWhiteSpace(eventRequestConfig.Radius))
        {
            queryParams["radius"] = eventRequestConfig.Radius;
        }

        if (!string.IsNullOrWhiteSpace(eventRequestConfig.Unit))
        {
            queryParams["unit"] = eventRequestConfig.Unit; // "km" or "miles"
        }

        if (eventRequestConfig.PageSize > 0)
        {
            queryParams["size"] = eventRequestConfig.PageSize.ToString();
        }

        if (eventRequestConfig.PageNumber.HasValue)
        {
            queryParams["page"] = eventRequestConfig.PageNumber.Value.ToString();
        }

        if (!string.IsNullOrWhiteSpace(eventRequestConfig.Category))
        {
            queryParams["classificationName"] = eventRequestConfig.Category;
        }

        var queryString = string.Join("&",
            queryParams.Select(kvp => $"{kvp.Key}={Uri.EscapeDataString(kvp.Value!)}"));

        return $"events.json?{queryString}";
    }

    public override List<MappingResult<NormalizedEvent>> MapToNormalizedEvents(double keepThreshold = 0.1)
    {
        var mapper = new mapping.profiles.TicketmasterMapper();
        return EventsMapperExecutor.Execute<TicketmasterEvent>(AccumulatedData, mapper, keepThreshold);
    } 
} 


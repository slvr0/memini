using MeminiEventAPI.structures;
using MeminiEventAPI.mapping;
using MeminiEventAPI.mapping.profiles;
using MeminiEventAPI.api_datamodels.foursquare;
using MeminiEventAPI.api_datamodels;
using MeminiEventAPI.structures.foursquare;
namespace MeminiEventAPI.adapters;

internal class FourSquareApiAdapter(HttpClient httpClient) : PlacesApiBaseAdapter<FoursquareDatamodel, FoursquarePlace>(httpClient, "FourSquare")
{
    structures.foursquare.FoursquareCategory searchCategories = structures.foursquare.FoursquareCategory.Any;
    public readonly static string ConnectionString = "https://places-api.foursquare.com/";
    protected override int ApiDataModelTotalResult(FoursquareDatamodel dataModel) => dataModel.Results?.Count ?? 0;
    protected override Task<List<FoursquarePlace>> ApiDataModelResult(FoursquareDatamodel dataModel, IApiRequest requestConfig) 
    {
        if (!(requestConfig is FoursquareApiRequest config))
            return Task.FromResult(dataModel.Results ?? new List<FoursquarePlace>());

        dataModel.Results.ForEach(res => {
            res.SearchCategory = (int)searchCategories;
            res.Location.Locality = config.City;     
        });
        return Task.FromResult(dataModel.Results ?? new List<FoursquarePlace>());
    }
    public override string GenerateApiRequestUrl(IApiRequest requestConfig)
    {
        if (!(requestConfig is FoursquareApiRequest config))
            return "";

        var parts = new List<string>();

        // Location - use ll+radius OR near (not both)
        if (!string.IsNullOrWhiteSpace(config.Location))
        {
            // ll parameter (latitude,longitude)
            parts.Add($"ll={config.Location}");

            // Radius only works with ll
            if (!string.IsNullOrWhiteSpace(config.Radius))
                parts.Add($"radius={config.Radius}");
        }
        else if (!string.IsNullOrWhiteSpace(config.City))
        {
            // near parameter (city name) - NO radius allowed
            var near = config.City;
            if (!string.IsNullOrWhiteSpace(config.Country))
                near += $", {config.Country}";
            parts.Add($"near={Uri.EscapeDataString(near)}");
        }

        // Categories
        if (config.Categories != structures.foursquare.FoursquareCategory.Any)
        {
            var categoryIds = FoursquareCategoryIds.GetCategoryIds(config.Categories);
            parts.Add($"categories={categoryIds}");
        }

        // Offset for pagination
        if (config.Offset.HasValue && config.Offset > 0)
        {
            parts.Add($"offset={config.Offset.Value}");
        }

        // Query
        if (!string.IsNullOrWhiteSpace(config.Query))
            parts.Add($"query={Uri.EscapeDataString(config.Query)}");

        // Limit
        if (config.SearchSize.HasValue)
            parts.Add($"limit={config.SearchSize.Value}");

        // Sort
        if (!string.IsNullOrWhiteSpace(config.SortBy))
            parts.Add($"sort={config.SortBy}");

        // Fields (important for Foursquare v3)
        //parts.Add("fields=fsq_id,name,location,categories,rating,hours,website,verified,description");

        var queryString = string.Join("&", parts);
        return $"places/search?{queryString}";
    }

    public override List<MappingResult<NormalizedPlace>> MapToNormalizedPlaces(double keepThreshold = 0.1)
    {
        var res = new List<MappingResult<NormalizedPlace>> ();
        if (AccumulatedData == null || !AccumulatedData.Any())
            return res;

        var mapper = new mapping.profiles.FoursquareMapper();
        res = PlacesMapperExecutor.Execute<FoursquarePlace>(AccumulatedData, mapper, keepThreshold);
        return res;
    }
}


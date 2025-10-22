using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Text.Json.Serialization;
using MeminiEventAPI.structures;

namespace MeminiEventAPI.api_datamodels.foursquare;

public class FoursquareDatamodel : IApiDataModel
{
    [JsonPropertyName("results")]
    public List<FoursquarePlace> Results { get; set; } = new();

    [JsonPropertyName("context")]
    public FoursquareContext? Context { get; set; }
}

public class FoursquareContext
{
    [JsonPropertyName("geo_bounds")]
    public GeoBounds? GeoBounds { get; set; }
}

public class GeoBounds
{
    [JsonPropertyName("circle")]
    public Circle? Circle { get; set; }
}

public class Circle
{
    [JsonPropertyName("center")]
    public Center? Center { get; set; }

    [JsonPropertyName("radius")]
    public int Radius { get; set; }
}

public class Center
{
    [JsonPropertyName("latitude")]
    public double Latitude { get; set; }

    [JsonPropertyName("longitude")]
    public double Longitude { get; set; }
}

public class FoursquarePlace
{
    [JsonPropertyName("fsq_id")]
    public string FsqId { get; set; } = string.Empty;

    [JsonPropertyName("categories")]
    public List<FoursquareCategory> Categories { get; set; } = new();

    [JsonPropertyName("chains")]
    public List<FoursquareChain>? Chains { get; set; }

    [JsonPropertyName("closed_bucket")]
    public string? ClosedBucket { get; set; }

    [JsonPropertyName("date_closed")]
    public string? DateClosed { get; set; }

    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonPropertyName("distance")]
    public int? Distance { get; set; }

    [JsonPropertyName("geocodes")]
    public FoursquareGeocodes? Geocodes { get; set; }

    [JsonPropertyName("hours")]
    public FoursquareHours? Hours { get; set; }

    [JsonPropertyName("link")]
    public string? Link { get; set; }

    [JsonPropertyName("location")]
    public FoursquareLocation Location { get; set; } = new();

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("photos")]
    public List<FoursquarePhoto>? Photos { get; set; }

    [JsonPropertyName("popularity")]
    public double? Popularity { get; set; }

    [JsonPropertyName("price")]
    public int? Price { get; set; }

    [JsonPropertyName("rating")]
    public double? Rating { get; set; }

    [JsonPropertyName("stats")]
    public FoursquareStats? Stats { get; set; }

    [JsonPropertyName("timezone")]
    public string? Timezone { get; set; }

    [JsonPropertyName("verified")]
    public bool? Verified { get; set; }

    [JsonPropertyName("website")]
    public string? Website { get; set; }

    public int? SearchCategory { get; set; } = 0;
}

public class FoursquareCategory
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("icon")]
    public FoursquareIcon? Icon { get; set; }
    public int CategoryId { get; set; }    //this is set from storing the search categories
}

public class FoursquareIcon
{
    [JsonPropertyName("prefix")]
    public string Prefix { get; set; } = string.Empty;

    [JsonPropertyName("suffix")]
    public string Suffix { get; set; } = string.Empty;
}

public class FoursquareChain
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;
}

public class FoursquareGeocodes
{
    [JsonPropertyName("main")]
    public FoursquareCoordinate? Main { get; set; }

    [JsonPropertyName("roof")]
    public FoursquareCoordinate? Roof { get; set; }
}

public class FoursquareCoordinate
{
    [JsonPropertyName("latitude")]
    public double Latitude { get; set; }

    [JsonPropertyName("longitude")]
    public double Longitude { get; set; }
}

public class FoursquareLocation
{
    [JsonPropertyName("address")]
    public string? Address { get; set; }

    [JsonPropertyName("address_extended")]
    public string? AddressExtended { get; set; }

    [JsonPropertyName("census_block")]
    public string? CensusBlock { get; set; }

    [JsonPropertyName("country")]
    public string? Country { get; set; }

    [JsonPropertyName("cross_street")]
    public string? CrossStreet { get; set; }

    [JsonPropertyName("dma")]
    public string? Dma { get; set; }

    [JsonPropertyName("formatted_address")]
    public string? FormattedAddress { get; set; }

    [JsonPropertyName("locality")]
    public string? Locality { get; set; }

    [JsonPropertyName("postcode")]
    public string? Postcode { get; set; }

    [JsonPropertyName("region")]
    public string? Region { get; set; }
}

public class FoursquareHours
{
    [JsonPropertyName("display")]
    public string? Display { get; set; }

    [JsonPropertyName("is_local_holiday")]
    public bool? IsLocalHoliday { get; set; }

    [JsonPropertyName("open_now")]
    public bool? OpenNow { get; set; }

    [JsonPropertyName("regular")]
    public List<FoursquareRegularHours>? Regular { get; set; }
}

public class FoursquareRegularHours
{
    [JsonPropertyName("close")]
    public string? Close { get; set; }

    [JsonPropertyName("day")]
    public int Day { get; set; }

    [JsonPropertyName("open")]
    public string? Open { get; set; }
}

public class FoursquarePhoto
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("created_at")]
    public DateTime? CreatedAt { get; set; }

    [JsonPropertyName("prefix")]
    public string Prefix { get; set; } = string.Empty;

    [JsonPropertyName("suffix")]
    public string Suffix { get; set; } = string.Empty;

    [JsonPropertyName("width")]
    public int Width { get; set; }

    [JsonPropertyName("height")]
    public int Height { get; set; }
}

public class FoursquareStats
{
    [JsonPropertyName("total_photos")]
    public int? TotalPhotos { get; set; }

    [JsonPropertyName("total_ratings")]
    public int? TotalRatings { get; set; }

    [JsonPropertyName("total_tips")]
    public int? TotalTips { get; set; }
}

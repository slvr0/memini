using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeminiEventAPI.api_datamodels;

/// <summary>
/// Normalized place/venue representation from Foursquare
/// </summary>
public class NormalizedPlace
{
    // Basic Information
    public string ExternalId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Website { get; set; }

    // Geographic Information
    public PlaceGeographicInfo? GeographicInfo { get; set; }

    // Categorization
    public PlaceCategorizationInfo? CategorizationInfo { get; set; }

    // Quality Metrics
    public double? Rating { get; set; }
    public double? Popularity { get; set; }
    public int? TotalRatings { get; set; }

    // Pricing
    public int? PriceLevel { get; set; } // 1-4 scale

    // Status
    public PlaceStatusInfo? StatusInfo { get; set; }

    // Media
    public List<PlaceMedia>? Media { get; set; }

    // Quality tracking
    public double DataQuality { get; set; }
}

public class PlaceGeographicInfo
{
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? Region { get; set; }
    public string? Country { get; set; }
    public string? Postcode { get; set; }
    public string? FormattedAddress { get; set; }
    public GeoCoordinates? Coordinates { get; set; }
}

public class PlaceCategorizationInfo
{
    public string? PrimaryCategory { get; set; }
    public int? PrimaryCategoryId { get; set; }
    public List<string>? AllCategories { get; set; }
    public PlaceCategory Categories { get; set; } = PlaceCategory.None;
}

public class PlaceStatusInfo
{
    public bool? IsOpenNow { get; set; }
    public bool IsClosed { get; set; }
    public string? DateClosed { get; set; }
    public string? HoursDisplay { get; set; }
    public bool? IsVerified { get; set; }
}

public class PlaceMedia
{
    public string Url { get; set; } = string.Empty;
    public string Prefix { get; set; } = string.Empty;
    public string Suffix { get; set; } = string.Empty;
    public int? Width { get; set; }
    public int? Height { get; set; }
    public bool IsPrimary { get; set; }
}
[Flags]
public enum PlaceCategory
{
    None = 0,
    Restaurant = 1 << 0,      // 1
    Bar = 1 << 1,             // 2
    CoffeeShop = 1 << 2,      // 4
    Hotel = 1 << 3,           // 8
    Landmark = 1 << 4,        // 16
    Entertainment = 1 << 5    // 32
}
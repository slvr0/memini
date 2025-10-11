using System.Text.Json.Serialization;
using MeminiEventAPI.structures;

namespace MeminiEventAPI.api_datamodels.seatgeek;

public class SeatGeekDataModel : IApiDataModel
{
    [JsonPropertyName("events")]
    public List<SeatGeekEvent> Events { get; set; } = new();

    [JsonPropertyName("meta")]
    public SeatGeekMeta Meta { get; set; } = new();
}

public class SeatGeekEvent
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("datetime_local")]
    public DateTime? DatetimeLocal { get; set; }

    [JsonPropertyName("datetime_utc")]
    public DateTime? DatetimeUtc { get; set; }

    [JsonPropertyName("type")]
    public string? Type { get; set; }

    [JsonPropertyName("url")]
    public string? Url { get; set; }

    [JsonPropertyName("venue")]
    public SeatGeekVenue? Venue { get; set; }

    [JsonPropertyName("performers")]
    public List<SeatGeekPerformer>? Performers { get; set; }

    [JsonPropertyName("stats")]
    public SeatGeekStats? Stats { get; set; }
}

public class SeatGeekVenue
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("city")]
    public string? City { get; set; }

    [JsonPropertyName("state")]
    public string? State { get; set; }

    [JsonPropertyName("country")]
    public string? Country { get; set; }

    [JsonPropertyName("address")]
    public string? Address { get; set; }

    [JsonPropertyName("postal_code")]
    public string? PostalCode { get; set; }

    [JsonPropertyName("location")]
    public SeatGeekLocation? Location { get; set; }
}

public class SeatGeekLocation
{
    [JsonPropertyName("lat")]
    public double? Lat { get; set; }

    [JsonPropertyName("lon")]
    public double? Lon { get; set; }
}

public class SeatGeekPerformer
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("url")]
    public string? Url { get; set; }
}

public class SeatGeekStats
{
    [JsonPropertyName("listing_count")]
    public int? ListingCount { get; set; }

    [JsonPropertyName("average_price")]
    public int? AveragePrice { get; set; }

    [JsonPropertyName("lowest_price")]
    public int? LowestPrice { get; set; }

    [JsonPropertyName("highest_price")]
    public int? HighestPrice { get; set; }
}

public class SeatGeekMeta
{
    [JsonPropertyName("total")]
    public int? Total { get; set; }

    [JsonPropertyName("per_page")]
    public int? PerPage { get; set; }

    [JsonPropertyName("page")]
    public int? Page { get; set; }
}

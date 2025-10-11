using System.Text.Json.Serialization;
using MeminiEventAPI.structures;
namespace MeminiEventAPI.api_datamodels.ticketmaster;


public class TicketmasterDatamodel : IApiDataModel
{
    [JsonPropertyName("_embedded")]
    public TicketmasterEmbedded Embedded { get; set; }

    [JsonPropertyName("page")]
    public PageInfo Page { get; set; }
}

public class TicketmasterEmbedded
{
    [JsonPropertyName("events")]
    public List<TicketmasterEvent> Events { get; set; }
}

public class TicketmasterEvent
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("url")]
    public string Url { get; set; }

    [JsonPropertyName("images")]
    public List<EventImage> Images { get; set; }

    [JsonPropertyName("sales")]
    public SalesInfo Sales { get; set; }

    [JsonPropertyName("dates")]
    public DateInfo Dates { get; set; }

    [JsonPropertyName("classifications")]
    public List<Classification> Classifications { get; set; }

    [JsonPropertyName("priceRanges")]
    public List<PriceRange> PriceRanges { get; set; }

    [JsonPropertyName("_embedded")]
    public EventEmbedded Embedded { get; set; }

    [JsonPropertyName("info")]
    public string Info { get; set; }
}

public class EventImage
{
    [JsonPropertyName("url")]
    public string Url { get; set; }

    [JsonPropertyName("width")]
    public int Width { get; set; }

    [JsonPropertyName("height")]
    public int Height { get; set; }
}

public class SalesInfo
{
    [JsonPropertyName("public")]
    public PublicSales Public { get; set; }
}

public class PublicSales
{
    [JsonPropertyName("startDateTime")]
    public DateTime? StartDateTime { get; set; }

    [JsonPropertyName("endDateTime")]
    public DateTime? EndDateTime { get; set; }
}

public class DateInfo
{
    [JsonPropertyName("start")]
    public StartDate Start { get; set; }

    [JsonPropertyName("timezone")]
    public string Timezone { get; set; }
}

public class StartDate
{
    [JsonPropertyName("localDate")]
    public string LocalDate { get; set; }

    [JsonPropertyName("localTime")]
    public string LocalTime { get; set; }

    [JsonPropertyName("dateTime")]
    public DateTime? DateTime { get; set; }
}

public class Classification
{
    [JsonPropertyName("segment")]
    public Genre Segment { get; set; }

    [JsonPropertyName("genre")]
    public Genre Genre { get; set; }

    [JsonPropertyName("subGenre")]
    public Genre SubGenre { get; set; }
}

public class Genre
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }
}

public class PriceRange
{
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("currency")]
    public string Currency { get; set; }

    [JsonPropertyName("min")]
    public decimal Min { get; set; }

    [JsonPropertyName("max")]
    public decimal Max { get; set; }
}

public class EventEmbedded
{
    [JsonPropertyName("venues")]
    public List<Venue> Venues { get; set; }
}

public class Venue
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("city")]
    public City City { get; set; }

    [JsonPropertyName("country")]
    public Country Country { get; set; }

    [JsonPropertyName("address")]
    public Address Address { get; set; }

    [JsonPropertyName("location")]
    public Location Location { get; set; }
}

public class City
{
    [JsonPropertyName("name")]
    public string Name { get; set; }
}

public class Country
{
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("countryCode")]
    public string CountryCode { get; set; }
}

public class Address
{
    [JsonPropertyName("line1")]
    public string Line1 { get; set; }
}

public class Location
{
    [JsonPropertyName("longitude")]
    public string Longitude { get; set; }

    [JsonPropertyName("latitude")]
    public string Latitude { get; set; }
}

public class PageInfo
{
    [JsonPropertyName("size")]
    public int Size { get; set; }

    [JsonPropertyName("totalElements")]
    public int TotalElements { get; set; }

    [JsonPropertyName("totalPages")]
    public int TotalPages { get; set; }

    [JsonPropertyName("number")]
    public int Number { get; set; }
}

public class NormalizedTicketmasterEvent
{
    public string Id { get; set; }
    public string Source { get; set; } = "ticketmaster";
    public string Name { get; set; }
    public string Url { get; set; }

    // Always check for nulls
    public DateTime? StartDate { get; set; }
    public string StartTime { get; set; }
    public string Timezone { get; set; }

    // Venue (may be partial)
    public string VenueName { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }

    // Optional fields
    public string Category { get; set; }
    public string Genre { get; set; }
    public string ImageUrl { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public string Currency { get; set; }

    // Helper
    public bool HasPrice => MinPrice.HasValue;
    public bool HasLocation => Latitude.HasValue && Longitude.HasValue;
}

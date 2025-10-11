using System.Text.Json.Serialization;
using MeminiEventAPI.structures;
namespace MeminiEventAPI.api_datamodels.predict_hq;

public class PredictHqDataModel : IApiDataModel
{
    [JsonPropertyName("count")]
    public int Count { get; set; }

    [JsonPropertyName("overflow")]
    public bool Overflow { get; set; }

    [JsonPropertyName("next")]
    public string? Next { get; set; }

    [JsonPropertyName("previous")]
    public string? Previous { get; set; }

    [JsonPropertyName("results")]
    public List<PredictHqEvent> Results { get; set; } = new();
}

public class PredictHqEvent
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonPropertyName("category")]
    public string Category { get; set; } = string.Empty;

    [JsonPropertyName("start")]
    public DateTime? Start { get; set; }

    [JsonPropertyName("start_local")]
    public DateTime? StartLocal { get; set; }

    [JsonPropertyName("end")]
    public DateTime? End { get; set; }

    [JsonPropertyName("end_local")]
    public DateTime? EndLocal { get; set; }

    [JsonPropertyName("predicted_end")]
    public DateTime? PredictedEnd { get; set; }

    [JsonPropertyName("predicted_end_local")]
    public DateTime? PredictedEndLocal { get; set; }

    [JsonPropertyName("timezone")]
    public string Timezone { get; set; } = string.Empty;

    [JsonPropertyName("duration")]
    public int? Duration { get; set; }

    [JsonPropertyName("country")]
    public string Country { get; set; } = string.Empty;

    [JsonPropertyName("rank")]
    public int? Rank { get; set; }

    [JsonPropertyName("local_rank")]
    public int? LocalRank { get; set; }

    [JsonPropertyName("phq_attendance")]
    public int? PhqAttendance { get; set; }

    [JsonPropertyName("predicted_event_spend")]
    public decimal? PredictedEventSpend { get; set; }

    [JsonPropertyName("predicted_event_spend_industries")]
    public PredictedEventSpendIndustries? PredictedEventSpendIndustries { get; set; }

    [JsonPropertyName("geo")]
    public GeoLocation Geo { get; set; } = new();

    [JsonPropertyName("scope")]
    public string Scope { get; set; } = string.Empty;

    [JsonPropertyName("relevance")]
    public double? Relevance { get; set; }

    [JsonPropertyName("state")]
    public string State { get; set; } = string.Empty;

    [JsonPropertyName("brand_safe")]
    public bool BrandSafe { get; set; }

    [JsonPropertyName("phq_labels")]
    public List<PhqLabel> PhqLabels { get; set; } = new();

    [JsonPropertyName("entities")]
    public List<EventEntity>? Entities { get; set; }

    [JsonPropertyName("cancelled")]
    public DateTime? Cancelled { get; set; }

    [JsonPropertyName("postponed")]
    public DateTime? Postponed { get; set; }

    [JsonPropertyName("updated")]
    public DateTime Updated { get; set; }

    [JsonPropertyName("first_seen")]
    public DateTime? FirstSeen { get; set; }
}

public class GeoLocation
{
    [JsonPropertyName("geometry")]
    public Geometry Geometry { get; set; } = new();

    [JsonPropertyName("placekey")]
    public string? Placekey { get; set; }

    [JsonPropertyName("address")]
    public Address? Address { get; set; }
}

public class Geometry
{
    [JsonPropertyName("type")]
    public string Type { get; set; } = string.Empty;

    [JsonPropertyName("coordinates")]
    public List<double> Coordinates { get; set; } = new();
}

public class Address
{
    [JsonPropertyName("country_code")]
    public string CountryCode { get; set; } = string.Empty;

    [JsonPropertyName("formatted_address")]
    public string? FormattedAddress { get; set; }

    [JsonPropertyName("locality")]
    public string? Locality { get; set; }

    [JsonPropertyName("region")]
    public string? Region { get; set; }

    [JsonPropertyName("postcode")]
    public string? Postcode { get; set; }
}

public class PhqLabel
{
    [JsonPropertyName("label")]
    public string Label { get; set; } = string.Empty;

    [JsonPropertyName("weight")]
    public double Weight { get; set; }
}

public class EventEntity
{
    [JsonPropertyName("entity_id")]
    public string EntityId { get; set; } = string.Empty;

    [JsonPropertyName("type")]
    public string Type { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("labels")]
    public List<string>? Labels { get; set; }
}

public class PredictedEventSpendIndustries
{
    [JsonPropertyName("accommodation")]
    public decimal? Accommodation { get; set; }

    [JsonPropertyName("hospitality")]
    public decimal? Hospitality { get; set; }

    [JsonPropertyName("transportation")]
    public decimal? Transportation { get; set; }
}
using System.Text.Json.Serialization;
using MeminiEventAPI.structures;

namespace MeminiEventAPI.api_datamodels.meetup;

public class MeetupDataModel : IApiDataModel
{
    [JsonPropertyName("meta")]
    public MeetupMeta Meta { get; set; } = new();

    [JsonPropertyName("results")]
    public List<MeetupEvent> Results { get; set; } = new();
}

public class MeetupMeta
{
    [JsonPropertyName("total_count")]
    public int TotalCount { get; set; }
}

public class MeetupEvent
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonPropertyName("time")]
    public long Time { get; set; }

    [JsonPropertyName("utc_offset")]
    public int UtcOffset { get; set; }

    [JsonPropertyName("venue")]
    public MeetupVenue? Venue { get; set; }

    [JsonPropertyName("group")]
    public MeetupGroup? Group { get; set; }
}

public class MeetupVenue
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

    [JsonPropertyName("lat")]
    public double? Lat { get; set; }

    [JsonPropertyName("lon")]
    public double? Lon { get; set; }
}

public class MeetupGroup
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("urlname")]
    public string Urlname { get; set; } = string.Empty;
}

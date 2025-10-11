using MeminiEventAPI.structures;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MeminiEventAPI.api_datamodels.songkick
{
    public class SongkickDatamodel: IApiDataModel
    {
        [JsonPropertyName("resultsPage")]
        public SongkickResultsPage ResultsPage { get; set; } = new();
    }

    public class SongkickResultsPage
    {
        [JsonPropertyName("status")]
        public string Status { get; set; } = string.Empty;

        [JsonPropertyName("results")]
        public SongkickResults Results { get; set; } = new();
    }

    public class SongkickResults
    {
        [JsonPropertyName("event")]
        public List<SongkickEvent> Events { get; set; } = new();
    }

    public class SongkickEvent
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("displayName")]
        public string DisplayName { get; set; } = string.Empty;

        [JsonPropertyName("type")]
        public string Type { get; set; } = string.Empty;

        [JsonPropertyName("start")]
        public SongkickEventStart Start { get; set; } = new();

        [JsonPropertyName("location")]
        public SongkickEventLocation Location { get; set; } = new();

        [JsonPropertyName("venue")]
        public SongkickEventVenue Venue { get; set; } = new();
    }

    public class SongkickEventStart
    {
        [JsonPropertyName("date")]
        public string? Date { get; set; }

        [JsonPropertyName("time")]
        public string? Time { get; set; }
    }

    public class SongkickEventLocation
    {
        [JsonPropertyName("city")]
        public string City { get; set; } = string.Empty;

        [JsonPropertyName("lat")]
        public double? Lat { get; set; }

        [JsonPropertyName("lng")]
        public double? Lng { get; set; }
    }

    public class SongkickEventVenue
    {
        [JsonPropertyName("displayName")]
        public string DisplayName { get; set; } = string.Empty;
    }
}

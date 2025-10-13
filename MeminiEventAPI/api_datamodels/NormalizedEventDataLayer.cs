using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace MeminiEventAPI.api_datamodels;
using System;
using System.Collections.Generic;
// ==================== CORE EVENT MODEL ====================

/// <summary>
/// Normalized event model that aggregates all event data from various sources
/// </summary>
public class NormalizedEvent
{
    public string? Id { get; set; }
    public string? ExternalId { get; set; }
    public EventSource? Source { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? Url { get; set; }

    public EventTemporalInfo? TemporalInfo { get; set; }
    public EventGeographicInfo? GeographicInfo { get; set; }
    public EventVenueInfo? VenueInfo { get; set; }
    public EventCategorizationInfo? CategorizationInfo { get; set; }
    public EventStatusInfo? StatusInfo { get; set; }
    public List<EventPerformer>? Performers { get; set; }
    public EventPricingInfo? PricingInfo { get; set; }
    public List<EventMedia>? Media { get; set; }
    public Dictionary<string, object>? AdditionalData { get; set; }

    public double? DataQuality { get; set; }

    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

// ==================== TEMPORAL INFORMATION ====================

/// <summary>
/// Date and time related information for events
/// </summary>
public class EventTemporalInfo
{
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public DateTime? LocalStartDate { get; set; }
    public DateTime? LocalEndDate { get; set; }
    public string? Timezone { get; set; }
    public TimeSpan? Duration { get; set; }
    public bool? IsDateTBD { get; set; }
    public bool? IsTimeTBD { get; set; }
    public string? DisplayTime { get; set; }
    public RecurrenceInfo? Recurrence { get; set; }
}

public class RecurrenceInfo
{
    public bool? IsRecurring { get; set; }
    public string? Frequency { get; set; }
    public DateTime? RecurrenceEndDate { get; set; }
}

// ==================== GEOGRAPHIC INFORMATION ====================

/// <summary>
/// Geographic and location data for events
/// </summary>
public class EventGeographicInfo
{
    public string? Country { get; set; }
    public string? CountryCode { get; set; }
    public string? State { get; set; }
    public string? StateCode { get; set; }
    public string? City { get; set; }
    public string? PostalCode { get; set; }
    public GeoCoordinates? Coordinates { get; set; }
    public string? Address { get; set; }
    public SearchRadius? SearchRadius { get; set; }
    public string? PlaceId { get; set; }
}

public class GeoCoordinates
{
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
}

public class SearchRadius
{
    public double? Value { get; set; }
    public DistanceUnit? Unit { get; set; }
}
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum DistanceUnit
{
    Miles,
    Kilometers
}

// ==================== VENUE INFORMATION ====================

/// <summary>
/// Venue-specific information
/// </summary>
public class EventVenueInfo
{
    public string? VenueId { get; set; }
    public string? Name { get; set; }
    public string? Type { get; set; }
    public GeoCoordinates? Coordinates { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public int? Capacity { get; set; }
    public string? Url { get; set; }
    public Dictionary<string, string>? AdditionalInfo { get; set; }
}

// ==================== CATEGORIZATION & LABELS ====================

/// <summary>
/// Categories, tags, and classification data
/// </summary>
public class EventCategorizationInfo
{
    public string? PrimaryCategory { get; set; }
    public List<string>? Categories { get; set; }
    public List<string>? Tags { get; set; }
    public List<string>? Labels { get; set; }
    public string? Genre { get; set; }
    public string? SubGenre { get; set; }
    public string? Type { get; set; }
    public string? Segment { get; set; }
    public EventRank? Rank { get; set; }
    public bool? IsFeatured { get; set; }
}

public class EventRank
{
    public int? GlobalRank { get; set; }
    public int? LocalRank { get; set; }
    public double? RelevanceScore { get; set; }
}

// ==================== STATUS INFORMATION ====================

/// <summary>
/// Event status and state information
/// </summary>
public class EventStatusInfo
{
    public EventStatus? Status { get; set; }
    public string? StatusReason { get; set; }
    public bool? IsActive { get; set; }
    public bool? IsCancelled { get; set; }
    public bool? IsPostponed { get; set; }
    public bool? IsRescheduled { get; set; }
    public bool? IsSoldOut { get; set; }
    public DateTime? StatusChangedAt { get; set; }
    public TicketAvailability? TicketAvailability { get; set; }
}
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum EventStatus
{
    Active,
    Scheduled,
    Cancelled,
    Postponed,
    Rescheduled,
    Completed,
    OnSale,
    OffSale
}
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TicketAvailability
{
    Available,
    LimitedAvailability,
    SoldOut,
    NotAvailable,
    Unknown
}

// ==================== PERFORMER INFORMATION ====================

public class EventPerformer
{
    public string? Id { get; set; }
    public string? Name { get; set; }
    public string? Type { get; set; }
    public bool? IsHeadliner { get; set; }
    public string? ImageUrl { get; set; }
    public string? Url { get; set; }
    public List<string>? Genres { get; set; }
}

// ==================== PRICING INFORMATION ====================

public class EventPricingInfo
{
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public string? Currency { get; set; }
    public List<PriceRange>? PriceRanges { get; set; }
    public bool? IsFree { get; set; }
}

public class PriceRange
{
    public string? Type { get; set; }
    public decimal? Min { get; set; }
    public decimal? Max { get; set; }
    public string? Currency { get; set; }
}

// ==================== MEDIA INFORMATION ====================

public class EventMedia
{
    public string? Url { get; set; }
    public MediaType? Type { get; set; }
    public int? Width { get; set; }
    public int? Height { get; set; }
    public bool? IsPrimary { get; set; }
    public string? Attribution { get; set; }
}
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum MediaType
{
    Image,
    Video,
    Thumbnail
}

// ==================== SOURCE INFORMATION ====================


[JsonConverter(typeof(JsonStringEnumConverter))]
public enum EventSource
{
    Ticketmaster,
    PredictHQ,
    SeatGeek,
    Meetup,
    Unknown
}



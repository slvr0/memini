using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

public enum MediaType
{
    Image,
    Video,
    Thumbnail
}

// ==================== SOURCE INFORMATION ====================

public enum EventSource
{
    Ticketmaster,
    PredictHQ,
    SeatGeek,
    Meetup,
    Unknown
}

// ==================== SEARCH & QUERY MODELS ====================

/// <summary>
/// Unified search query parameters for all event sources
/// </summary>
public class EventSearchQuery
{
    public EventGeographicFilter? GeographicFilter { get; set; }
    public EventTemporalFilter? TemporalFilter { get; set; }
    public EventCategorizationFilter? CategorizationFilter { get; set; }
    public EventStatusFilter? StatusFilter { get; set; }
    public string? Keyword { get; set; }
    public List<EventSource>? Sources { get; set; }
    public EventResultControl? ResultControl { get; set; }
}

public class EventGeographicFilter
{
    public string? Country { get; set; }
    public string? CountryCode { get; set; }
    public string? State { get; set; }
    public string? StateCode { get; set; }
    public string? City { get; set; }
    public string? PostalCode { get; set; }
    public GeoCoordinates? Center { get; set; }
    public SearchRadius? Radius { get; set; }
    public GeoBoundingBox? BoundingBox { get; set; }
}

public class GeoBoundingBox
{
    public GeoCoordinates? NorthEast { get; set; }
    public GeoCoordinates? SouthWest { get; set; }
}

public class EventTemporalFilter
{
    public DateTime? StartDateFrom { get; set; }
    public DateTime? StartDateTo { get; set; }
    public DateTime? EndDateFrom { get; set; }
    public DateTime? EndDateTo { get; set; }
    public List<DayOfWeek>? DaysOfWeek { get; set; }
    public TimeSpan? MinDuration { get; set; }
    public TimeSpan? MaxDuration { get; set; }
}

public class EventCategorizationFilter
{
    public List<string>? Categories { get; set; }
    public List<string>? Genres { get; set; }
    public List<string>? Tags { get; set; }
    public List<string>? Types { get; set; }
    public string? Segment { get; set; }
    public int? MinRank { get; set; }
    public int? MaxRank { get; set; }
    public bool? IsFeatured { get; set; }
}

public class EventStatusFilter
{
    public List<EventStatus>? Statuses { get; set; }
    public bool? IsActive { get; set; }
    public bool? IsCancelled { get; set; }
    public bool? IsSoldOut { get; set; }
    public List<TicketAvailability>? TicketAvailability { get; set; }
}

public class EventResultControl
{
    public int? PageSize { get; set; }
    public int? PageOffset { get; set; }
    public int? PageNumber { get; set; }
    public int? MaxResults { get; set; }
    public EventSortOption? SortBy { get; set; }
    public SortDirection? SortDirection { get; set; }
}

public enum EventSortOption
{
    Relevance,
    Date,
    Name,
    Distance,
    Popularity,
    Rank,
    Random
}

public enum SortDirection
{
    Ascending,
    Descending
}

// ==================== RESPONSE MODELS ====================

/// <summary>
/// Paginated response wrapper for event searches
/// </summary>
public class EventSearchResponse
{
    public List<NormalizedEvent>? Events { get; set; }
    public PaginationInfo? Pagination { get; set; }
    public SearchMetadata? Metadata { get; set; }
}

public class PaginationInfo
{
    public int? TotalResults { get; set; }
    public int? PageSize { get; set; }
    public int? PageOffset { get; set; }
    public int? PageNumber { get; set; }
    public int? TotalPages { get; set; }
    public bool? HasNextPage { get; set; }
    public bool? HasPreviousPage { get; set; }
}

public class SearchMetadata
{
    public DateTime? SearchTimestamp { get; set; }
    public TimeSpan? SearchDuration { get; set; }
    public List<EventSource>? SourcesQueried { get; set; }
    public Dictionary<EventSource, int>? ResultsBySource { get; set; }
    public Dictionary<string, object>? AdditionalInfo { get; set; }
}

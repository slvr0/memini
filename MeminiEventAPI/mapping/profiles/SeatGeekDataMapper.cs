using System;
using System.Collections.Generic;
using System.Linq;
using MeminiEventAPI.api_datamodels;
using SG = MeminiEventAPI.api_datamodels.seatgeek;
using MeminiEventAPI.mapping;

namespace MeminiEventAPI.mapping.profiles;

/// <summary>
/// SeatGeek to NormalizedEvent mapper using FluentQualityMapper
/// </summary>
public class SeatGeekMapper
{
    private readonly FluentQualityMapper<SG.SeatGeekEvent, NormalizedEvent> _mapper;

    public SeatGeekMapper()
    {
        _mapper = new FluentQualityMapper<SG.SeatGeekEvent, NormalizedEvent>();
        ConfigureMapping();
    }

    public FluentQualityMapper<SG.SeatGeekEvent, NormalizedEvent> Mapper => _mapper;

    private void ConfigureMapping()
    {
        // ==================== BASIC INFORMATION ====================

        // External ID
        _mapper.Map(
            sourceExpression: s => s.Id,
            destExpression: d => d.ExternalId,
            converter: id => id.ToString(),
            trackQuality: true
        );

        // Event Name
        _mapper.Map(
            sourceExpression: s => s.Title,
            destExpression: d => d.Name,
            converter: title => title?.Trim(),
            trackQuality: true
        );

        // Event URL
        _mapper.Map(
            sourceExpression: s => s.Url,
            destExpression: d => d.Url,
            trackQuality: true
        );

        // Source - Not tracked (always set)
        _mapper.Map(
            sourceExpression: s => s,
            destExpression: d => d.Source,
            converter: _ => EventSource.SeatGeek,
            trackQuality: false
        );

        // ==================== TEMPORAL INFORMATION ====================

        _mapper.Map(
            sourceExpression: s => s,
            destExpression: d => d.TemporalInfo,
            converter: evt => BuildTemporalInfo(evt),
            trackQuality: true
        );

        // ==================== GEOGRAPHIC INFORMATION ====================

        _mapper.Map(
            sourceExpression: s => s.Venue,
            destExpression: d => d.GeographicInfo,
            converter: venue => BuildGeographicInfo(venue),
            trackQuality: true
        );

        // ==================== VENUE INFORMATION ====================

        _mapper.Map(
            sourceExpression: s => s.Venue,
            destExpression: d => d.VenueInfo,
            converter: venue => BuildVenueInfo(venue),
            trackQuality: true
        );

        // ==================== CATEGORIZATION ====================

        _mapper.Map(
            sourceExpression: s => s.Type,
            destExpression: d => d.CategorizationInfo,
            converter: type => BuildCategorizationInfo(type),
            trackQuality: true
        );

        // ==================== STATUS INFORMATION ====================

        _mapper.Map(
            sourceExpression: s => s,
            destExpression: d => d.StatusInfo,
            converter: _ => BuildStatusInfo(),
            trackQuality: true
        );

        // ==================== PRICING ====================

        _mapper.Map(
            sourceExpression: s => s.Stats,
            destExpression: d => d.PricingInfo,
            converter: stats => BuildPricingInfo(stats),
            trackQuality: true
        );

        // ==================== MEDIA ====================
        // SeatGeek doesn't have media in the provided model

        _mapper.Map(
            sourceExpression: s => s,
            destExpression: d => d.Media,
            converter: _ => null,
            trackQuality: false
        );

        // ==================== PERFORMERS ====================

        _mapper.Map(
            sourceExpression: s => s.Performers,
            destExpression: d => d.Performers,
            converter: performers => BuildPerformers(performers),
            trackQuality: true
        );

        // ==================== METADATA (Not tracked) ====================

        _mapper.Map(
            sourceExpression: s => s,
            destExpression: d => d.Id,
            converter: _ => Guid.NewGuid().ToString(),
            trackQuality: false
        );

        _mapper.Map(
            sourceExpression: s => s,
            destExpression: d => d.CreatedAt,
            converter: _ => DateTime.UtcNow,
            trackQuality: false
        );

        _mapper.Map(
            sourceExpression: s => s,
            destExpression: d => d.UpdatedAt,
            converter: _ => DateTime.UtcNow,
            trackQuality: false
        );

        _mapper.Map(
            sourceExpression: s => s,
            destExpression: d => d.AdditionalData,
            converter: _ => null,
            trackQuality: false
        );

        _mapper.Map(
            sourceExpression: s => s,
            destExpression: d => d.Description,
            converter: _ => null,
            trackQuality: false
        );
    }

    /// <summary>
    /// Map a single SeatGeek event to NormalizedEvent with quality tracking
    /// </summary>
    public MappingResult<NormalizedEvent> Map(SG.SeatGeekEvent source)
    {
        var result = _mapper.Execute(source);

        // Set the quality score on the result object
        if (result.Result != null)
        {
            result.Result.DataQuality = result.Quality;
        }

        return result;
    }

    /// <summary>
    /// Map multiple events with quality filtering
    /// </summary>
    public List<MappingResult<NormalizedEvent>> MapMany(IEnumerable<SG.SeatGeekEvent> sources, double minQuality = 0.0)
    {
        return sources
            .Select(s => Map(s))
            .Where(r => r.Quality >= minQuality)
            .ToList();
    }

    // ==================== TEMPORAL INFO BUILDER ====================

    private EventTemporalInfo? BuildTemporalInfo(SG.SeatGeekEvent source)
    {
        if (source.DatetimeUtc == null && source.DatetimeLocal == null)
            return null;

        return new EventTemporalInfo
        {
            StartDate = source.DatetimeUtc,
            LocalStartDate = source.DatetimeLocal
        };
    }

    // ==================== GEOGRAPHIC INFO BUILDER ====================

    private EventGeographicInfo? BuildGeographicInfo(SG.SeatGeekVenue? venue)
    {
        if (venue == null)
            return null;

        GeoCoordinates? coordinates = null;
        if (venue.Location?.Lat.HasValue == true && venue.Location?.Lon.HasValue == true)
        {
            coordinates = new GeoCoordinates
            {
                Latitude = venue.Location.Lat,
                Longitude = venue.Location.Lon
            };
        }

        // Only return if we have at least some geographic data
        var hasData = !string.IsNullOrWhiteSpace(venue.Country) ||
                     !string.IsNullOrWhiteSpace(venue.City) ||
                     coordinates != null;

        if (!hasData) return null;

        return new EventGeographicInfo
        {
            Country = string.IsNullOrWhiteSpace(venue.Country) ? null : venue.Country,
            State = string.IsNullOrWhiteSpace(venue.State) ? null : venue.State,
            City = string.IsNullOrWhiteSpace(venue.City) ? null : venue.City,
            PostalCode = string.IsNullOrWhiteSpace(venue.PostalCode) ? null : venue.PostalCode,
            Address = string.IsNullOrWhiteSpace(venue.Address) ? null : venue.Address,
            Coordinates = coordinates
        };
    }

    // ==================== VENUE INFO BUILDER ====================

    private EventVenueInfo? BuildVenueInfo(SG.SeatGeekVenue? venue)
    {
        if (venue == null)
            return null;

        GeoCoordinates? coordinates = null;
        if (venue.Location?.Lat.HasValue == true && venue.Location?.Lon.HasValue == true)
        {
            coordinates = new GeoCoordinates
            {
                Latitude = venue.Location.Lat,
                Longitude = venue.Location.Lon
            };
        }

        return new EventVenueInfo
        {
            VenueId = venue.Id.ToString(),
            Name = string.IsNullOrWhiteSpace(venue.Name) ? null : venue.Name,
            City = string.IsNullOrWhiteSpace(venue.City) ? null : venue.City,
            Address = string.IsNullOrWhiteSpace(venue.Address) ? null : venue.Address,
            Coordinates = coordinates
        };
    }

    // ==================== CATEGORIZATION INFO BUILDER ====================

    private EventCategorizationInfo? BuildCategorizationInfo(string? type)
    {
        if (string.IsNullOrWhiteSpace(type))
            return null;

        return new EventCategorizationInfo
        {
            PrimaryCategory = type,
            Type = type
        };
    }

    // ==================== STATUS INFO BUILDER ====================

    private EventStatusInfo BuildStatusInfo()
    {
        // SeatGeek events returned from API are typically active
        return new EventStatusInfo
        {
            IsActive = true,
            Status = EventStatus.Active
        };
    }

    // ==================== PRICING INFO BUILDER ====================

    private EventPricingInfo? BuildPricingInfo(SG.SeatGeekStats? stats)
    {
        if (stats == null)
            return null;

        // Check if we have any price data
        if (!stats.LowestPrice.HasValue && !stats.HighestPrice.HasValue)
            return null;

        return new EventPricingInfo
        {
            MinPrice = stats.LowestPrice,
            MaxPrice = stats.HighestPrice,
            Currency = "USD" // SeatGeek typically uses USD
        };
    }

    // ==================== PERFORMERS BUILDER ====================

    private List<EventPerformer>? BuildPerformers(List<SG.SeatGeekPerformer>? performers)
    {
        if (performers == null || !performers.Any())
            return null;

        var performerList = performers
            .Where(p => !string.IsNullOrWhiteSpace(p.Name))
            .Select((p, index) => new EventPerformer
            {
                Id = p.Id.ToString(),
                Name = p.Name,
                Url = string.IsNullOrWhiteSpace(p.Url) ? null : p.Url,
                IsHeadliner = index == 0
            })
            .ToList();

        return performerList.Any() ? performerList : null;
    }
}
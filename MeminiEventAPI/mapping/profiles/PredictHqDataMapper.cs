using System;
using System.Collections.Generic;
using System.Linq;
using MeminiEventAPI.api_datamodels;
using PHQ = MeminiEventAPI.api_datamodels.predict_hq;
using MeminiEventAPI.mapping;

namespace MeminiEventAPI.mapping.profiles;

/// <summary>
/// PredictHQ to NormalizedEvent mapper using FluentQualityMapper
/// </summary>
public class PredictHqMapper
{
    private readonly FluentQualityMapper<PHQ.PredictHqEvent, NormalizedEvent> _mapper;

    public PredictHqMapper()
    {
        _mapper = new FluentQualityMapper<PHQ.PredictHqEvent, NormalizedEvent>();
        ConfigureMapping();
    }

    public FluentQualityMapper<PHQ.PredictHqEvent, NormalizedEvent> Mapper => _mapper;

    private void ConfigureMapping()
    {
        // ==================== BASIC INFORMATION ====================

        // External ID
        _mapper.Map(
            sourceExpression: s => s.Id,
            destExpression: d => d.ExternalId,
            converter: id => id?.Trim(),
            trackQuality: true
        );

        // Event Name
        _mapper.Map(
            sourceExpression: s => s.Title,
            destExpression: d => d.Name,
            converter: title => title?.Trim(),
            trackQuality: true
        );

        // Description
        _mapper.Map(
            sourceExpression: s => s.Description,
            destExpression: d => d.Description,
            converter: desc => string.IsNullOrWhiteSpace(desc) ? null : desc.Trim(),
            trackQuality: true
        );

        // ==================== GEOGRAPHIC INFORMATION ====================

        _mapper.Map(
            sourceExpression: s => s,
            destExpression: d => d.GeographicInfo,
            converter: evt => BuildGeographicInfo(evt),
            trackQuality: true
        );
    
        // ==================== CATEGORIZATION ====================

        _mapper.Map(
            sourceExpression: s => s,
            destExpression: d => d.CategorizationInfo,
            converter: evt => BuildCategorizationInfo(evt),
            trackQuality: true
        );

        // ==================== STATUS INFORMATION ====================

        _mapper.Map(
            sourceExpression: s => s,
            destExpression: d => d.StatusInfo,
            converter: evt => BuildStatusInfo(evt),
            trackQuality: true
        );

        // ==================== PRICING ====================
        // PredictHQ doesn't have pricing info

        _mapper.Map(
            sourceExpression: s => s,
            destExpression: d => d.PricingInfo,
            converter: _ => null,
            trackQuality: false
        );

        // ==================== MEDIA ====================
        // PredictHQ doesn't have media

        _mapper.Map(
            sourceExpression: s => s,
            destExpression: d => d.Media,
            converter: _ => null,
            trackQuality: false
        );

        // ==================== PERFORMERS ====================

        _mapper.Map(
            sourceExpression: s => s.Entities,
            destExpression: d => d.Performers,
            converter: entities => BuildPerformers(entities),
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
    }

    /// <summary>
    /// Map a single PredictHQ event to NormalizedEvent with quality tracking
    /// </summary>
    public MappingResult<NormalizedEvent> Map(PHQ.PredictHqEvent source)
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
    public List<MappingResult<NormalizedEvent>> MapMany(IEnumerable<PHQ.PredictHqEvent> sources, double minQuality = 0.0)
    {
        return sources
            .Select(s => Map(s))
            .Where(r => r.Quality >= minQuality)
            .ToList();
    }

    // ==================== TEMPORAL INFO BUILDER ====================

    private EventTemporalInfo? BuildTemporalInfo(PHQ.PredictHqEvent source)
    {
        if (source.Start == null && source.StartLocal == null)
            return null;

        return new EventTemporalInfo
        {
            StartDate = source.Start,
            EndDate = source.End ?? source.PredictedEnd,
            LocalStartDate = source.StartLocal,
            LocalEndDate = source.EndLocal ?? source.PredictedEndLocal,
            Timezone = string.IsNullOrWhiteSpace(source.Timezone) ? null : source.Timezone,
            Duration = source.Duration.HasValue ? TimeSpan.FromSeconds(source.Duration.Value) : null
        };
    }

    // ==================== GEOGRAPHIC INFO BUILDER ====================

    private EventGeographicInfo? BuildGeographicInfo(PHQ.PredictHqEvent source)
    {
        var geo = source.Geo;
        if (geo == null)
            return null;

        var coordinates = geo.Geometry?.Coordinates;
        var address = geo.Address;

        GeoCoordinates? geoCoords = null;
        if (coordinates != null && coordinates.Count >= 2)
        {
            geoCoords = new GeoCoordinates
            {
                Longitude = coordinates[0],
                Latitude = coordinates[1]
            };
        }

        // Only return if we have at least some geographic data
        var hasData = !string.IsNullOrWhiteSpace(source.Country) ||
                     !string.IsNullOrWhiteSpace(address?.Locality) ||
                     geoCoords != null;

        if (!hasData) return null;

        return new EventGeographicInfo
        {
            Country = string.IsNullOrWhiteSpace(source.Country) ? null : source.Country,
            CountryCode = string.IsNullOrWhiteSpace(address?.CountryCode) ? null : address.CountryCode,
            City = string.IsNullOrWhiteSpace(address?.Locality) ? null : address.Locality,
            State = string.IsNullOrWhiteSpace(address?.Region) ? null : address.Region,
            PostalCode = string.IsNullOrWhiteSpace(address?.Postcode) ? null : address.Postcode,
            Address = string.IsNullOrWhiteSpace(address?.FormattedAddress) ? null : address.FormattedAddress,
            Coordinates = geoCoords,
            PlaceId = string.IsNullOrWhiteSpace(geo.Placekey) ? null : geo.Placekey
        };
    }

    // ==================== CATEGORIZATION INFO BUILDER ====================

    private EventCategorizationInfo? BuildCategorizationInfo(PHQ.PredictHqEvent source)
    {
        var category = source.Category;
        var labels = source.PhqLabels?.Select(l => l.Label).Where(l => !string.IsNullOrWhiteSpace(l)).ToList();

        if (string.IsNullOrWhiteSpace(category) && (labels == null || !labels.Any()))
            return null;

        EventRank? rank = null;
        if (source.Rank.HasValue || source.LocalRank.HasValue || source.Relevance.HasValue)
        {
            rank = new EventRank
            {
                GlobalRank = source.Rank,
                LocalRank = source.LocalRank,
                RelevanceScore = source.Relevance
            };
        }

        return new EventCategorizationInfo
        {
            PrimaryCategory = string.IsNullOrWhiteSpace(category) ? null : category,
            Categories = labels?.Any() == true ? labels : null,
            Labels = labels?.Any() == true ? labels : null,
            Rank = rank
        };
    }

    // ==================== STATUS INFO BUILDER ====================

    private EventStatusInfo? BuildStatusInfo(PHQ.PredictHqEvent source)
    {
        EventStatus? status = null;
        if (source.Cancelled.HasValue)
            status = EventStatus.Cancelled;
        else if (source.Postponed.HasValue)
            status = EventStatus.Postponed;
        else if (!string.IsNullOrWhiteSpace(source.State) && source.State.ToLower() == "active")
            status = EventStatus.Active;

        return new EventStatusInfo
        {
            Status = status,
            IsActive = !string.IsNullOrWhiteSpace(source.State) && source.State.ToLower() == "active",
            IsCancelled = source.Cancelled.HasValue,
            IsPostponed = source.Postponed.HasValue,
            StatusChangedAt = source.Cancelled ?? source.Postponed
        };
    }

    // ==================== PERFORMERS BUILDER ====================

    private List<EventPerformer>? BuildPerformers(List<PHQ.EventEntity>? entities)
    {
        if (entities == null || !entities.Any())
            return null;

        var performers = entities
            .Where(e => !string.IsNullOrWhiteSpace(e.Name))
            .Select(e => new EventPerformer
            {
                Id = string.IsNullOrWhiteSpace(e.EntityId) ? null : e.EntityId,
                Name = e.Name,
                Type = string.IsNullOrWhiteSpace(e.Type) ? null : e.Type,
                Genres = e.Labels?.Any() == true ? e.Labels : null
            })
            .ToList();

        return performers.Any() ? performers : null;
    }
}
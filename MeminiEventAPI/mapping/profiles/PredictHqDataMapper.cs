// PredictHqMapper.cs
using System;
using System.Collections.Generic;
using System.Linq;
using MeminiEventAPI.api_datamodels;
using PHQ = MeminiEventAPI.api_datamodels.predict_hq;

namespace MeminiEventAPI.mapping.profiles;

/// <summary>
/// PredictHQ to NormalizedEvent mapper
/// </summary>
public class PredictHqMapper : FluentQualityMapper<PHQ.PredictHqEvent, NormalizedEvent>
{
    public PredictHqMapper()
    {
        ConfigureMapping();
    }

    private void ConfigureMapping()
    {
        // ==================== BASIC INFORMATION ====================
        Map(s => s.Id, d => d.ExternalId, id => id?.Trim(), trackQuality: true);
        Map(s => s.Title, d => d.Name, title => title?.Trim(), trackQuality: true);
        Map(s => s.Description, d => d.Description,
            desc => string.IsNullOrWhiteSpace(desc) ? null : desc.Trim(), trackQuality: true);

        // ==================== TEMPORAL INFORMATION ====================
        Map(s => s, d => d.TemporalInfo, evt => BuildTemporalInfo(evt), trackQuality: true);

        // ==================== GEOGRAPHIC INFORMATION ====================
        Map(s => s, d => d.GeographicInfo, evt => BuildGeographicInfo(evt), trackQuality: true);

        // ==================== CATEGORIZATION ====================
        Map(s => s, d => d.CategorizationInfo, evt => BuildCategorizationInfo(evt), trackQuality: true);

        // ==================== STATUS INFORMATION ====================
        Map(s => s, d => d.StatusInfo, evt => BuildStatusInfo(evt), trackQuality: true);

        // ==================== PRICING ====================
        Map(s => s, d => d.PricingInfo, _ => null, trackQuality: false);

        // ==================== MEDIA ====================
        Map(s => s, d => d.Media, _ => null, trackQuality: false);

        // ==================== PERFORMERS ====================
        Map(s => s.Entities, d => d.Performers, entities => BuildPerformers(entities), trackQuality: true);

        // ==================== METADATA (Not tracked) ====================
        Map(s => s, d => d.Id, _ => Guid.NewGuid().ToString(), trackQuality: false);
        Map(s => s, d => d.CreatedAt, _ => DateTime.UtcNow, trackQuality: false);
        Map(s => s, d => d.UpdatedAt, _ => DateTime.UtcNow, trackQuality: false);
        Map(s => s, d => d.AdditionalData, _ => null, trackQuality: false);
    }

    // ==================== BUILDER METHODS ====================

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
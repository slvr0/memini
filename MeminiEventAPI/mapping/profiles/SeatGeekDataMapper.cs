// SeatGeekMapper.cs
using System;
using System.Collections.Generic;
using System.Linq;
using MeminiEventAPI.api_datamodels;
using SG = MeminiEventAPI.api_datamodels.seatgeek;

namespace MeminiEventAPI.mapping.profiles;

/// <summary>
/// SeatGeek to NormalizedEvent mapper
/// </summary>
public class SeatGeekMapper : FluentQualityMapper<SG.SeatGeekEvent, NormalizedEvent>
{
    public SeatGeekMapper()
    {
        ConfigureMapping();
    }

    private void ConfigureMapping()
    {
        // ==================== BASIC INFORMATION ====================
        Map(s => s.Id, d => d.ExternalId, id => id.ToString(), trackQuality: true);
        Map(s => s.Title, d => d.Name, title => title?.Trim(), trackQuality: true);
        Map(s => s.Url, d => d.Url, trackQuality: true);
        Map(s => s, d => d.Source, _ => EventSource.SeatGeek, trackQuality: false);

        // ==================== TEMPORAL INFORMATION ====================
        Map(s => s, d => d.TemporalInfo, evt => BuildTemporalInfo(evt), trackQuality: true);

        // ==================== GEOGRAPHIC INFORMATION ====================
        Map(s => s.Venue, d => d.GeographicInfo, venue => BuildGeographicInfo(venue), trackQuality: true);

        // ==================== VENUE INFORMATION ====================
        Map(s => s.Venue, d => d.VenueInfo, venue => BuildVenueInfo(venue), trackQuality: true);

        // ==================== CATEGORIZATION ====================
        Map(s => s.Type, d => d.CategorizationInfo, type => BuildCategorizationInfo(type), trackQuality: true);

        // ==================== STATUS INFORMATION ====================
        Map(s => s, d => d.StatusInfo, _ => BuildStatusInfo(), trackQuality: true);

        // ==================== PRICING ====================
        Map(s => s.Stats, d => d.PricingInfo, stats => BuildPricingInfo(stats), trackQuality: true);

        // ==================== MEDIA ====================
        Map(s => s, d => d.Media, _ => null, trackQuality: false);

        // ==================== PERFORMERS ====================
        Map(s => s.Performers, d => d.Performers, performers => BuildPerformers(performers), trackQuality: true);

        // ==================== METADATA (Not tracked) ====================
        Map(s => s, d => d.Id, _ => Guid.NewGuid().ToString(), trackQuality: false);
        Map(s => s, d => d.CreatedAt, _ => DateTime.UtcNow, trackQuality: false);
        Map(s => s, d => d.UpdatedAt, _ => DateTime.UtcNow, trackQuality: false);
        Map(s => s, d => d.AdditionalData, _ => null, trackQuality: false);
        Map(s => s, d => d.Description, _ => null, trackQuality: false);
    }

    // ==================== BUILDER METHODS ====================

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

    private EventGeographicInfo? BuildGeographicInfo(SG.SeatGeekVenue? venue)
    {
        if (venue == null)
            return null;

        GeoCoordinates? coordinates = null;
        if (venue.Location?.Lat.HasValue == true && venue.Location?.Lon.HasValue == true)
        {
            coordinates = new GeoCoordinates
            {
                Latitude = venue.Location.Lat.Value,
                Longitude = venue.Location.Lon.Value
            };
        }

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

    private EventVenueInfo? BuildVenueInfo(SG.SeatGeekVenue? venue)
    {
        if (venue == null)
            return null;

        GeoCoordinates? coordinates = null;
        if (venue.Location?.Lat.HasValue == true && venue.Location?.Lon.HasValue == true)
        {
            coordinates = new GeoCoordinates
            {
                Latitude = venue.Location.Lat.Value,
                Longitude = venue.Location.Lon.Value
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

    private EventStatusInfo BuildStatusInfo()
    {
        return new EventStatusInfo
        {
            IsActive = true,
            Status = EventStatus.Active
        };
    }

    private EventPricingInfo? BuildPricingInfo(SG.SeatGeekStats? stats)
    {
        if (stats == null)
            return null;

        if (!stats.LowestPrice.HasValue && !stats.HighestPrice.HasValue)
            return null;

        return new EventPricingInfo
        {
            MinPrice = stats.LowestPrice,
            MaxPrice = stats.HighestPrice,
            Currency = "USD"
        };
    }

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
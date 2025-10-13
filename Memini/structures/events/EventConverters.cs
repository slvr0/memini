
using Memini.entities;
using MeminiEventAPI.api_datamodels;

namespace Memini.structures.events;

public static class EventConverters
{
    public static CoreNode ConvertToCoreNode(this NormalizedEvent normalizedEvent)
    {
        return new CoreNode()
        {
            ExternalId = normalizedEvent.ExternalId,
            Guid = normalizedEvent.ExternalId, //generate one if null
            Source = normalizedEvent.Source.ToString() ?? "Unknown",       
            Label = normalizedEvent.Name,
            Description = "",
            StartDate = normalizedEvent.TemporalInfo?.StartDate ?? null,
            EndDate = normalizedEvent.TemporalInfo?.EndDate ?? null,
            Type = (int)CoreNodeTypes.Event, 
            CountryCode = normalizedEvent.GeographicInfo?.CountryCode ?? null,
            CityCode = normalizedEvent.GeographicInfo?.City ?? null // well this conversion isnt exactly right
        };
    }

    public static SpatialInfo ConvertToSpatialInfo(this NormalizedEvent normalizedEvent)
    {
        return new SpatialInfo()
        {
            CoreNodeKey = 0, // its not connected yet
            Country = normalizedEvent.GeographicInfo?.Country ?? null,
            City = normalizedEvent.GeographicInfo?.City ?? null,
            Address = normalizedEvent.GeographicInfo?.Address ?? null,
            State = normalizedEvent.GeographicInfo?.State ?? null,
            StateCode = normalizedEvent.GeographicInfo?.StateCode ?? null,
            PostalCode = normalizedEvent.GeographicInfo?.PostalCode ?? null,
            Latitude = normalizedEvent.GeographicInfo?.Coordinates?.Latitude.ToString() ?? null,
            Longitude = normalizedEvent.GeographicInfo?.Coordinates?.Longitude.ToString() ?? null,
            Timezone = normalizedEvent.TemporalInfo?.Timezone ?? null,
            Duration = normalizedEvent.TemporalInfo?.Duration.ToString() ?? null,
            VenueName = normalizedEvent.VenueInfo?.Name ?? null,
            VenueId = normalizedEvent.VenueInfo?.VenueId ?? null,
            VenueType = normalizedEvent.VenueInfo?.Type ?? null,
            VenueUrl = normalizedEvent.VenueInfo?.Url ?? null,
            VenueCapacity = normalizedEvent.VenueInfo?.Capacity ?? null,
            Recurring = normalizedEvent.TemporalInfo?.Recurrence?.IsRecurring ?? null,
            RecurrenceFrequency = normalizedEvent.TemporalInfo?.Recurrence?.Frequency ?? null,
        };
    }

    public static ContentInfo ConvertToContentInfo(this NormalizedEvent normalizedEvent)
    {
        var images = new List<ContentImage>();
        if (normalizedEvent.Media != null)
        {
            foreach (var mediaContent in normalizedEvent.Media)
            {
                images.Add(new ContentImage()
                {
                    ParentContentId = 0, // need to set later.
                    Url = mediaContent?.Url ?? "",
                    Type = mediaContent?.Type.ToString(),
                    Width = mediaContent?.Width ?? 0,
                    Height = mediaContent?.Height ?? 0,
                    IsPrimary = mediaContent?.IsPrimary ?? false,
                    Attribution = mediaContent?.Attribution ?? null
                });
            }
        }

        return new ContentInfo()
        {
            CoreNodeKey = 0,
            ContentInformation = "",
            ContentSubtext = "",
            Category = normalizedEvent.CategorizationInfo?.PrimaryCategory ?? null,
            Tags = normalizedEvent.CategorizationInfo?.Tags?.ToString() ?? null,
            Genre = normalizedEvent.CategorizationInfo?.Genre?.ToString() ?? null,
            SubGenre = normalizedEvent.CategorizationInfo?.SubGenre?.ToString() ?? null,
            GlobalRank = normalizedEvent.CategorizationInfo?.Rank?.GlobalRank ?? null,
            LocalRank = normalizedEvent.CategorizationInfo?.Rank?.LocalRank ?? null,
            Relevance = (float?)normalizedEvent.CategorizationInfo?.Rank?.RelevanceScore ?? null,
            PerformerName = normalizedEvent.Performers?.First().Name ?? null,
            PerformerType = normalizedEvent.Performers?.First().Type ?? null,
            PerformerGenre = normalizedEvent.Performers?.First()?.Genres?.ToString() ?? null,
            ContentImages = images
        };
    }

    public static CommercialStatusInfo ConvertToCommercialStatusInfo(this NormalizedEvent normalizedEvent)
    {
        return new CommercialStatusInfo()
        {
            CoreNodeKey = 0,
            Status = normalizedEvent?.StatusInfo?.Status.ToString() ?? null,
            StatusReason = normalizedEvent?.StatusInfo?.StatusReason ?? null,
            Availability = normalizedEvent?.StatusInfo?.TicketAvailability.ToString() ?? null,
            SoldOut = normalizedEvent?.StatusInfo?.IsSoldOut ?? null,
            Cancelled = normalizedEvent?.StatusInfo?.IsCancelled ?? null,
            Postponed = normalizedEvent?.StatusInfo?.IsPostponed ?? null,
            Rescheduled = normalizedEvent?.StatusInfo?.IsRescheduled ?? null,
            Active = normalizedEvent?.StatusInfo?.IsActive ?? null,
            MinPrice = normalizedEvent?.PricingInfo?.MinPrice.ToString() ?? null,
            MaxPrice = normalizedEvent?.PricingInfo?.MaxPrice.ToString() ?? null,
            Currency = normalizedEvent?.PricingInfo?.Currency.ToString() ?? null,
            Free = normalizedEvent?.PricingInfo?.IsFree ?? null,
        };
    }
}

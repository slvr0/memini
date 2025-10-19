using Memini.entities;
using Memini.structures;
using MeminiEventAPI.api_datamodels;

namespace Memini.mapping.poi;

public static class PoiConverters

{
    public static CoreNode ConvertToCoreNode(this NormalizedPlace normalizedPlace)
    {
        return new CoreNode()
        {
            ExternalId = normalizedPlace.ExternalId,
            Guid = string.IsNullOrEmpty(normalizedPlace.ExternalId)
                ? Guid.NewGuid().ToString()
                : normalizedPlace.ExternalId, //generate one if null
            Source = "FourSquare", // we only use foursquare atm.
            Label = normalizedPlace.Name,
            Description = normalizedPlace.Description,
            StartDate = null,
            EndDate = null,
            Type = (int)CoreNodeTypes.PointOfInterest,
            Country = normalizedPlace.GeographicInfo?.Country ?? null,
            City = normalizedPlace.GeographicInfo?.City ?? null 
        };
    }
    public static PoiInfo ConvertToPoiInfo(this NormalizedPlace normalizedPlace)
    {
        return new PoiInfo
        {                     
            Address = normalizedPlace.GeographicInfo?.FormattedAddress
                      ?? normalizedPlace.GeographicInfo?.Address,
            PostalCode = normalizedPlace.GeographicInfo?.Postcode,
            Latitude = (float?)normalizedPlace.GeographicInfo?.Coordinates?.Latitude,
            Longitude = (float?)normalizedPlace.GeographicInfo?.Coordinates?.Longitude,
            Open = normalizedPlace.StatusInfo?.IsOpenNow,
            Closed = normalizedPlace.StatusInfo?.IsClosed,
            DateClosed = !string.IsNullOrEmpty(normalizedPlace.StatusInfo?.DateClosed)
                ? DateTime.TryParse(normalizedPlace.StatusInfo.DateClosed, out var date)
                    ? DateTime.SpecifyKind(date, DateTimeKind.Utc)
                    : (DateTime?)null
                : null,
            Verified = normalizedPlace.StatusInfo?.IsVerified,
            Free = normalizedPlace.PriceLevel == null || normalizedPlace.PriceLevel == 0,
            PriceLevel = normalizedPlace.PriceLevel,
            WebsiteUrl = normalizedPlace.Website,
            Popularity = (float?)normalizedPlace.Popularity,
            Rating = (float?)normalizedPlace.Rating,
            TotalRatings = normalizedPlace.TotalRatings,
            Category = normalizedPlace.CategorizationInfo?.PrimaryCategoryId,
            AllCategories = normalizedPlace.CategorizationInfo?.AllCategories != null
                ? string.Join(", ", normalizedPlace.CategorizationInfo.AllCategories)
                : null
        };
    }

    public static List<ContentMedium> ConvertToContentMedia(this NormalizedPlace normalizedPlace)
    {
        if (normalizedPlace.Media == null || !normalizedPlace.Media.Any())
            return new List<ContentMedium>();

        return normalizedPlace.Media.Select(media => new ContentMedium
        {
            // PoiInfoKey will be set after saving the PoiInfo
            Url = !string.IsNullOrEmpty(media.Url)
                ? media.Url
                : $"{media.Prefix}original{media.Suffix}", // Construct full URL from prefix/suffix
            Type = "image", // Foursquare typically returns images
            Width = media.Width,
            Height = media.Height,
            IsPrimary = media.IsPrimary,
            Attribution = "Foursquare" // Track the source
        }).ToList();
    }

}
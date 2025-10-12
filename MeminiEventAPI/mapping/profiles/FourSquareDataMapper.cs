using MeminiEventAPI.api_datamodels;
using FSQ = MeminiEventAPI.api_datamodels.foursquare;
using MeminiEventAPI.structures.foursquare;

namespace MeminiEventAPI.mapping.profiles;

/// <summary>
/// Foursquare to NormalizedPlace mapper using FluentQualityMapper
/// </summary>
public class FoursquareMapper : FluentQualityMapper<FSQ.FoursquarePlace, NormalizedPlace>
{
    

    public FoursquareMapper()
    {
        ConfigureMapping();
    }

    private void ConfigureMapping()
    {
        // Basic info
        Map(s => s.FsqId, d => d.ExternalId, id => id?.Trim(), trackQuality: true);
        Map(s => s.Name, d => d.Name, name => name?.Trim(), trackQuality: true);
        Map(s => s.Description, d => d.Description,
            desc => string.IsNullOrWhiteSpace(desc) ? null : desc.Trim(), trackQuality: true);
        Map(s => s.Website, d => d.Website,
            url => string.IsNullOrWhiteSpace(url) ? null : url.Trim(), trackQuality: true);

        // Complex mappings
        Map(s => s, d => d.GeographicInfo, place => BuildGeographicInfo(place), trackQuality: true);
        Map(s => s.Categories, d => d.CategorizationInfo,
            categories => BuildCategorizationInfo(categories), trackQuality: true);
        Map(s => s.Rating, d => d.Rating, trackQuality: true);
        Map(s => s.Popularity, d => d.Popularity, trackQuality: true);
        Map(s => s.Stats, d => d.TotalRatings, stats => stats?.TotalRatings, trackQuality: true);
        Map(s => s.Price, d => d.PriceLevel, trackQuality: true);
        Map(s => s, d => d.StatusInfo, place => BuildStatusInfo(place), trackQuality: true);
        Map(s => s.Photos, d => d.Media, photos => BuildMedia(photos), trackQuality: true);
    }

    private PlaceGeographicInfo? BuildGeographicInfo(FSQ.FoursquarePlace place)
    {
        var location = place.Location;
        var geocodes = place.Geocodes?.Main;

        if (location == null && geocodes == null) return null;

        GeoCoordinates? coordinates = null;
        if (geocodes != null)
        {
            coordinates = new GeoCoordinates
            {
                Latitude = geocodes.Latitude,
                Longitude = geocodes.Longitude
            };
        }

        var hasData = !string.IsNullOrWhiteSpace(location?.Country) ||
                     !string.IsNullOrWhiteSpace(location?.Locality) ||
                     coordinates != null;

        if (!hasData) return null;

        return new PlaceGeographicInfo
        {
            Address = string.IsNullOrWhiteSpace(location?.Address) ? null : location.Address,
            City = string.IsNullOrWhiteSpace(location?.Locality) ? null : location.Locality,
            Region = string.IsNullOrWhiteSpace(location?.Region) ? null : location.Region,
            Country = string.IsNullOrWhiteSpace(location?.Country) ? null : location.Country,
            Postcode = string.IsNullOrWhiteSpace(location?.Postcode) ? null : location.Postcode,
            FormattedAddress = string.IsNullOrWhiteSpace(location?.FormattedAddress) ? null : location.FormattedAddress,
            Coordinates = coordinates
        };
    }

    private PlaceCategorizationInfo? BuildCategorizationInfo(List<FSQ.FoursquareCategory>? categories)
    {
        if (categories == null || !categories.Any()) return null;

        var primaryCategory = categories.First();
        var allCategoryNames = categories.Select(c => c.Name).Where(n => !string.IsNullOrWhiteSpace(n)).ToList();
        var allCategoryIds = categories.Select(c => c.Id).ToList();

        var categoryFlags = PlaceCategory.None;

        if (allCategoryIds.Contains((int)FoursquareCategory.Restaurant))
            categoryFlags |= PlaceCategory.Restaurant;

        if (allCategoryIds.Contains((int)FoursquareCategory.Bar))
            categoryFlags |= PlaceCategory.Bar;

        if (allCategoryIds.Contains((int)FoursquareCategory.CoffeeShop))
            categoryFlags |= PlaceCategory.CoffeeShop;

        if (allCategoryIds.Contains((int)FoursquareCategory.Hotel))
            categoryFlags |= PlaceCategory.Hotel;

        if (allCategoryIds.Contains((int)FoursquareCategory.Landmark))
            categoryFlags |= PlaceCategory.Landmark;

        if (allCategoryIds.Contains((int)FoursquareCategory.Entertainment))
            categoryFlags |= PlaceCategory.Entertainment;

        return new PlaceCategorizationInfo
        {
            PrimaryCategory = string.IsNullOrWhiteSpace(primaryCategory.Name) ? null : primaryCategory.Name,
            PrimaryCategoryId = primaryCategory.Id,
            AllCategories = allCategoryNames.Any() ? allCategoryNames : null,
            Categories = categoryFlags
        };
    }

    private PlaceStatusInfo? BuildStatusInfo(FSQ.FoursquarePlace place)
    {
        var hours = place.Hours;
        var closedBucket = place.ClosedBucket;
        var dateClosed = place.DateClosed;
        var verified = place.Verified;

        var isClosed = !string.IsNullOrWhiteSpace(closedBucket) || !string.IsNullOrWhiteSpace(dateClosed);

        return new PlaceStatusInfo
        {
            IsOpenNow = hours?.OpenNow,
            IsClosed = isClosed,
            DateClosed = string.IsNullOrWhiteSpace(dateClosed) ? null : dateClosed,
            HoursDisplay = string.IsNullOrWhiteSpace(hours?.Display) ? null : hours.Display,
            IsVerified = verified
        };
    }

    private List<PlaceMedia>? BuildMedia(List<FSQ.FoursquarePhoto>? photos)
    {
        if (photos == null || !photos.Any()) return null;

        var media = photos
            .Where(photo => !string.IsNullOrWhiteSpace(photo.Prefix) && !string.IsNullOrWhiteSpace(photo.Suffix))
            .Select((photo, index) => new PlaceMedia
            {
                Url = $"{photo.Prefix}original{photo.Suffix}",
                Prefix = photo.Prefix,
                Suffix = photo.Suffix,
                Width = photo.Width,
                Height = photo.Height,
                IsPrimary = index == 0
            })
            .ToList();

        return media.Any() ? media : null;
    }
}



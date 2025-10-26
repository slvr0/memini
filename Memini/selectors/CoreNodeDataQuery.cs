using Memini.entities;
using Memini.structures;
using Microsoft.EntityFrameworkCore;

namespace Memini.selectors;

public static class CoreNodeQueryExtensions
{
    // Filtering methods - all return IQueryable
    public static IQueryable<CoreNode> ByType(this IQueryable<CoreNode> query, CoreNodeTypes coreNodeType)
    {
        return query.Where(cn => cn.Type == (int)coreNodeType);
    }

    public static IQueryable<CoreNode> ByLabel(this IQueryable<CoreNode> query, string searchText)
    {
        if (string.IsNullOrWhiteSpace(searchText))
            return query;

        return query.Where(cn => cn.Label != null &&
                                EF.Functions.ILike(cn.Label, $"%{searchText}%"));
    }

    public static IQueryable<CoreNode> ByPerformerSearch(this IQueryable<CoreNode> query, string searchText)
    {
        if (string.IsNullOrWhiteSpace(searchText))
            return query;

        return query.Where(cn => cn.ContentInfo != null &&
                                cn.ContentInfo.PerformerName != null &&
                                EF.Functions.ILike(cn.ContentInfo.PerformerName, $"%{searchText}%"));
    }

    public static IQueryable<CoreNode> ByPerformer(this IQueryable<CoreNode> query, string searchText)
    {
        if (string.IsNullOrWhiteSpace(searchText))
            return query;

        return query.Where(cn => cn.Label != null && EF.Functions.Like(cn.Label, $"%{searchText}%"));
    }

    public static IQueryable<CoreNode> ByCountry(this IQueryable<CoreNode> query, string countryCode)
    {
        return query.Where(cn => cn.CountryCode == countryCode || cn.Country == countryCode);
    }

    public static IQueryable<CoreNode> ByCountryOrCode(this IQueryable<CoreNode> query, string country, string? countryCode)
    {
        if (string.IsNullOrWhiteSpace(country) && string.IsNullOrWhiteSpace(countryCode))
            return query;

        // Try both country name and country code
        return query.Where(cn =>
            (!string.IsNullOrWhiteSpace(country) && cn.Country == country) ||
            (!string.IsNullOrWhiteSpace(countryCode) && cn.Country == countryCode)
        );
    }

    public static IQueryable<CoreNode> ByCity(this IQueryable<CoreNode> query, string city)
    {
        return query.Where(cn => cn.City == city);
    }

    public static IQueryable<CoreNode> ByStartDate(this IQueryable<CoreNode> query, DateTime start)
    {
        return query.Where(cn => cn.StartDate >= start);
    }

    public static IQueryable<CoreNode> ByEndDate(this IQueryable<CoreNode> query, DateTime end)
    {
        return query.Where(cn => cn.StartDate <= end);
    }

    public static IQueryable<CoreNode> ByDateRange(this IQueryable<CoreNode> query, DateTime start, DateTime end)
    {
        return query.Where(cn => cn.StartDate >= start && cn.StartDate <= end);
    }

    public static IQueryable<CoreNode> UpcomingFrom(this IQueryable<CoreNode> query, DateTime? from = null)
    {
        var startDate = from ?? DateTime.UtcNow;
        return query.Where(cn => cn.StartDate >= startDate);
    }

    public static IQueryable<CoreNode> ByExternalId(this IQueryable<CoreNode> query, string externalId)
    {
        return query.Where(cn => cn.ExternalId == externalId);
    }

    public static IQueryable<CoreNode> ByCategory(this IQueryable<CoreNode> query, string category)
    {
        return query.Where(cn => cn.ContentInfo != null && cn.ContentInfo.Category == category);
    }

    public static IQueryable<CoreNode> ByCategory(this IQueryable<CoreNode> query, List<string> categories)
    {
        if (categories == null || !categories.Any() || categories.Contains("Any"))
            return query;

        return query.Where(cn => cn.ContentInfo != null && categories.Contains(cn.ContentInfo.Category));
    }


    public static IQueryable<CoreNode> ByPoiCategories(this IQueryable<CoreNode> query, int categoriesEnumValue)
    {
        // If no categories selected or "Any" (0), return all
        if (categoriesEnumValue == 0)
            return query;

        // Check if POI categories match any of the selected flags using bitwise AND
        return query.Where(cn => cn.PoiInfo != null &&
                                (cn.PoiInfo.Category & categoriesEnumValue) != 0);
    }

    public static IQueryable<CoreNode> ByTicketmasterFilter(this IQueryable<CoreNode> query, bool showTicketmaster)
    {
        if (showTicketmaster)
            return query;

        return query.Where(cn => cn.Source != "Ticketmaster");
    }
    public static IQueryable<CoreNode> ByAvailable(this IQueryable<CoreNode> query, bool availableTicketsOnly)
    {
        if (!availableTicketsOnly)
            return query;

        return query.Where(cn => cn.CommercialStatusInfo != null &&
                                cn.CommercialStatusInfo.Availability == "Available");
    }

    public static IQueryable<CoreNode> ByPredictHqFilter(this IQueryable<CoreNode> query, bool showPredictHq)
    {
        if (showPredictHq)
            return query;

        return query.Where(cn => cn.Source != "PredictHQ");
    }

    // Selective includes
    public static IQueryable<CoreNode> WithContentInfo(this IQueryable<CoreNode> query)
    {
        return query.Include(cn => cn.ContentInfo);
    }

    public static IQueryable<CoreNode> WithContentInfoAndMedia(this IQueryable<CoreNode> query)
    {
        return query
            .Include(cn => cn.ContentInfo)
                .ThenInclude(ci => ci.ContentMedia);
    }

    public static IQueryable<CoreNode> WithSpatialInfo(this IQueryable<CoreNode> query)
    {
        return query.Include(cn => cn.SpatialInfo);
    }

    public static IQueryable<CoreNode> WithCommercialStatus(this IQueryable<CoreNode> query)
    {
        return query.Include(cn => cn.CommercialStatusInfo);
    }

    public static IQueryable<CoreNode> WithFullEventInfo(this IQueryable<CoreNode> query)
    {
        return query
            .Include(cn => cn.ContentInfo)
                .ThenInclude(ci => ci.ContentMedia)
            .Include(cn => cn.SpatialInfo)
            .Include(cn => cn.CommercialStatusInfo);
    }

    public static IQueryable<CoreNode> WithFullPointOfInterest(this IQueryable<CoreNode> query)
    {
        return query
            .Include(cn => cn.PoiInfo)
                .ThenInclude(ci => ci.ContentMedia);           
    }

    public static IQueryable<CoreNode> WithFullNews(this IQueryable<CoreNode> query)
    {
        return query
            .Include(cn => cn.NewsInfos);       
    }

    // Sorting
    public static IQueryable<CoreNode> OrderByDate(this IQueryable<CoreNode> query)
    {
        return query.OrderBy(cn => cn.StartDate);
    }

    public static IQueryable<CoreNode> OrderByDateDescending(this IQueryable<CoreNode> query)
    {
        return query.OrderByDescending(cn => cn.StartDate);
    }

    public static IQueryable<CoreNode> ByMinRating(this IQueryable<CoreNode> query, int minRating)
    {
        if (minRating <= 0)
            return query;

        return query.Where(cn => cn.PoiInfo != null && cn.PoiInfo.Rating >= minRating);
    }

    public static IQueryable<CoreNode> ByMinTotalRatings(this IQueryable<CoreNode> query, int minTotalRatings)
    {
        if (minTotalRatings <= 0)
            return query;

        return query.Where(cn => cn.PoiInfo != null && cn.PoiInfo.TotalRatings >= minTotalRatings);
    }
}
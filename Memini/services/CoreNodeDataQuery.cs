using Memini.entities;
using Memini.structures;
using Microsoft.EntityFrameworkCore;

namespace Memini.services;

public static class CoreNodeQueryExtensions
{
    // Filtering methods - all return IQueryable
    public static IQueryable<CoreNode> ByType(this IQueryable<CoreNode> query, CoreNodeTypes coreNodeType)
    {
        return query.Where(cn => cn.Type == (int)coreNodeType);
    }

    public static IQueryable<CoreNode> ByCountry(this IQueryable<CoreNode> query, string countryCode)
    {
        return query.Where(cn => cn.CountryCode == countryCode);
    }

    public static IQueryable<CoreNode> ByCity(this IQueryable<CoreNode> query, string city)
    {
        return query.Where(cn => cn.CityCode == city);
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

    // Selective includes
    public static IQueryable<CoreNode> WithContentInfo(this IQueryable<CoreNode> query)
    {
        return query.Include(cn => cn.ContentInfo);
    }

    public static IQueryable<CoreNode> WithImages(this IQueryable<CoreNode> query)
    {
        return query
            .Include(cn => cn.ContentInfo)
                .ThenInclude(ci => ci.ContentImages);
    }

    public static IQueryable<CoreNode> WithSpatialInfo(this IQueryable<CoreNode> query)
    {
        return query.Include(cn => cn.SpatialInfo);
    }

    public static IQueryable<CoreNode> WithCommercialStatus(this IQueryable<CoreNode> query)
    {
        return query.Include(cn => cn.CommercialStatusInfo);
    }

    public static IQueryable<CoreNode> WithAllDetails(this IQueryable<CoreNode> query)
    {
        return query
            .Include(cn => cn.ContentInfo)
                .ThenInclude(ci => ci.ContentImages)
            .Include(cn => cn.SpatialInfo)
            .Include(cn => cn.CommercialStatusInfo);
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
}
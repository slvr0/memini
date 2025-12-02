using MeminiEventAPI.api_datamodels;
using Memini.mapping.events;
using Memini.validators;
using Memini.entities;
using Memini.services;
using Memini.dto.events;
using Memini.dto.poi;
using Memini.dto;


using MeminiEventAPI.api_datamodels.ticketmaster;
using Microsoft.EntityFrameworkCore;
using MeminiEventAPI.structures;
using Memini.structures;
using Memini.mapping.poi;
using Memini.mapping.weather;
using Memini.mapping.news;
using MeminiEventAPI.structures.foursquare;

using Memini.selectors;
using MeminiEventAPI.services;
using Memini.dto.general;

namespace Memini.managers;

public class EventManager
{
    public CoreNode CoreNodeDefault(int type, string source)
    {
        return new CoreNode()
        {
            Type = type,
            Source = source,
            Guid = Guid.NewGuid().ToString()
        };
    }

    public CoreNode CreateCoreNodeFromEvent(NormalizedEvent normalizedEvent, string source)
    {
        var coreNode = normalizedEvent.ConvertToCoreNode();
        var spatialInfo = normalizedEvent.ConvertToSpatialInfo();
        var contentInfo = normalizedEvent.ConvertToContentInfo();
        var commercialStatusInfo = normalizedEvent.ConvertToCommercialStatusInfo();

        coreNode.SpatialInfo = spatialInfo;
        coreNode.ContentInfo = contentInfo;
        coreNode.CommercialStatusInfo = commercialStatusInfo;

        coreNode.Source = source;
        return coreNode;
    }

    public CoreNode CoreNodeFromPointOfInterest(NormalizedPlace normalizedPlace, string source)
    {
        var coreNode = normalizedPlace.ConvertToCoreNode();
        coreNode.PoiInfo = normalizedPlace.ConvertToPoiInfo();
        coreNode.Source = source;
        return coreNode;
    } 

    public async Task DeleteOldCoreNodes(int olderThanMonths, MeminiDbContext context)
    {
        try
        {
            var cutoffDate = DateTime.UtcNow.AddMonths(-olderThanMonths);

            var results = await context.CoreNodes
                .Where(cn => cn.StartDate < cutoffDate && cn.Type != (int)CoreNodeTypes.PointOfInterest)
                .ToListAsync();

            context.CoreNodes.RemoveRange(results);
            await context.SaveChangesAsync();

            Console.WriteLine($"Deleted {results.Count} old core nodes");
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public async Task StoreUniqueEvents(EventsApiResult eventsApiResult, string source, MeminiDbContext context)
    {
        try
        {
            var uniqueEvents = eventsApiResult.Events?.ReduceCompare(
                e => $"{e.Result?.Name ?? ""}|{e.Result?.TemporalInfo.StartDate:yyyy-MM-dd}", // Fixed: added closing }
                e => e.Result?.DataQuality ?? 0,
                similarityThreshold: 98,
                algorithm: SimilarityAlgorithm.WeightedRatio
            ).Select(mappingEvent => mappingEvent.Result);

            if (uniqueEvents == null)
                return;

            var coreNodes = uniqueEvents
                .Select(normalizedEvent => CreateCoreNodeFromEvent(normalizedEvent, source))
                .ToList();

            //unique check versus datatable entries
            var uniqueCoreNodes = await context.CoreNodes.GetItemsToInsertMultiField(coreNodes,
                e => e.Label ?? string.Empty,
                e => e.StartDate,
                similarityThreshold: 98,
                dateDifferenceThresholdDays: 1
                );

            // Add all at once - EF Core will handle FK relationships
            await context.CoreNodes.AddRangeAsync(uniqueCoreNodes);

            // Save changes - this will set all the foreign keys automatically
            await context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    //this manager should either handle core node insertion or we should split this up
    public async Task StoreUniquePointOfInterest(PlacesApiResult placeApiResult, string source, MeminiDbContext context)
    {
        try
        {
            //use a reducer to extract unique events
            var uniquePointOfInterest = placeApiResult.Places?.ReduceCompare(
               e => $"{e.Result?.Name ?? ""}|{e.Result?.GeographicInfo?.City}",             // Field to compare (event name)
               e => e.Result?.DataQuality ?? 0,       // Quality metric
               similarityThreshold: 95,               // similarity threshold
               algorithm: SimilarityAlgorithm.WeightedRatio
            ).Select(mappingEvent => mappingEvent.Result); // select pure results, mapping wrapping no longer required

            if (uniquePointOfInterest == null || uniquePointOfInterest.Count() == 0)
                return;

            var coreNodes = uniquePointOfInterest
                .Select(pointOfInterest => CoreNodeFromPointOfInterest(pointOfInterest, source))
                .ToList();

            //unique check versus datatable entries
            var uniqueCoreNodes = await context.CoreNodes.GetItemsToInsertMultiField(coreNodes,
                e => $"{e.Label ?? ""}|{e.City ?? ""}",
                e => e.StartDate,
                similarityThreshold: 95,
                dateDifferenceThresholdDays: 1
                );
           
            await context.CoreNodes.AddRangeAsync(uniqueCoreNodes);

            // Save changes - this will set all the foreign keys automatically
            await context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    public async Task StoreLocalNews(NewsApiResult newsApiResult, string source, MeminiDbContext context)
    {
        try
        {
            List<NormalizedNews> newsResult = newsApiResult?.News?.Select(news => news.Result).ToList() ?? [];
            if (newsResult.Count == 0)
                return;

            var newsByLocale = newsResult.GroupBy(result => result.Locale);
            foreach(var localNews in newsByLocale) //create unique core nodes based on location of news.
            {
                string localeCountryGroup = localNews?.Key ?? "";

                var newsCoreNode = CoreNodeDefault((int)CoreNodeTypes.News, source);
                newsCoreNode.CountryCode = localeCountryGroup;           

                var convertedNews = localNews?.Select(news => news.ConvertToNewsInfo()).ToList() ?? new List<NewsInfo>();

                var uniqueNewsInfos = await context.NewsInfos.GetItemsToInsertMultiField(
                 convertedNews,                 
                 e => e.Title ?? string.Empty,           // Compare news titles
                 e => e.PublishedDate,                   // Compare published dates
                 similarityThreshold: 90,                // 90% title similarity
                 dateDifferenceThresholdDays: 1          // Within 1 day
                );

                newsCoreNode.NewsInfos = uniqueNewsInfos.ToList();

                if (newsCoreNode.NewsInfos.Any())                
                    await context.CoreNodes.AddAsync(newsCoreNode);                
            }
            // Save changes - this will set all the foreign keys automatically
            await context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    public async Task StoreWeatherInformation(WeatherApiResult weatherApiResult, string source, MeminiDbContext context)
    {
        try
        {
            List<NormalizedWeather> normalizedWeather = weatherApiResult?.Weathers?.Select(news => news.Result).ToList() ?? [];
            if (normalizedWeather.Count == 0)
                return;

            var weatherNodes = normalizedWeather.Select(weather => weather.ConvertToWeatherCoreNode());

            await context.CoreNodes.AddRangeAsync(weatherNodes);

            // Save changes - this will set all the foreign keys automatically
            await context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    public async Task<DtoCategoricalEnumResponse<FoursquareCategory>> GetPointOfInterestMainCategories()
    {
        var categories = new DtoCategoricalEnumResponse<FoursquareCategory>();

        foreach (FoursquareCategory category in Enum.GetValues(typeof(FoursquareCategory)))
        {
            categories.categoricalEnums.Add(new DtoCategoricalEnum<FoursquareCategory>
            {
                EnumValue = (int)category,
                Description = FoursquareCategoryIds.GetDisplayName(category)
            });
        }
        return await Task.FromResult(categories);
    }

    public async Task<DtoPaginatedResponse<List<CoreNode>>> GetEventsFromSearchFilter(DtoEventSearchFilter searchFilter, MeminiDbContext context)
    {
        var cityInSwedish = CityTranslator.ToSwedish(searchFilter.City);
        var today = DateTime.UtcNow;
        var end = today.AddDays(searchFilter.EventTimespan);

        // Build the query without executing it
        var query = context.CoreNodes
            .ByCountry(searchFilter.Country)
            .ByDateRange(today, end)
            .ByCity(cityInSwedish)
            .ByCategory(searchFilter.EventCategories)
            .ByLabel(searchFilter.EventFreeSearch)
            .ByTicketmasterFilter(searchFilter.EventSwitchShowTicketmaster)
            .ByPredictHqFilter(searchFilter.EventSwitchShowPredictHq)
            .WithContentInfoAndMedia()
            .ByPerformer(searchFilter.EventCreatorSearch)
            .WithCommercialStatus()
            .ByAvailable(searchFilter.EventSwitchAvailableTickets)
            .WithSpatialInfo();

        // Get total count before pagination
        var totalItems = await query.CountAsync();

        // Calculate total pages
        var totalPages = (int)Math.Ceiling((double)totalItems / searchFilter.Pagination.PageSize);

        // Apply pagination
        var results = await query
            .Skip((searchFilter.Pagination.CurrentPage - 1) * searchFilter.Pagination.PageSize)
            .Take(searchFilter.Pagination.PageSize)
            .ToListAsync();

        return new DtoPaginatedResponse<List<CoreNode>>
        {
            Data = results,
            TotalItems = totalItems,
            TotalPages = totalPages
        };
    }

    public async Task<DtoPaginatedResponse<List<CoreNode>>> GetPointOfInterestFromSearchFilter(DtoPointOfInterestSearchFilter searchFilter, MeminiDbContext context)
    {
        var cityInSwedish = CityTranslator.ToSwedish(searchFilter.City);
        var countryInCode = CountryCodeTranslator.ToCountryCode(searchFilter.Country);

        // Build the query without executing it
        var query = context.CoreNodes
            .ByType(CoreNodeTypes.PointOfInterest)
            .ByCountryOrCode(searchFilter.Country, countryInCode)
            .ByCity(cityInSwedish)
            .ByLabel(searchFilter.PlacesFreeSearch)
            .WithFullPointOfInterest()
            .ByPoiCategories(searchFilter.PlacesCategoriesEnumValue)
            .ByMinRating(searchFilter.MinRating)
            .ByMinTotalRatings(searchFilter.TotalRatings);

        // Get total count before pagination
        var totalItems = await query.CountAsync();

        // Calculate total pages
        var totalPages = (int)Math.Ceiling((double)totalItems / searchFilter.Pagination.PageSize);

        // Apply pagination
        var results = await query
            .Skip((searchFilter.Pagination.CurrentPage - 1) * searchFilter.Pagination.PageSize)
            .Take(searchFilter.Pagination.PageSize)
            .ToListAsync();

        return new DtoPaginatedResponse<List<CoreNode>>
        {
            Data = results,
            TotalItems = totalItems,
            TotalPages = totalPages
        };
    }
}





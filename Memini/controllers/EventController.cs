using Memini.entities;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Memini.dto;
using Memini.managers;
using Memini.dto.events;
using Microsoft.AspNetCore.Authorization;

using MeminiEventAPI.adapters;
using MeminiEventAPI.structures;
using MeminiEventAPI.handlers;

using MeminiEventAPI.testing.configs.foursquare;
using MeminiEventAPI.testing.configs.thenews;
using MeminiEventAPI.testing.configs.weather;
using MeminiEventAPI.testing.configs.ticketmaster;
using MeminiEventAPI.structures.foursquare;
using MeminiEventAPI.testing.configs.predicthq;
using Memini.dto.general;

using Memini.validators;
using Memini.selectors;
using Microsoft.EntityFrameworkCore;
using Memini.dto.poi;
namespace Memini.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]

public class EventController : ControllerBase
{
    private readonly ApiAdapterHandler _apiAdapterHandler;
    private readonly MeminiDbContext _context;

    public EventController(ApiAdapterHandler apiAdapterHandler, MeminiDbContext context)
    {
        _apiAdapterHandler = apiAdapterHandler;
        _context = context;
    }


    [HttpPost]
    [Route("CleanupOldApiData")]
    public async Task<IActionResult> CleanupOldApiData()
    {
        int olderThen_WEEK = 1; //week
        try
        {
            await new EventManager().DeleteOldCoreNodes(0, _context);
            return DtoResponse<object>.Ok("Cleaned up old data").ToOkResult();
        }
        catch (Exception ex)
        {
            return DtoResponse<object>.Fail($"Failed to clean up old data., {ex.Message}").ToBadRequestResult();
        }
    }

    [HttpPost]
    [Route("FetchEventApiData")]
    public async Task<IActionResult> FetchEventApiData()
    {
        try
        {
            var weatherconfig       = OpenMeteoTestConfig.WeatherTestConfig();
            var ticketmasterconfig  = new TicketmasterTestConfig().SimpleTestConfig();
            var foursquareconfig    = new FourSquareTesting().CreateTestConfigs();
            var thenewsconfig       = new TheNewsTesting().ComprehensiveTestConfig();
            var predicthqconfig     = new PredictHqTestConfig().CreateTestConfigs();
            // Merge all dictionaries into one
            var allConfigs = new Dictionary<string, ICollection<IApiRequest>>();

            foreach (var dict in new[] { ticketmasterconfig, weatherconfig,  foursquareconfig, thenewsconfig, predicthqconfig })
            {
                foreach (var kvp in dict)
                {
                    allConfigs[kvp.Key] = kvp.Value;
                }
            }

            // Now fetch with the merged dictionary
            var response = await _apiAdapterHandler.FetchDataFromApis(allConfigs);

            if (response.ApiResults.TryGetValue("Ticketmaster", out var resultTM)
            && resultTM is EventsApiResult eventsApiResponse)
            {
                EventManager eventManager = new EventManager();
                await eventManager.StoreUniqueEvents(eventsApiResponse, eventsApiResponse.AdapterId, _context);
            }

            if (response.ApiResults.TryGetValue("PredictHQ", out var resultPHQ)
                && resultTM is EventsApiResult eventsApiResponsePHQ)
              {
                EventManager eventManager = new EventManager();
                await eventManager.StoreUniqueEvents(eventsApiResponsePHQ, eventsApiResponsePHQ.AdapterId, _context);
            }

            if (response.ApiResults.TryGetValue("FourSquare", out var resultFSQ)
                && resultFSQ is PlacesApiResult foursquarePlaceResponse)
            {
                EventManager eventManager = new EventManager();
                await eventManager.StoreUniquePointOfInterest(foursquarePlaceResponse, foursquarePlaceResponse.AdapterId, _context);
            }

            if (response.ApiResults.TryGetValue("TheNews", out var resultTN)
                && resultTN is NewsApiResult thenewsApiResult)
            {
                EventManager eventManager = new EventManager();
                await eventManager.StoreLocalNews(thenewsApiResult, thenewsApiResult.AdapterId, _context);
            }

            if (response.ApiResults.TryGetValue("OpenMeteo", out var resultWN)
                && resultWN is WeatherApiResult openMateoWeatherResult)
            {
                EventManager eventManager = new EventManager();
                await eventManager.StoreWeatherInformation(openMateoWeatherResult, openMateoWeatherResult.AdapterId, _context);
            }

            //object res = await _apiAdapterHandler.FetchDataFromAllApis(mockedConfig);
            return DtoResponse<object>.Ok(response, "Fetched new events successfully").ToOkResult();
        }
        catch (Exception e)
        {
            return DtoResponse<object>.Fail($"Failed to fetch new events., {e.Message}").ToNotFoundResult();
        }
    }


    [HttpPost]
    [Authorize]
    [Route("GetEvents")]
    public  IActionResult GetEvents()
    {
        var res =  _context.CoreNodes.ByType(structures.CoreNodeTypes.Event).WithFullEventInfo();

        return DtoResponse<object>.Ok(res, "fetched events").ToOkResult();
    }

    [HttpPost]
    [Authorize]
    [Route("GetPointsOfInterest")]
    public IActionResult GetPointsOfInterest()
    {
        var res = _context.CoreNodes.ByType(structures.CoreNodeTypes.PointOfInterest).WithFullPointOfInterest();

        return DtoResponse<object>.Ok(res, "fetched points of interest").ToOkResult();
    }

    [HttpPost]
    [Authorize]
    [Route("GetNews")]
    public IActionResult GetNews([FromBody] string countryCode)
    {
        var today = DateTime.UtcNow.Date;

        var res = _context.CoreNodes.ByType(structures.CoreNodeTypes.News)
              
            .Include(cn => cn.NewsInfos);

        return DtoResponse<object>.Ok(res.ToList(), "fetched news").ToOkResult();
    }
    [HttpPost]
    [Authorize]
    [Route("GetWeatherInformationWeekForecast")]
    public IActionResult GetWeatherInformationWeekForecast()
    {
        var today = DateTime.UtcNow.Date;
        var endDate = today.AddDays(7);

        var res = _context.CoreNodes.ByType(structures.CoreNodeTypes.Weather).ByDateRange(today, endDate).ByCity("Stockholm").ByCountry("SE")
            .Include(cn => cn.WeatherInfo);

        return DtoResponse<object>.Ok(res.ToList(), "fetched news").ToOkResult();
    }

    [HttpGet]
    [Authorize]
    [Route("GetPointsOfInterestCategories")]
    public async Task<IActionResult> GetPointsOfInterestCategories()
    {
        var em = new EventManager();
        DtoCategoricalEnumResponse<FoursquareCategory> resp = await em.GetPointOfInterestMainCategories();
        return DtoResponse<DtoCategoricalEnumResponse<FoursquareCategory>>.Ok(resp, "fetched poi categories").ToOkResult();
    }

    [HttpPost]
    [Authorize]
    [Route("GetEventsFromFilter")]
    public async Task<IActionResult> GetEventsFromFilter(DtoEventSearchFilter searchFilter)
    {
        try
        {
            var em = new EventManager();
            var response = await em.GetEventsFromSearchFilter(searchFilter, _context);
       
            return DtoResponse<DtoPaginatedResponse<List<CoreNode>>>.Ok(response, "Successfully fetched events from filter").ToOkResult();
        }
        catch (Exception ex)
        {
            return DtoResponse<DtoPaginatedResponse<object>>.Fail(ex.Message).ToBadRequestResult();
        }      
    }

    [HttpPost]
    [Authorize]
    [Route("GetPointsOfInterestFromFilter")]
    public async Task<IActionResult> GetPointsOfInterestFromFilter(DtoPointOfInterestSearchFilter searchFilter)
    {
        try
        {
            var em = new EventManager();
            var response = await em.GetPointOfInterestFromSearchFilter(searchFilter, _context);

            return DtoResponse<DtoPaginatedResponse<List<CoreNode>>>.Ok(response, "Successfully fetched poi from filter").ToOkResult();
        }
        catch (Exception ex)
        {
            return DtoResponse<DtoPaginatedResponse<object>>.Fail(ex.Message).ToBadRequestResult();
        }
    }




}



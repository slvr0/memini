using Memini.entities;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Memini.dto;
using Memini.managers;

using Microsoft.AspNetCore.Authorization;

using MeminiEventAPI.adapters;
using MeminiEventAPI.structures;
using MeminiEventAPI.handlers;

using MeminiEventAPI.testing.configs.foursquare;
using MeminiEventAPI.testing.configs.thenews;
using MeminiEventAPI.testing.configs.weather;
using MeminiEventAPI.testing.configs.ticketmaster;

using Memini.validators;
using Memini.selectors;
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

            //var weatherconfig = OpenMeteoTestConfig.WeatherTestConfig();
            //var ticketmasterconfig = new TicketmasterTestConfig().SimpleTestConfig();
            //var foursquareconfig = new FourSquareTesting().CreateTestConfigs();
            var thenewsconfig = new TheNewsTesting().ComprehensiveTestConfig();

            // Merge all dictionaries into one
            var allConfigs = new Dictionary<string, ICollection<IApiRequest>>();

            foreach (var dict in new[] {/* weatherconfig, ticketmasterconfig, foursquareconfig, */thenewsconfig })
            {
                foreach (var kvp in dict)
                {
                    allConfigs[kvp.Key] = kvp.Value;
                }
            }

            // Now fetch with the merged dictionary
            var response = await _apiAdapterHandler.FetchDataFromApis(allConfigs);
            //yeah fix this code.
            if (response.ApiResults.TryGetValue("Ticketmaster", out var resultTM)
            && resultTM is EventsApiResult eventsApiResponse)
            {
                EventManager eventManager = new EventManager();
                await eventManager.StoreUniqueEvents(eventsApiResponse, eventsApiResponse.AdapterId, _context);
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
        var res =  _context.CoreNodes.ByType(structures.CoreNodeTypes.Event).WithAllDetails();

        return DtoResponse<object>.Ok(res, "fetched events").ToOkResult();
    }

}



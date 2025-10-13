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

namespace Memini.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]

public class EventController : ControllerBase
{
    private readonly ApiAdapterHandler _apiAdapterHandler;
    private readonly MeminiDbContext _context; 

    public EventController(ApiAdapterHandler apiAdapterHandler, MeminiDbContext context  )
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
        var mockedConfig = new MeminiEventApiRequest
        {
            City = "Stockholm",
            CountryCode = "SE",
            SearchSize = 20,
            StartDate = DateTime.Now,
            EndDate = DateTime.Now.AddMonths(1),

            /* PredictHq */
            Location = "40.7128,-74.0060", // Right now for interface to predictHQ NYC , need to convert the city coordinates to lat long...
            Radius = "10mi",
            PageSize = 20,

            /* SeatGeek, Uses City, CountryCode, Start / Enddates, Label and PageSize PageOffset. */
            SortBy = "score.desc",
        };
        try
        {
            //FourSquareTesting fsqTest = new FourSquareTesting();
            //TheNewsTesting tnTest = new TheNewsTesting();
            OpenMeteoTestConfig omTest = new OpenMeteoTestConfig();
            TicketmasterTestConfig tmTest = new TicketmasterTestConfig();

            //MeminiApiResponse response = await tnTest.SimpleTestConfig(_apiAdapterHandler);
            //MeminiApiResponse response = await tnTest.ComprehensiveTestConfig(_apiAdapterHandler);
            //MeminiApiResponse response = await omTest.WeatherTestConfig(_apiAdapterHandler);
            MeminiApiResponse response = await tmTest.SimpleTestConfig(_apiAdapterHandler);

            var ticketmasterResponse = response.ApiResults["Ticketmaster"];
            if(ticketmasterResponse is EventsApiResult eventsApiResponse)
            {

                //before fuzzy comp
                foreach (var _event in eventsApiResponse.Events)
                {
                    
                }

                //cleans the data for internal duplication
                var deduplicated = eventsApiResponse.Events.ReduceCompare(
                    e => e.Result.Name,                    // Field to compare (event name)
                    e => (double)e.Result.DataQuality,             // Quality metric
                    similarityThreshold: 90,        // 85% similarity threshold
                    algorithm: SimilarityAlgorithm.TokenSetRatio
                );
                Console.WriteLine("---------------------------------");


                foreach (var _event in deduplicated)
                {
                 
                    Console.WriteLine(_event.Result.Source);
                }

                EventManager eventManager = new EventManager();

                var deduplicatedEvents = deduplicated.Select(x => x.Result).ToList();

                await eventManager.StoreUniqueEvents(deduplicatedEvents, eventsApiResponse.AdapterId, _context);
                //await eventManager.DeleteOldCoreNodes(0, _context);                    
            }

            //object res = await _apiAdapterHandler.FetchDataFromAllApis(mockedConfig);
            return DtoResponse<object>.Ok(response, "Fetched new events successfully").ToOkResult();
}
        catch (Exception e)
        {
            return DtoResponse<object>.Fail($"Failed to fetch new events., {e.Message}").ToNotFoundResult();
        }        
    }
}



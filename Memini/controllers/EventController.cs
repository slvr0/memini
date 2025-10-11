using Memini.entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Memini.dto;
using Memini.managers;
using Memini.services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.Text.Json;
using Memini.event_datamodels.event_brite;

using MeminiEventAPI.adapters;
using MeminiEventAPI.structures;
using MeminiEventAPI.handlers;
using MeminiEventAPI.structures;
using MeminiEventAPI.testing.configs.foursquare;

namespace Memini.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]

public class EventController : ControllerBase
{
private readonly ApiAdapterHandler _apiAdapterHandler;

public EventController(ApiAdapterHandler apiAdapterHandler)
{
        _apiAdapterHandler = apiAdapterHandler;
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
            FourSquareTesting fsqTest = new FourSquareTesting();

            MeminiApiResponse response = await fsqTest.RunSimpleTest(_apiAdapterHandler);

            //object res = await _apiAdapterHandler.FetchDataFromAllApis(mockedConfig);
            return DtoResponse<object>.Ok(response, "Fetched new events successfully").ToOkResult();
        }
        catch (Exception e)
        {
            return DtoResponse<object>.Fail("Failed to fetch new events.").ToNotFoundResult();
        }        
    }
}



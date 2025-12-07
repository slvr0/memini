
using Memini.entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Memini.dto;
using Memini.managers;
using Memini.services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Memini.dto.activity;
using Memini.dto.core_node;
using Memini.structures;

namespace Memini.Controllers;


[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ActivityController : ControllerBase
{
    private IConfiguration _configuration;
    private AuthorisationService _authorisationService;
    private readonly MeminiDbContext _context;
    
    public ActivityController(IConfiguration configuration, AuthorisationService authorisationService, MeminiDbContext context)
    {
        _configuration = configuration;
        _authorisationService = authorisationService;
        _context = context;
    }

    [Authorize]
    [HttpGet]
    [Route("GetActivities")]
    public IActionResult GetActivities()
    {
        if (!int.TryParse(User.FindFirst("UserKey")?.Value, out int userKey))
            return Unauthorized("Invalid user token: missing or invalid user info.");

        try
        {
            var activities = _context.CoreNodes
                .Include(a => a.CommercialStatusInfo)
                .Include(a => a.ContentInfo)
                .Include(a => a.PoiInfo)
                .Include(a => a.SpatialInfo)
                .Include(a => a.WeatherInfo)
                .Where(a => a.Type == (int)CoreNodeTypes.Activity && 
                           (a.OwnerUserkey == userKey || a.OwnerUserkey == null))
                .OrderBy(a => a.StartDate)
                .ToList();

            var response = activities.Select(a => a.MapToDto()).ToList();
            return DtoResponse<List<DtoCoreNode>>.Ok(response, "Activities retrieved successfully").ToOkResult();
        }
        catch (Exception ex)
        {
            return DtoResponse<List<DtoCoreNode>>.Fail($"Error retrieving activities: {ex.Message}").ToNotFoundResult();
        }
    }

    [Authorize]
    [HttpGet]
    [Route("GetActivity")]
    public IActionResult GetActivity([FromQuery] int id)
    {
        if (!int.TryParse(User.FindFirst("UserKey")?.Value, out int userKey))
            return Unauthorized("Invalid user token: missing or invalid user info.");

        try
        {
            var activity = _context.CoreNodes
                .Include(a => a.CommercialStatusInfo)
                .Include(a => a.ContentInfo)
                .Include(a => a.PoiInfo)
                .Include(a => a.SpatialInfo)
                .Include(a => a.WeatherInfo)
                .FirstOrDefault(a => a.Key == id && 
                                    a.Type == (int)CoreNodeTypes.Activity &&
                                    (a.OwnerUserkey == userKey || a.OwnerUserkey == null));

            if (activity == null)
                return DtoResponse<DtoCoreNode>.Fail("Activity not found").ToNotFoundResult();

            var response = activity.MapToDto();
            return DtoResponse<DtoCoreNode>.Ok(response, "Activity retrieved successfully").ToOkResult();
        }
        catch (Exception ex)
        {
            return DtoResponse<DtoCoreNode>.Fail($"Error retrieving activity: {ex.Message}").ToNotFoundResult();
        }
    }

    [Authorize]
    [HttpPost]
    [Route("GetActivitiesForDate")]
    public IActionResult GetActivitiesForDate([FromBody] DtoDateRequest request)
    {
        if (!int.TryParse(User.FindFirst("UserKey")?.Value, out int userKey))
            return Unauthorized("Invalid user token: missing or invalid user info.");

        try
        {
            if (!DateTime.TryParse(request.Date, out DateTime date))
                return DtoResponse<List<DtoCoreNode>>.Fail("Invalid date format").ToNotFoundResult();

            var startOfDay = date.Date.ToUniversalTime();
            var endOfDay = startOfDay.AddDays(1);

            var activities = _context.CoreNodes
               .Where(c => c.Type == (int)CoreNodeTypes.Activity)
                .ToList();

            var response = activities.Select(a => a.MapToDto()).ToList();
            return DtoResponse<List<DtoCoreNode>>.Ok(response, $"Activities for {date:yyyy-MM-dd} retrieved successfully").ToOkResult();
        }
        catch (Exception ex)
        {
            return DtoResponse<List<DtoCoreNode>>.Fail($"Error retrieving activities: {ex.Message}").ToNotFoundResult();
        }
    }

    [Authorize]
    [HttpPost]
    [Route("GetActivitiesForDateRange")]
    public IActionResult GetActivitiesForDateRange([FromBody] DtoDateRangeRequest request)
    {
        if (!int.TryParse(User.FindFirst("UserKey")?.Value, out int userKey))
            return Unauthorized("Invalid user token: missing or invalid user info.");

        try
        {
            if (!DateTime.TryParse(request.StartDate, out DateTime startDate))
                return DtoResponse<List<DtoCoreNode>>.Fail("Invalid start date format").ToNotFoundResult();

            if (!DateTime.TryParse(request.EndDate, out DateTime endDate))
                return DtoResponse<List<DtoCoreNode>>.Fail("Invalid end date format").ToNotFoundResult();

            // Convert to UTC and set to start/end of day
            var startOfRange = startDate.Date.ToUniversalTime();
            var endOfRange = endDate.Date.AddDays(1).ToUniversalTime(); // End of the end date

            var activities = _context.CoreNodes
                .Include(a => a.CommercialStatusInfo)
                .Include(a => a.ContentInfo)
                .Include(a => a.PoiInfo)
                .Include(a => a.SpatialInfo)
                .Include(a => a.WeatherInfo)
                .Where(a => a.Type == (int)CoreNodeTypes.Activity &&
                           (a.OwnerUserkey == userKey || a.OwnerUserkey == null) &&
                           a.StartDate != null &&
                           a.StartDate >= startOfRange &&
                           a.StartDate < endOfRange)
                .OrderBy(a => a.StartDate)
                .ToList();

            var response = activities.Select(a => a.MapToDto()).ToList();
            return DtoResponse<List<DtoCoreNode>>.Ok(
                response,
                $"Activities from {startDate:yyyy-MM-dd} to {endDate:yyyy-MM-dd} retrieved successfully"
            ).ToOkResult();
        }
        catch (Exception ex)
        {
            return DtoResponse<List<DtoCoreNode>>.Fail($"Error retrieving activities: {ex.Message}").ToNotFoundResult();
        }
    }

    [Authorize]
    [HttpPost]
    [Route("AddActivity")]

    //this should really be a general node manager that handles saving, should have to re write this for an activity.
    public IActionResult AddActivity([FromBody] DtoActivityNode request)
    {
        if (!int.TryParse(User.FindFirst("UserKey")?.Value, out int userKey))
            return Unauthorized("Invalid user token: missing or invalid user info.");

        try
        {
            var activity = new CoreNode
            {
                OwnerUserkey = userKey,
                Source = request.Source,
                Guid = string.IsNullOrEmpty(request.Guid) ? System.Guid.NewGuid().ToString() : request.Guid,
                ExternalId = request.ExternalId,
                Label = request.Label,
                Description = request.Description,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                DateAdded = DateTime.UtcNow,
                Country = request.Country,
                CountryCode = request.CountryCode,
                City = request.City,
                Type = (int)CoreNodeTypes.Activity
            };

            if(request.SpatialInfo != null)
                activity.SpatialInfo = request.SpatialInfo.ToEntity();

            if (request.ContentInfo != null)
                activity.ContentInfo = request.ContentInfo.ToEntity();

            if (request.PoiInfo != null)
                activity.PoiInfo = request.PoiInfo as PoiInfo;

            if (request.CommercialStatusInfo != null)
                activity.PoiInfo = request.PoiInfo as PoiInfo;

            if (request.PoiInfo != null)
                activity.PoiInfo = request.PoiInfo as PoiInfo;


            _context.CoreNodes.Add(activity);
            _context.SaveChanges();

            var response = activity.MapToDto();
            return DtoResponse<DtoCoreNode>.Ok(response, "Activity added successfully").ToOkResult();
        }
        catch (Exception ex)
        {
            return DtoResponse<DtoCoreNode>.Fail($"Error adding activity: {ex.Message}").ToNotFoundResult();
        }
    }

    [Authorize]
    [HttpPut]
    [Route("UpdateActivity")]
    public IActionResult UpdateActivity([FromBody] DtoCoreNode request)
    {
        if (!int.TryParse(User.FindFirst("UserKey")?.Value, out int userKey))
            return Unauthorized("Invalid user token: missing or invalid user info.");

        try
        {
            var activity = _context.CoreNodes
                .FirstOrDefault(a => a.Key == request.Key && 
                                    a.Type == (int)CoreNodeTypes.Activity &&
                                    a.OwnerUserkey == userKey);

            if (activity == null)
                return DtoResponse<DtoCoreNode>.Fail("Activity not found or you don't have permission to update it").ToNotFoundResult();

            activity.Label = request.Label;
            activity.Description = request.Description;
            activity.StartDate = request.StartDate;
            activity.EndDate = request.EndDate;
            activity.Country = request.Country;
            activity.CountryCode = request.CountryCode;
            activity.City = request.City;
            activity.ExternalId = request.ExternalId;

            _context.SaveChanges();

            var response = activity.MapToDto();
            return DtoResponse<DtoCoreNode>.Ok(response, "Activity updated successfully").ToOkResult();
        }
        catch (Exception ex)
        {
            return DtoResponse<DtoCoreNode>.Fail($"Error updating activity: {ex.Message}").ToNotFoundResult();
        }
    }

    [Authorize]
    [HttpDelete]
    [Route("DeleteActivity")]
    public IActionResult DeleteActivity([FromQuery] int id)
    {
        if (!int.TryParse(User.FindFirst("UserKey")?.Value, out int userKey))
            return Unauthorized("Invalid user token: missing or invalid user info.");

        try
        {
            var activity = _context.CoreNodes
                .FirstOrDefault(a => a.Key == id && 
                                    a.Type == (int)CoreNodeTypes.Activity &&
                                    a.OwnerUserkey == userKey);

            if (activity == null)
                return DtoResponse<bool>.Fail("Activity not found or you don't have permission to delete it").ToNotFoundResult();

            _context.CoreNodes.Remove(activity);
            _context.SaveChanges();

            return DtoResponse<bool>.Ok(true, "Activity deleted successfully").ToOkResult();
        }
        catch (Exception ex)
        {
            return DtoResponse<bool>.Fail($"Error deleting activity: {ex.Message}").ToNotFoundResult();
        }
    }

    [Authorize]
    [HttpGet]
    [Route("GetActivitiesByUser")]
    public IActionResult GetActivitiesByUser([FromQuery] int userId)
    {
        if (!int.TryParse(User.FindFirst("UserKey")?.Value, out int userKey))
            return Unauthorized("Invalid user token: missing or invalid user info.");

        try
        {
            if (userId != userKey)
                return DtoResponse<List<DtoCoreNode>>.Fail("You don't have permission to view these activities").ToNotAuthorizedResult();

            var activities = _context.CoreNodes
                .Include(a => a.CommercialStatusInfo)
                .Include(a => a.ContentInfo)
                .Include(a => a.PoiInfo)
                .Include(a => a.SpatialInfo)
                .Include(a => a.WeatherInfo)
                .Where(a => a.Type == (int)CoreNodeTypes.Activity && a.OwnerUserkey == userId)
                .OrderBy(a => a.StartDate)
                .ToList();

            var response = activities.Select(a => a.MapToDto()).ToList();
            return DtoResponse<List<DtoCoreNode>>.Ok(response, "User activities retrieved successfully").ToOkResult();
        }
        catch (Exception ex)
        {
            return DtoResponse<List<DtoCoreNode>>.Fail($"Error retrieving user activities: {ex.Message}").ToNotFoundResult();
        }
    }

  
}
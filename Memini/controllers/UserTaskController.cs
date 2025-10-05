
using Memini.entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Memini.dto;
using Memini.managers;
using Memini.services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Memini.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UserTaskController : ControllerBase
{
    private IConfiguration _configuration;
    private AuthorisationService _authorisationService;
    private readonly MeminiDbContext _context;
    public UserTaskController(IConfiguration configuration, AuthorisationService authorisationService, MeminiDbContext context)
    {
        _configuration = configuration;
        _authorisationService = authorisationService;
        _context = context;
    }

    [Authorize]
    [HttpPost]
    [Route("AddUserTask")]
    public IActionResult AddUserTask(DtoUserTask userTask)
    {
        if (!int.TryParse(User.FindFirst("UserKey")?.Value, out int userKey))
            return Unauthorized("Invalid user token: missing or invalid user info.");    

        var createdUserTask = _context.UserTasks.Add(new UserTask
        {
            Year = userTask.Year,
            Month = userTask.Month,
            Day = userTask.Day,
            Starttime = userTask.StartTime,
            Endtime = userTask.EndTime,
            Title = userTask.Title,
            Description = userTask.Description,
            Userkey = userKey
        }).Entity;        

        new UserTaskManager(userKey, _context).StoreTask(createdUserTask);

        _context.SaveChanges();                

        return DtoResponse<DtoUserTask>.Ok(createdUserTask.ToDto(), "Task added successfully").ToOkResult();
    }

    [Authorize]
    [HttpPost]
    [Route("GetTasksForDate")]
    public IActionResult GetTasksForDate(DtoUserTaskDateRequest userTaskDateRequest)
    {
        if (!int.TryParse(User.FindFirst("UserKey")?.Value, out int userKey))
            return Unauthorized("Invalid user token: missing or invalid user info.");        

        List<DtoUserTask> tasksForDate = _context.UserTasks.Where(ut =>
            ut.Userkey == userKey).Where(ut =>
                ut.Year == userTaskDateRequest.Year && ut.Month == userTaskDateRequest.Month && ut.Day == userTaskDateRequest.Day).Select(ut => ut.ToDto()).ToList(); 

        return DtoResponse<List<DtoUserTask>>.Ok(tasksForDate, "Loaded Tasks Success").ToOkResult();
    }

    [Authorize]
    [HttpPost]
    [Route("SaveUserTask")]
    public IActionResult SaveUserTask(DtoUserTask userTask)
    {
        if (!int.TryParse(User.FindFirst("UserKey")?.Value, out int userKey))
            return Unauthorized("Invalid user token: missing or invalid user info.");     

        var taskToUpdate = _context.UserTasks
            .FirstOrDefault(ut => ut.Usertaskkey == userTask.UserTaskKey);

        if (taskToUpdate == null)
            return DtoResponse<DtoUserTask>.Fail("Couldn't find the UserTask to update").ToNotFoundResult();

        // Map DtoUserTask to UserTask (properties must match)
        _context.Entry(taskToUpdate).CurrentValues.SetValues(userTask);

        _context.SaveChanges();

        return DtoResponse<DtoUserTask>.Ok(taskToUpdate.ToDto(), "Updated Task successfully").ToOkResult();    
    }

    [Authorize]
    [HttpPost]
    [Route("DeleteUserTask")]
    public IActionResult DeleteUserTask(DtoUserTask userTask)
    {
        if (!int.TryParse(User.FindFirst("UserKey")?.Value, out int userKey))
            return Unauthorized("Invalid user token: missing or invalid user info.");

        var taskToDelete = _context.UserTasks
            .FirstOrDefault(ut => ut.Usertaskkey == userTask.UserTaskKey);

        if (taskToDelete == null)
            return NotFound("Couldn't find the UserTask to delete");

        _context.UserTasks.Remove(taskToDelete);
        _context.SaveChanges();

        return Ok(new { Response = "Task successfully deleted", Success = true });
    }

    [Authorize]
    [HttpGet]
    [Route("GetFavoritesAndRecentTasks")]
    public IActionResult GetFavoritesAndRecentTasks()
    {
        if (!int.TryParse(User.FindFirst("UserKey")?.Value, out int userKey))
            return Unauthorized("Invalid user token: missing or invalid user info.");

        int nrOfResults = 10; // experimental

        var storedUserTasks = _context.StoredUserTasks.Where(ut => ut.Userkey == userKey);
        List<DtoStoredUserTask> favorites = storedUserTasks.Where(sut => sut.Favorite == true).Take(10).Select(sutFav => sutFav.ToDto()).ToList();
        List<DtoStoredUserTask> recent = storedUserTasks.OrderByDescending(sut => sut.Created).Take(10).Select(sutRec => sutRec.ToDto()).ToList(); ;

        DtoStoredUserTaskResponse storedUserTaskResponse = new DtoStoredUserTaskResponse()
        {
            Favorites = favorites,
            Recent = recent
        };

        return DtoResponse<DtoStoredUserTaskResponse>.Ok(storedUserTaskResponse, "Fetched Favorites and Recently created tasks successfully").ToOkResult();    
    }
}


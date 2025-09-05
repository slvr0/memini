
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
    public UserTaskController(IConfiguration configuration, AuthorisationService authorisationService)
    {
        _configuration = configuration;
        _authorisationService = authorisationService;
    }

    [Authorize]
    [HttpPost]
    [Route("AddUserTask")]
    public IActionResult AddUserTask(DtoUserTask userTask)
    {
        if (!int.TryParse(User.FindFirst("UserKey")?.Value, out int userKey))
            return Unauthorized("Invalid user token: missing or invalid user info.");

        using var context = new MeminiDbContext();

        var createdUserTask = context.UserTasks.Add(new UserTask
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

        context.SaveChanges();                

        return DtoResponse<DtoUserTask>.Ok(createdUserTask.ToDto(), "Task added successfully").ToOkResult();
    }

    [Authorize]
    [HttpPost]
    [Route("GetTasksForDate")]
    public IActionResult GetTasksForDate(DtoUserTaskDateRequest userTaskDateRequest)
    {
        if (!int.TryParse(User.FindFirst("UserKey")?.Value, out int userKey))
            return Unauthorized("Invalid user token: missing or invalid user info.");

        using var context = new MeminiDbContext();

        List<DtoUserTask> tasksForDate = context.UserTasks.Where(ut => 
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

        using var context = new MeminiDbContext();

        var taskToUpdate = context.UserTasks
            .FirstOrDefault(ut => ut.Usertaskkey == userTask.UserTaskKey);

        if (taskToUpdate == null)
            return DtoResponse<DtoUserTask>.Fail("Couldn't find the UserTask to update").ToNotFoundResult();          

        // Map DtoUserTask to UserTask (properties must match)
        context.Entry(taskToUpdate).CurrentValues.SetValues(userTask);

        context.SaveChanges();

        return DtoResponse<DtoUserTask>.Ok(taskToUpdate.ToDto(), "Updated Task successfully").ToOkResult();    
    }

    [Authorize]
    [HttpPost]
    [Route("DeleteUserTask")]
    public IActionResult DeleteUserTask(DtoUserTask userTask)
    {
        if (!int.TryParse(User.FindFirst("UserKey")?.Value, out int userKey))
            return Unauthorized("Invalid user token: missing or invalid user info.");

        using var context = new MeminiDbContext();

        var taskToDelete = context.UserTasks
            .FirstOrDefault(ut => ut.Usertaskkey == userTask.UserTaskKey);

        if (taskToDelete == null)
            return NotFound("Couldn't find the UserTask to delete");

        context.UserTasks.Remove(taskToDelete);
        context.SaveChanges();

        return Ok(new { Response = "Task successfully deleted", Success = true });
    }
}


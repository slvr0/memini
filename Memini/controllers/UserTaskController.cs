
using Memini.entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Memini.dto;
using Memini.managers;
using Memini.services;
using Microsoft.AspNetCore.Authorization;

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
    [Route("AddNewTask")]
    public IActionResult AddNewTask(DtoUserTask userTaskRequest)
    {
        var userKeyClaim = User.FindFirst("UserKey")?.Value;

        if (userKeyClaim == null)        
            return Unauthorized("Invalid user token: missing user info.");
        int userKey = int.Parse(userKeyClaim);

        using var context = new MeminiDbContext();

        context.UserTasks.Add(new UserTask()
        {
            Year = userTaskRequest.Year,
            Month = userTaskRequest.Month,
            Day = userTaskRequest.Day,
            StartTime = userTaskRequest.StartTime,
            EndTime = userTaskRequest.EndTime,
            Title = userTaskRequest.Title,
            Description = userTaskRequest.Description,
            UserKey = userKey
        });

        context.SaveChanges();

        return Ok(new { message = "Task added successfully" });
    }

    [Authorize]
    [HttpPost]
    [Route("GetTasksForDate")]
    public IActionResult GetTasksForDate(DtoUserTaskDateRequest userTaskDateRequest)
    {
        var userKeyClaim = User.FindFirst("UserKey")?.Value;

        if (userKeyClaim == null)
            return Unauthorized("Invalid user token: missing user info.");
        int userKey = int.Parse(userKeyClaim);

        using var context = new MeminiDbContext();

        List<DtoUserTask> tasksForDate = context.UserTasks.Where(ut => 
            ut.UserKey == userKey).Where(ut => 
                ut.Year == userTaskDateRequest.Year && ut.Month == userTaskDateRequest.Month && ut.Day == userTaskDateRequest.Day).Select(ut => ut.ToDto()).ToList();


        DtoTaskListResponse TaskResponse = new DtoTaskListResponse() { Tasks = tasksForDate };

        return Ok(new { message = "Loaded tasks", tasks = TaskResponse });
    }


}


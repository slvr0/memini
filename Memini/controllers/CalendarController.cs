
using Memini.entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Memini.dto;
using Memini.managers;

namespace Memini.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CalendarController : ControllerBase
{
    private IConfiguration _configuration;
    public CalendarController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpGet]
    [Route("GetCalendar")]
    public JsonResult GetCalendar()
    {
        using(var context = new MeminiDbContext())
        {
            User? user = new UserManager().GetUserBasic("Dan Johansson", "johansson_dan@hotmail.com", context);

            if (user == null)
                return new JsonResult("couldnt find the user");

            var userDto = user.ToDto();

            return new JsonResult(userDto);
        }        
    }

}




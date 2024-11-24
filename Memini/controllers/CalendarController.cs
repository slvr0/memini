
using Memini.db;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

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
        //return new JsonResult("Durper");

        using(var context = new MeminiDbContext())
        {
            User? user = context.Users.FirstOrDefault(user => user.Name == "Dan Johansson");

            if(user != null)
            {
                var res = new
                {
                    Name = user.Name,
                    Email = user.Email
                };
                return new JsonResult(res);
            }
        }

        return new JsonResult("Durper still");
    }

}




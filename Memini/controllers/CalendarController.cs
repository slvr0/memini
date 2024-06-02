
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;


namespace Memini.Controllers
{
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
            return new JsonResult("Durp");
        }

    }
}


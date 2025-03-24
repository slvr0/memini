
using Memini.entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Memini.dto;
using Memini.managers;
using Memini.services;

namespace Memini.Controllers;

[Route("api/[controller]")]
[ApiController]

public class UserController : ControllerBase
{
    private IConfiguration _configuration;
    private AuthorisationService _authorisationService;
    public UserController(IConfiguration configuration, AuthorisationService authorisationService)
    {
        _configuration = configuration;
        _authorisationService = authorisationService;
    }

    [HttpPost]
    [Route("RegisterNewUser")]
    public JsonResult RegisterNewUser(dto.DtoUserRegistrationRequest userRegistrationRequest)
    {
        using (var context = new MeminiDbContext())
        {
            bool success = new UserManager(_authorisationService).RegisterNewUser(userRegistrationRequest, context);           

            return new JsonResult(new dto.DtoUserRegistrationResponse()
            {
                Success = success
            });
        }
    }

    [HttpPost]
    [Route("LoginUser")]
    public JsonResult LoginUser(dto.DtoUserLoginRequest userLoginRequest)
    {
        using (var context = new MeminiDbContext())
        {
            dto.DtoUserLoginResponse loginResponse = new UserManager(_authorisationService).LoginUser(userLoginRequest, context);

            return new JsonResult(loginResponse);
        }
    }

}

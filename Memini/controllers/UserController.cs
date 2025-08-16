
using Memini.entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Memini.dto;
using Memini.managers;
using Memini.services;
using Microsoft.AspNetCore.Authorization;

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
    public IActionResult RegisterNewUser(dto.DtoUserRegistrationRequest userRegistrationRequest)
    {
        using var context = new MeminiDbContext();

        DtoUserLoginResponse loginResponse = new UserManager(_authorisationService).RegisterNewUser(userRegistrationRequest, context);

        if(loginResponse.Success)
        {
            return DtoResponse<DtoUserLoginResponse>.Ok(
            loginResponse,
            "Successfully registered new user and logged in"
            ).ToOkResult();
        } else        
            return DtoResponse<DtoUserLoginResponse>.Fail(loginResponse.Details).ToBadRequestResult();
    }

    [HttpPost]
    [Route("LoginUser")]
    public IActionResult LoginUser(dto.DtoUserLoginRequest userLoginRequest)
    {
        using var context = new MeminiDbContext();

        DtoUserLoginResponse loginResponse = new UserManager(_authorisationService).LoginUser(userLoginRequest, context);

        if (loginResponse.Success)
        {
            return DtoResponse<DtoUserLoginResponse>.Ok(
            loginResponse,
            "Successfully logged in"
            ).ToOkResult();
        }
        else
        {
            return DtoResponse<DtoUserLoginResponse>.Fail(loginResponse.Details).ToBadRequestResult();
        }        
    } 
}

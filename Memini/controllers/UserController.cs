
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
    private MeminiDbContext _context;
    public UserController(IConfiguration configuration, AuthorisationService authorisationService, MeminiDbContext context)
    {
        _configuration = configuration;
        _authorisationService = authorisationService;
        _context = context;
    }
   
    [HttpPost]
    [Route("RegisterNewUser")]
    public IActionResult RegisterNewUser(dto.DtoUserRegistrationRequest userRegistrationRequest)
    {      

        DtoUserLoginResponse loginResponse = new UserManager(_authorisationService).RegisterNewUser(userRegistrationRequest, _context);

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

        DtoUserLoginResponse loginResponse = new UserManager(_authorisationService).LoginUser(userLoginRequest, _context);

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

    [HttpPost]
    [Authorize]
    [Route("SetUserLocation")]
    public IActionResult SetUserLocation(dto.DtoUserLocation userLocationUpdateRequest)
    {
        if (!int.TryParse(User.FindFirst("UserKey")?.Value, out int userKey))
            return Unauthorized("Invalid user token: missing or invalid user info.");

        DtoResponse<DtoUserUpdateInformationResponse> res = new UserManager(_authorisationService).SetUserLocation(userLocationUpdateRequest, userKey, _context);

        if(res.Success) 
            return res.ToOkResult();
        else
            return res.ToBadRequestResult();
    }

    [HttpPost]
    [Authorize]
    [Route("GetUserLocation")]
    public IActionResult GetUserLocation()
    {
        if (!int.TryParse(User.FindFirst("UserKey")?.Value, out int userKey))
            return Unauthorized("Invalid user token: missing or invalid user info.");

        DtoResponse<DtoUserLocation> res = new UserManager(_authorisationService).GetUserLocation(userKey, _context);

         if(res.Success) 
            return res.ToOkResult();
        else
            return res.ToBadRequestResult();

    }
}

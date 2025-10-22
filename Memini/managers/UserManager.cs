using Memini.entities;
using BCrypt.Net;
using Memini.dto;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Memini.services;
using Microsoft.AspNetCore.Mvc;


namespace Memini.managers;
public class UserManager
{
    private AuthorisationService _authorisationService;

    public UserManager(AuthorisationService authorisationService) {
        _authorisationService = authorisationService;
    }

    public DtoUserLoginResponse RegisterNewUser(dto.DtoUserRegistrationRequest userRegistrationRequest, MeminiDbContext context)
    {
        string hashedPassword = _authorisationService.PasswordHash(userRegistrationRequest.Password);
        string firstName = userRegistrationRequest.FirstName;
        string lastName = userRegistrationRequest.LastName; 
        string email = userRegistrationRequest.Email;

        bool success = true;
        string loginErrorDetails = string.Empty;
        
        User user = new User()
        {
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            Password = hashedPassword
        };

        try
        {            
            context.Users.Add(user);
            context.SaveChanges();
        }
        catch (Exception ex) {
            success = false;
            loginErrorDetails = ex.Message;            
        }

        if(success)
            return LoginUser(new DtoUserLoginRequest(user.Email, userRegistrationRequest.Password), context);
        else 
            return new DtoUserLoginResponse(success: false, details : loginErrorDetails);
    }

    public DtoUserLoginResponse LoginUser(dto.DtoUserLoginRequest userLoginRequest, MeminiDbContext context)
    {       
        User? user = context.Users.FirstOrDefault(user => user.Email.ToLower() == userLoginRequest.Email.ToLower()); 

        if(user == null)        
            return new DtoUserLoginResponse() { Success = false, Details = "Invalid Email, does not exist in Memini" };        

        bool validPassword = _authorisationService.IsValidPassword(user, userLoginRequest.Password);

        if(!validPassword)
            return new DtoUserLoginResponse() { Success = false, Details = "Invalid password" };

        //generate JWT token for user session
        string sessionToken = _authorisationService.GenerateJwtToken(user);

        return new dto.DtoUserLoginResponse()
        {
            Success = true,
            SessionToken = sessionToken,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
        };
    }

    public DtoResponse<DtoUserUpdateInformationResponse> SetUserLocation(dto.DtoUserLocation userLocationRequest, int userKey, MeminiDbContext context) 
    {
        User? user = context.Users.FirstOrDefault(user => user.Userkey == userKey);

        if (user == null)
            return new DtoResponse<DtoUserUpdateInformationResponse>() { Success = false, Response = "Invalid Email, does not exist in Memini" };

        try
        {
            user.Country = userLocationRequest.Country;
            user.City = userLocationRequest.City;
            context.SaveChanges();
            return new DtoResponse<DtoUserUpdateInformationResponse>() { Success = true, Response = "Updated user location" };
        }
        catch (Exception ex) 
        {
            return new DtoResponse<DtoUserUpdateInformationResponse>() { Success = false, Response = ex.Message };

        }
    }

    public DtoResponse<DtoUserLocation> GetUserLocation(int userKey, MeminiDbContext context)
    {
        User? user = context.Users.FirstOrDefault(user => user.Userkey == userKey);      

        if (user == null)
            return new DtoResponse<DtoUserLocation>() { Success = false, ResponseObject = null, Response = "Invalid Email, does not exist in Memini" };

        try
        {          
            return new DtoResponse<DtoUserLocation>() { Success = true, ResponseObject = new DtoUserLocation() 
                { Country = user.Country, City = user.City}, Response = "fetched user location" };
        }
        catch (Exception ex)
        {
            return new DtoResponse<DtoUserLocation>() { Success = false, ResponseObject = null, Response = "Couldnt fetch user location" };

        }
    }


}

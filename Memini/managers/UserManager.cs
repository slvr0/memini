using Memini.entities;
using BCrypt.Net;
using Memini.dto;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Memini.services;

namespace Memini.managers;
public class UserManager
{
    private AuthorisationService _authorisationService;

    public UserManager(AuthorisationService authorisationService) {
        _authorisationService = authorisationService;
    }

    public bool RegisterNewUser(dto.DtoUserRegistrationRequest userRegistrationRequest, MeminiDbContext context)
    {
        string hashedPassword = _authorisationService.PasswordHash(userRegistrationRequest.Password);
        string firstName = userRegistrationRequest.FirstName;
        string lastName = userRegistrationRequest.LastName; 
        string email = userRegistrationRequest.Email;

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
            throw new Exception("Error saving new user.", ex);
        }     

        return true;
    }

    public dto.DtoUserLoginResponse LoginUser(dto.DtoUserLoginRequest userLoginRequest, MeminiDbContext context)
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

    public User? GetUserBasic(string userName, string userEmail, MeminiDbContext context)
    {
        //TBD
        return new User();

        //return context.Users.FirstOrDefault(u => u.Name == userName && u.Email == userEmail);
    }

    public void LoadUserActivities(User user) { 
    
    }

    public void LoadUserActivitiesUnderCurrentMonth(User user)
    {

    }

    



}

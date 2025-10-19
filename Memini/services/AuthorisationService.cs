using Memini.entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;

namespace Memini.services;

public class AuthorisationService
{
    private readonly IConfiguration _configuration;

    public AuthorisationService(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public string GetJWTKey()
    {      
        var secretKey = _configuration["JwtSettings:SecretKey"];
        var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));
        return secretKey;
    }

    public string PasswordHash(string inputPassword)
    {
        try
        {
            return BCrypt.Net.BCrypt.HashPassword(inputPassword);
        }
        catch (Exception ex)
        {
            throw new Exception("Error while hashing the password.", ex);
        }
    }

    public bool IsValidPassword(User user, string inputPassword)
    {
        return BCrypt.Net.BCrypt.Verify(inputPassword, user.Password);
    }

    public string GenerateJwtToken(User user)
    {
        var secretKey = GetJWTKey();
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
        new Claim("FirstName", user.FirstName),
        new Claim("LastName", user.LastName),
        new Claim(JwtRegisteredClaimNames.Email, user.Email),
        new Claim("UserKey", user.Userkey.ToString())   // custom claim with key "UserKey"
        };


        var token = new JwtSecurityToken(
            issuer: "memini",
            audience: "local",
            claims: claims,
            expires: DateTime.UtcNow.AddHours(24),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string GenerateGuid() => Guid.NewGuid().ToString();  
  


}

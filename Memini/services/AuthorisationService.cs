using Memini.entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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
        return _configuration["JwtSettings:SecretKey"];
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
        new Claim(JwtRegisteredClaimNames.Name, user.FirstName.ToString()),
        new Claim(JwtRegisteredClaimNames.Name, user.LastName.ToString()),
        new Claim(JwtRegisteredClaimNames.Email, user.Email),   
    };

        var token = new JwtSecurityToken(
            issuer: "memini",
            audience: "local",
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }


}

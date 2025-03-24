using Memini.entities;

namespace Memini.dto;

public class DtoUser
{
    public int UserKey{ get; set; }
    public string FirstName { get; set; } = String.Empty;
    public string LastName { get; set; } = String.Empty;
    public string Email { get; set; } = String.Empty;
}

public class DtoUserRegistrationRequest
{
    public string FirstName { get; set; } = String.Empty;
    public string LastName { get; set; } = String.Empty;
    public string Email { get; set; } = String.Empty;
    public string Password { get; set; } = String.Empty;

}

public class DtoUserLoginRequest
{
    public string Email { get; set; } = String.Empty;
    public string Password { get; set; } = String.Empty;
}

public class DtoUserRegistrationResponse
{
    public bool Success { get; set; }
}
public class DtoUserLoginResponse
{
    public bool Success { get; set; } = false;
    public string SessionToken { get; set; } = String.Empty;    
    public string Details { get; set; } = String.Empty;
    public string FirstName { get; set; } = String.Empty;
    public string LastName { get; set; } = String.Empty;
    public string Email { get; set; } = String.Empty;
}

public static class UserExtensions
{
    public static DtoUser ToDto(this User user)
    {
        if (user == null)
            throw new ArgumentNullException(nameof(user));

        return new DtoUser
        {
            UserKey = user.UserKey,
            FirstName = user.FirstName,
            LastName = user.LastName, 
            Email = user.Email,
        };
    }
}

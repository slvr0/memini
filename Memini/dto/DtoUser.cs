using Memini.entities;

namespace Memini.dto
{
    public class DtoUser
    {
        public int      UserKey { get; set; }
        public string   UserName { get; set; } = string.Empty;
        public string   UserEmail { get; set; } = string.Empty;
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
                UserName = user.Name,
                UserEmail = user.Email
            };
        }
    }
}

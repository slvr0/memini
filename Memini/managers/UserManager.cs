using Memini.entities;

namespace Memini.managers
{
    public class UserManager
    {
        public UserManager() { }   
        
        public User? GetUserGodHimself(MeminiDbContext context) { 
            return context.Users.FirstOrDefault(u => u.Name == "Dan Johansson");
        }

        public User? GetUserBasic(string userName, string userEmail, MeminiDbContext context)
        {
            return context.Users.FirstOrDefault(u => u.Name == userName && u.Email == userEmail);
        }

        public void LoadUserActivities(User user) { 
        
        }

        public void LoadUserActivitiesUnderCurrentMonth(User user)
        {

        }



    }
}

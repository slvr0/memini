using Memini.entities;

namespace Memini.managers;
public class UserTaskManager
{
    private MeminiDbContext _context;
    int _userKey;

    public UserTaskManager(int userKey, MeminiDbContext context)
    {
        _userKey = userKey;
        _context = context;
    } 

    public void StoreTask(UserTask userTask, bool isFavorite = false)
    {
        bool uniqueEntry = _context.StoredUserTasks
        .Any(st => st.Title         == userTask.Title
                && (st.Description == userTask.Description
                || (st.Description == null && userTask.Description == null))
                && st.Userkey       == _userKey);

        if (!uniqueEntry)
            return;

        var duration = userTask.Endtime - userTask.Starttime;
        StoredUserTask storedTask = new StoredUserTask()
        {
            Title = userTask.Title,
            Description = userTask.Description,
            Duration = duration,
            Favorite = isFavorite,
            Userkey = _userKey
        };

        _context.StoredUserTasks.Add(storedTask);
        _context.SaveChanges();
    }
}

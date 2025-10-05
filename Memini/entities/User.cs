using System;
using System.Collections.Generic;

namespace Memini.entities;

public partial class User
{
    public int Userkey { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public virtual ICollection<StoredUserTask> StoredUserTasks { get; set; } = new List<StoredUserTask>();

    public virtual ICollection<UserTask> UserTasks { get; set; } = new List<UserTask>();
}

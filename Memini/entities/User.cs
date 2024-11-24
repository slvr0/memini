using System;
using System.Collections.Generic;

namespace Memini.entities;

public partial class User
{
    public int UserKey { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();
}

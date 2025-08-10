using System;
using System.Collections.Generic;

namespace Memini.entities;

public partial class UserTask
{
    public int UserTaskKey { get; set; }

    public int Year { get; set; }

    public int Month { get; set; }

    public int Day { get; set; }

    public int StartTime { get; set; }

    public int EndTime { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public int UserKey { get; set; }

    public virtual User UserKeyNavigation { get; set; } = null!;
}

using System;
using System.Collections.Generic;

namespace Memini.entities;

public partial class Activity
{
    public int ActivityKey { get; set; }

    public int UserKey { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? ActivityType { get; set; }

    public virtual User UserKeyNavigation { get; set; } = null!;
}

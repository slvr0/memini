using System;
using System.Collections.Generic;

namespace Memini.entities;

public partial class UserTask
{
    public int Usertaskkey { get; set; }

    public int Year { get; set; }

    public int Month { get; set; }

    public int Day { get; set; }

    public int Starttime { get; set; }

    public int Endtime { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public int? Userkey { get; set; }

    public virtual User? UserkeyNavigation { get; set; }
}

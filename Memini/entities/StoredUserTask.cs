using System;
using System.Collections.Generic;

namespace Memini.entities;

public partial class StoredUserTask
{
    public int Storedusertaskkey { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public int? Duration { get; set; }

    public bool? Favorite { get; set; }

    public DateTime? Created { get; set; }

    public int? Userkey { get; set; }

    public virtual User? UserkeyNavigation { get; set; }
}

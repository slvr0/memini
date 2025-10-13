using System;
using System.Collections.Generic;

namespace Memini.entities;

public partial class CommercialStatusInfo
{
    public int CommercialStatusInfoKey { get; set; }

    public int CoreNodeKey { get; set; }

    public string? Status { get; set; }

    public string? StatusReason { get; set; }

    public string? Availability { get; set; }

    public bool? SoldOut { get; set; }

    public bool? Cancelled { get; set; }

    public bool? Postponed { get; set; }

    public bool? Rescheduled { get; set; }

    public bool? Active { get; set; }

    public string? MinPrice { get; set; }

    public string? MaxPrice { get; set; }

    public string? Currency { get; set; }

    public bool? Free { get; set; }

    public virtual CoreNode CoreNodeKeyNavigation { get; set; } = null!;
}

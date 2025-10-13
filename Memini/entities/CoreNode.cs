﻿using System;
using System.Collections.Generic;

namespace Memini.entities;

public partial class CoreNode
{
    public int Key { get; set; }

    public string? ExternalId { get; set; }

    public string Guid { get; set; } = null!;

    public string Source { get; set; } = null!;

    public string? Label { get; set; }

    public string? Description { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public int Type { get; set; }

    public string? CountryCode { get; set; }

    public string? CityCode { get; set; }

    public virtual CommercialStatusInfo? CommercialStatusInfo { get; set; }

    public virtual ContentInfo? ContentInfo { get; set; }

    public virtual SpatialInfo? SpatialInfo { get; set; }
}

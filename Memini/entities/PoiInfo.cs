using System;
using System.Collections.Generic;

namespace Memini.entities;

public partial class PoiInfo
{
    public int PoiInfoKey { get; set; }

    public int CoreNodeKey { get; set; }

    public string? Address { get; set; }

    public string? PostalCode { get; set; }

    public float? Latitude { get; set; }

    public float? Longitude { get; set; }

    public bool? Open { get; set; }

    public bool? Closed { get; set; }

    public DateTime? DateClosed { get; set; }

    public bool? Verified { get; set; }

    public bool? Free { get; set; }

    public int? PriceLevel { get; set; }

    public string? WebsiteUrl { get; set; }

    public float? Popularity { get; set; }

    public float? Rating { get; set; }

    public int? TotalRatings { get; set; }

    public int? Category { get; set; }

    public string? AllCategories { get; set; }

    public virtual ICollection<ContentMedium> ContentMedia { get; set; } = new List<ContentMedium>();

    public virtual CoreNode CoreNodeKeyNavigation { get; set; } = null!;
}

using System;
using System.Collections.Generic;

namespace Memini.entities;

public partial class ContentMedium
{
    public int ContentMediaKey { get; set; }

    public int? ContentInfoKey { get; set; }

    public int? PoiInfoKey { get; set; }

    public string Url { get; set; } = null!;

    public string? Type { get; set; }

    public int? Width { get; set; }

    public int? Height { get; set; }

    public bool? IsPrimary { get; set; }

    public string? Attribution { get; set; }

    public string? Prefix { get; set; }

    public string? Suffix { get; set; }

    public virtual ContentInfo? ContentInfoKeyNavigation { get; set; }

    public virtual PoiInfo? PoiInfoKeyNavigation { get; set; }
}

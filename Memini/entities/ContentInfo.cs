using System;
using System.Collections.Generic;

namespace Memini.entities;

public partial class ContentInfo
{
    public int ContentInfoKey { get; set; }

    public int CoreNodeKey { get; set; }

    public string? ContentInformation { get; set; }

    public string? ContentSubtext { get; set; }

    public string? Category { get; set; }

    public string? Tags { get; set; }

    public string? Genre { get; set; }

    public string? SubGenre { get; set; }

    public int? GlobalRank { get; set; }

    public int? LocalRank { get; set; }

    public float? Relevance { get; set; }

    public string? PerformerName { get; set; }

    public string? PerformerType { get; set; }

    public string? PerformerGenre { get; set; }

    public virtual ICollection<ContentMedium> ContentMedia { get; set; } = new List<ContentMedium>();

    public virtual CoreNode CoreNodeKeyNavigation { get; set; } = null!;
}

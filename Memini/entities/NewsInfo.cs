using System;
using System.Collections.Generic;

namespace Memini.entities;

public partial class NewsInfo
{
    public int NewsInfoKey { get; set; }

    public int CoreNodeKey { get; set; }

    public DateTime DateAdded { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Url { get; set; }

    public string? ImageUrl { get; set; }

    public string? Language { get; set; }

    public DateTime? PublishedDate { get; set; }

    public string? Source { get; set; }

    public string? Categories { get; set; }

    public float? Relevance { get; set; }

    public string? Locale { get; set; }

    public string? Uuid { get; set; }

    public string? Keywords { get; set; }

    public string? Snippet { get; set; }

    public virtual CoreNode CoreNodeKeyNavigation { get; set; } = null!;
}

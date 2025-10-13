using System;
using System.Collections.Generic;

namespace Memini.entities;

public partial class ContentImage
{
    public int Id { get; set; }

    public int ParentContentId { get; set; }

    public string Url { get; set; } = null!;

    public string? Type { get; set; }

    public int? Width { get; set; }

    public int? Height { get; set; }

    public bool? IsPrimary { get; set; }

    public string? Attribution { get; set; }

    public virtual ContentInfo ParentContent { get; set; } = null!;
}

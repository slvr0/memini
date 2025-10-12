﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeminiEventAPI.api_datamodels
{
    public class NormalizedNews
    {
        public string? Uuid { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Keywords { get; set; }
        public string? Snippet { get; set; }
        public string? Url { get; set; }
        public string? ImageUrl { get; set; }
        public string? Language { get; set; }
        public DateTime? PublishedAt { get; set; }
        public string? Source { get; set; }
        public List<string>? Categories { get; set; }
        public double? RelevanceScore { get; set; }
        public string? Locale { get; set; }
    }
}

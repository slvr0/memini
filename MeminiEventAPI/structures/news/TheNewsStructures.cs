using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeminiEventAPI.structures;

namespace MeminiEventAPI.structures.news
{
    public enum NewsApiEndpoint
    {
        All,
        Top
    }

    public enum NewsApiSort
    {
        PublishedAt,
        RelevanceScore
    }
    public static class NewsApiCategories
    {
        public const string General = "general";
        public const string Business = "business";
        public const string Entertainment = "entertainment";
        public const string Health = "health";
        public const string Science = "science";
        public const string Sports = "sports";
        public const string Technology = "tech";
        public const string Politics = "politics";
        public const string Food = "food";
        public const string Travel = "travel";
    }

    public class TheNewsApiRequest : IApiRequest
    {
        // Endpoint selection
        public NewsApiEndpoint Endpoint { get; set; } = NewsApiEndpoint.All;

        // Search parameters
        public string Search { get; set; }
        public string SearchFields { get; set; } // "title,description,keywords"

        // Filtering
        public List<string> Categories { get; set; } = new List<string>();
        public List<string> Domains { get; set; } = new List<string>();
        public List<string> ExcludeDomains { get; set; } = new List<string>();
        public string Language { get; set; } // "en", "es", "fr", etc.
        public string Locale { get; set; } // "us", "gb", "ca", etc.

        // Date filtering
        public DateTime? PublishedBefore { get; set; }
        public DateTime? PublishedAfter { get; set; }
        public DateTime? PublishedOn { get; set; }

        // Sorting and pagination
        public NewsApiSort Sort { get; set; } = NewsApiSort.PublishedAt;
        public int Limit { get; set; } = 3; // Default per their free tier
        public int Page { get; set; } = 1;
    }
}

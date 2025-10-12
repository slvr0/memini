using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using MeminiEventAPI.structures;
namespace MeminiEventAPI.api_datamodels.thenews;

// Root response model
public class TheNewsApiDataModel : IApiDataModel
{
    [JsonPropertyName("meta")]
    public TheNewsApiMeta Meta { get; set; }

    [JsonPropertyName("data")]
    public List<NewsArticle> Data { get; set; } = new List<NewsArticle>();
}

// Meta information
public class TheNewsApiMeta
{
    [JsonPropertyName("found")]
    public int Found { get; set; }

    [JsonPropertyName("returned")]
    public int Returned { get; set; }

    [JsonPropertyName("limit")]
    public int Limit { get; set; }

    [JsonPropertyName("page")]
    public int Page { get; set; }
}

// Individual news article (equivalent to TicketmasterEvent)
public class NewsArticle
{
    [JsonPropertyName("uuid")]
    public string Uuid { get; set; }

    [JsonPropertyName("title")]
    public string Title { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; }

    [JsonPropertyName("keywords")]
    public string Keywords { get; set; }

    [JsonPropertyName("snippet")]
    public string Snippet { get; set; }

    [JsonPropertyName("url")]
    public string Url { get; set; }

    [JsonPropertyName("image_url")]
    public string ImageUrl { get; set; }

    [JsonPropertyName("language")]
    public string Language { get; set; }

    [JsonPropertyName("published_at")]
    public DateTime PublishedAt { get; set; }

    [JsonPropertyName("source")]
    public string Source { get; set; }

    [JsonPropertyName("categories")]
    public List<string> Categories { get; set; } = new List<string>();

    [JsonPropertyName("relevance_score")]
    public double? RelevanceScore { get; set; }

    [JsonPropertyName("locale")]
    public string Locale { get; set; }
}

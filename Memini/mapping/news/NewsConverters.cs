using MeminiEventAPI.api_datamodels;
using Memini.entities;

namespace Memini.mapping.news;
public static class NewsConverters
{
    public static NewsInfo ConvertToNewsInfo(this NormalizedNews normalizedNews)
    {
        return new NewsInfo
        {
            Title = normalizedNews.Title,
            Description = normalizedNews.Description,
            Uuid = normalizedNews.Uuid,
            Keywords = normalizedNews.Keywords,
            Snippet = normalizedNews.Snippet,
            Url = normalizedNews.Url,
            ImageUrl = normalizedNews.ImageUrl,
            Language = normalizedNews.Language,
            PublishedDate = normalizedNews.PublishedAt,
            Source = normalizedNews.Source,
            Categories = normalizedNews.Categories != null ? string.Join(", ", normalizedNews.Categories) : null,
            Relevance = (float?)normalizedNews.RelevanceScore,
            Locale = normalizedNews.Locale
        };
    }

    public static List<NewsInfo> ConvertToNewsInfos(this List<NormalizedNews> normalizedNews) => normalizedNews.Select(news => news.ConvertToNewsInfo()).ToList();

}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeminiEventAPI.api_datamodels.thenews;

using MeminiEventAPI.api_datamodels;
using TN = MeminiEventAPI.api_datamodels.thenews;

namespace MeminiEventAPI.mapping.profiles;

/* only one source of news api so the normalized data is 1:1 with the the news api . org currently. */
public class TheNewsDataMapper : FluentQualityMapper<TN.NewsArticle, NormalizedNews>
{
    public TheNewsDataMapper()
    {
        ConfigureMapping();
    }
    private void ConfigureMapping()
    {
        // Essential identifiers
        Map(s => s.Uuid, d => d.Uuid, uuid => uuid?.Trim(), trackQuality: true);
        Map(s => s.Title, d => d.Title, title => title?.Trim(), trackQuality: true);
        Map(s => s.Url, d => d.Url,
            url => string.IsNullOrWhiteSpace(url) ? null : url.Trim(), trackQuality: true);

        // Content fields
        Map(s => s.Description, d => d.Description,
            desc => string.IsNullOrWhiteSpace(desc) ? null : desc.Trim(), trackQuality: true);
        Map(s => s.Keywords, d => d.Keywords,
            keywords => string.IsNullOrWhiteSpace(keywords) ? null : keywords.Trim(), trackQuality: true);
        Map(s => s.Snippet, d => d.Snippet,
            snippet => string.IsNullOrWhiteSpace(snippet) ? null : snippet.Trim(), trackQuality: true);

        // Media and source
        Map(s => s.ImageUrl, d => d.ImageUrl,
            imageUrl => string.IsNullOrWhiteSpace(imageUrl) ? null : imageUrl.Trim(), trackQuality: true);
        Map(s => s.Source, d => d.Source,
            source => source?.Trim(), trackQuality: true);

        // Temporal data
        Map(s => s.PublishedAt, d => d.PublishedAt, trackQuality: true);

        // Scoring and relevance
        Map(s => s.RelevanceScore, d => d.RelevanceScore, trackQuality: true);

        // Localization
        Map(s => s.Language, d => d.Language,
            lang => string.IsNullOrWhiteSpace(lang) ? null : lang.Trim(), trackQuality: true);
        Map(s => s.Locale, d => d.Locale,
            locale => string.IsNullOrWhiteSpace(locale) ? null : locale.Trim(), trackQuality: true);

        // Categories (list field)
        Map(s => s.Categories, d => d.Categories, trackQuality: true);
    }  
}
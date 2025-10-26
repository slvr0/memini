using MeminiEventAPI.structures;
using MeminiEventAPI.mapping;
using MeminiEventAPI.mapping.profiles;
using MeminiEventAPI.api_datamodels.thenews;
using MeminiEventAPI.api_datamodels;
using MeminiEventAPI.structures.news;

namespace MeminiEventAPI.adapters;

internal class TheNewsApiAdapter(HttpClient httpClient) : NewsApiBaseAdapter<TheNewsApiDataModel, NewsArticle>(httpClient, "TheNews")
{
    public readonly static string ConnectionString = "https://api.thenewsapi.com/v1/news/";

    protected override int ApiDataModelTotalResult(TheNewsApiDataModel dataModel) => dataModel.Meta?.Returned ?? 0;

    protected override Task<List<NewsArticle>> ApiDataModelResult(TheNewsApiDataModel dataModel) => Task.FromResult(dataModel?.Data ?? []);

    public override string GenerateApiRequestUrl(IApiRequest requestConfig)
    {
        var config = requestConfig as TheNewsApiRequest;
        if (config == null)
            throw new ArgumentException("Invalid request config type");

        var endpoint = config.Endpoint switch
        {
            NewsApiEndpoint.All => "all",
            NewsApiEndpoint.Top => "top",
            NewsApiEndpoint.Headlines => "headlines",
            _ => "all"
        };

        var query = System.Web.HttpUtility.ParseQueryString(string.Empty);

        // Search parameters
        if (!string.IsNullOrEmpty(config.Search))
            query["search"] = config.Search;

        if (!string.IsNullOrEmpty(config.SearchFields))
            query["search_fields"] = config.SearchFields;

        // Categories (comma-separated)
        if (config.Categories?.Any() == true)
            query["categories"] = string.Join(",", config.Categories);

        // Domains
        if (config.Domains?.Any() == true)
            query["domains"] = string.Join(",", config.Domains);

        if (config.ExcludeDomains?.Any() == true)
            query["exclude_domains"] = string.Join(",", config.ExcludeDomains);

        // Language and locale
        if (!string.IsNullOrEmpty(config.Language))
            query["language"] = config.Language;

        if (!string.IsNullOrEmpty(config.Locale))
            query["locale"] = config.Locale;  // ← FIXED: Use "locale" not "country"

        // Date filtering - FIXED: Use simple date format without time
        if (config.PublishedBefore.HasValue)
            query["published_before"] = config.PublishedBefore.Value.ToString("yyyy-MM-dd");

        if (config.PublishedAfter.HasValue)
            query["published_after"] = config.PublishedAfter.Value.ToString("yyyy-MM-dd");

        if (config.PublishedOn.HasValue)
            query["published_on"] = config.PublishedOn.Value.ToString("yyyy-MM-dd");

        // Sorting - FIXED: Only add if not default
        if (config.Sort != NewsApiSort.PublishedAt)  // Don't add default sort
        {
            query["sort"] = config.Sort switch
            {
                NewsApiSort.RelevanceScore => "relevance_score",
                _ => "published_at"
            };
        }

        // Pagination - FIXED: Only add if not default
        if (config.Limit > 0)
            query["limit"] = config.Limit.ToString();

        if (config.Page > 1)  // Only add page if > 1
            query["page"] = config.Page.ToString();

        var queryString = query.ToString();
        return string.IsNullOrEmpty(queryString) ? endpoint : $"{endpoint}?{queryString}";
    }

    public override List<MappingResult<NormalizedNews>> MapToNormalizedNews(double keepThreshold = 0.1)
    {
        var mapper = new mapping.profiles.TheNewsDataMapper();

        //Just generalize the executer with a generic normalized typed data instead of creating separate
        return TheNewsMapperExecuter.Execute<NewsArticle>(AccumulatedData, mapper, keepThreshold);
    }
}

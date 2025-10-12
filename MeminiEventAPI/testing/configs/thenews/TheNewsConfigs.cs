
using MeminiEventAPI.structures;
using MeminiEventAPI.structures.news;
using MeminiEventAPI.handlers;

namespace MeminiEventAPI.testing.configs.thenews
{
    public class TheNewsTesting
    {
        public async Task<MeminiApiResponse> SimpleTestConfig(ApiAdapterHandler handler)
        {
            var configs = new Dictionary<string, ICollection<IApiRequest>>
            {
                ["TheNews"] = new List<IApiRequest>
                {
                    new TheNewsApiRequest
                    {
                        Endpoint = NewsApiEndpoint.Top,
                        Locale = "us",
                        Limit = 3
                    }
                }
            };

            return await handler.FetchDataFromApis(configs);
        }

        public async Task<MeminiApiResponse> ComprehensiveTestConfig(ApiAdapterHandler handler)
        {
            var configs = new Dictionary<string, ICollection<IApiRequest>>
            {
                ["TheNews"] = new List<IApiRequest>
        {
            // Test 1: Simple top headlines by locale
            new TheNewsApiRequest
            {
                Endpoint = NewsApiEndpoint.Top,
                Locale = "us",
                Limit = 3
            },
            
            // Test 2: Search with keywords
            new TheNewsApiRequest
            {
                Endpoint = NewsApiEndpoint.All,
                Search = "artificial intelligence",
                Language = "en",
                Limit = 5
            },
            
            // Test 3: Category filtering
            new TheNewsApiRequest
            {
                Endpoint = NewsApiEndpoint.All,
                Categories = new List<string> { "tech", "science" },
                Locale = "us",
                Limit = 10
            },
            
            // Test 4: Domain filtering
            new TheNewsApiRequest
            {
                Endpoint = NewsApiEndpoint.All,
                Domains = new List<string> { "techcrunch.com", "wired.com" },
                Language = "en",
                Limit = 5
            },
            
            // Test 5: Exclude domains with search
            new TheNewsApiRequest
            {
                Endpoint = NewsApiEndpoint.All,
                Search = "bitcoin",
                ExcludeDomains = new List<string> { "coindesk.com" },
                Limit = 5
            },
            
            // Test 6: Date range filtering
            new TheNewsApiRequest
            {
                Endpoint = NewsApiEndpoint.All,
                PublishedAfter = DateTime.Now.AddDays(-7),
                PublishedBefore = DateTime.Now,
                Categories = new List<string> { "business" },
                Limit = 10
            },
            
            // Test 7: Search in specific fields
            new TheNewsApiRequest
            {
                Endpoint = NewsApiEndpoint.All,
                Search = "climate change",
                SearchFields = "title,description",
                Language = "en",
                Limit = 5
            },
            
            // Test 8: Sort by relevance with pagination
            new TheNewsApiRequest
            {
                Endpoint = NewsApiEndpoint.All,
                Search = "machine learning",
                Sort = NewsApiSort.RelevanceScore,
                Page = 2,
                Limit = 10
            },
            
            // Test 9: Published on specific date
            new TheNewsApiRequest
            {
                Endpoint = NewsApiEndpoint.All,
                PublishedOn = DateTime.Now.AddDays(-1),
                Categories = new List<string> { "sports" },
                Locale = "gb",
                Limit = 5
            },
            
            // Test 10: Complex multi-filter query
            new TheNewsApiRequest
            {
                Endpoint = NewsApiEndpoint.All,
                Search = "electric vehicles",
                Categories = new List<string> { "tech", "business" },
                Language = "en",
                Locale = "us",
                PublishedAfter = DateTime.Now.AddDays(-3),
                Sort = NewsApiSort.PublishedAt,
                Limit = 10
            }
        }
            };

            return await handler.FetchDataFromApis(configs);
        }
    }
}

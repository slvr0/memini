using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using MeminiEventAPI.structures;
using MeminiEventAPI.handlers;
namespace MeminiEventAPI.testing.configs.predicthq;

public class PredictHqTestConfig
{
    public Dictionary<string, ICollection<IApiRequest>> CreateTestConfigs()
    {
        var configs = new Dictionary<string, ICollection<IApiRequest>>
        {
            ["PredictHQ"] = new List<IApiRequest>
        {
            // Test 1: All events in Stockholm - next 30 days
            new MeminiEventApiRequest
            {
                Location = "59.3293,18.0686", // Stockholm
                Radius = "10km",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(30),
                PageSize = 50,
                SortBy = "relevance"
            },

            // Test 2: Concerts in Stockholm
            new MeminiEventApiRequest
            {
                Location = "59.3293,18.0686",
                Radius = "15km",
                Category = "concerts",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(60),
                PageSize = 40,
                SortBy = "date.asc"
            },

            // Test 3: Sports events in Gothenburg
            //new MeminiEventApiRequest
            //{
            //    Location = "57.7089,11.9746", // Gothenburg
            //    Radius = "10km",
            //    Category = "sports",
            //    StartDate = DateTime.Now,
            //    EndDate = DateTime.Now.AddDays(45),
            //    PageSize = 35,
            //    SortBy = "score.desc"
            //},

            //// Test 4: Community events in Stockholm
            //new MeminiEventApiRequest
            //{
            //    Location = "59.3293,18.0686",
            //    Radius = "8km",
            //    Category = "community",
            //    StartDate = DateTime.Now,
            //    EndDate = DateTime.Now.AddDays(30),
            //    PageSize = 30,
            //    SortBy = "date.asc"
            //},

            //// Test 5: Festivals across Sweden
            //new MeminiEventApiRequest
            //{
            //    Country = "Sweden",
            //    CountryCode = "SE",
            //    Category = "festivals",
            //    StartDate = DateTime.Now,
            //    EndDate = DateTime.Now.AddDays(90),
            //    PageSize = 40,
            //    SortBy = "score.desc"
            //},

            //// Test 6: Performing arts in Stockholm
            //new MeminiEventApiRequest
            //{
            //    Location = "59.3293,18.0686",
            //    Radius = "12km",
            //    Category = "performing-arts",
            //    StartDate = DateTime.Now,
            //    EndDate = DateTime.Now.AddDays(60),
            //    PageSize = 35,
            //    SortBy = "relevance"
            //},

            //// Test 7: Conferences in Gothenburg
            //new MeminiEventApiRequest
            //{
            //    Location = "57.7089,11.9746",
            //    Radius = "15km",
            //    Category = "conferences",
            //    StartDate = DateTime.Now,
            //    EndDate = DateTime.Now.AddDays(120),
            //    PageSize = 30,
            //    SortBy = "date.asc"
            //},

            //// Test 8: All Sweden events - near term
            //new MeminiEventApiRequest
            //{
            //    Country = "Sweden",
            //    CountryCode = "SE",
            //    StartDate = DateTime.Now,
            //    EndDate = DateTime.Now.AddDays(14),
            //    PageSize = 50,
            //    SortBy = "score.desc"
            //},

            //// Test 9: Expos and exhibitions in Stockholm
            //new MeminiEventApiRequest
            //{
            //    Location = "59.3293,18.0686",
            //    Radius = "20km",
            //    Category = "expos",
            //    StartDate = DateTime.Now,
            //    EndDate = DateTime.Now.AddDays(90),
            //    PageSize = 25,
            //    SortBy = "date.asc"
            //},

            //// Test 10: Academic events in Gothenburg
            //new MeminiEventApiRequest
            //{
            //    Location = "57.7089,11.9746",
            //    Radius = "10km",
            //    Category = "academic",
            //    StartDate = DateTime.Now,
            //    EndDate = DateTime.Now.AddDays(60),
            //    PageSize = 20,
            //    SortBy = "relevance"
            //},

            //// Test 11: High-impact events with labels (Stockholm)
            //new MeminiEventApiRequest
            //{
            //    Location = "59.3293,18.0686",
            //    Radius = "15km",
            //    Labels = "public-holidays,observances",
            //    StartDate = DateTime.Now,
            //    EndDate = DateTime.Now.AddDays(180),
            //    PageSize = 30,
            //    SortBy = "score.desc"
            //},

            //// Test 12: Music events in Gothenburg
            //new MeminiEventApiRequest
            //{
            //    Location = "57.7089,11.9746",
            //    Radius = "12km",
            //    Labels = "music,concert",
            //    StartDate = DateTime.Now,
            //    EndDate = DateTime.Now.AddDays(60),
            //    PageSize = 25,
            //    SortBy = "date.asc"
            //},

            //// Test 13: All categories Stockholm - wider radius
            //new MeminiEventApiRequest
            //{
            //    Location = "59.3293,18.0686",
            //    Radius = "25km",
            //    StartDate = DateTime.Now,
            //    EndDate = DateTime.Now.AddDays(21),
            //    PageSize = 40,
            //    SortBy = "relevance"
            //},

            //// Test 14: School holidays impact events
            //new MeminiEventApiRequest
            //{
            //    Country = "Sweden",
            //    CountryCode = "SE",
            //    Labels = "school-holidays",
            //    StartDate = DateTime.Now,
            //    EndDate = DateTime.Now.AddDays(365),
            //    PageSize = 20,
            //    SortBy = "date.asc"
            //},

            //// Test 15: Weekend events in Stockholm
            //new MeminiEventApiRequest
            //{
            //    Location = "59.3293,18.0686",
            //    Radius = "10km",
            //    StartDate = DateTime.Now,
            //    EndDate = DateTime.Now.AddDays(30),
            //    PageSize = 30,
            //    SortBy = "score.desc"
            //}
        }
        };

        return configs;
    }

    public async Task<MeminiApiResponse> RunSimpleTest(ApiAdapterHandler handler)
    {
        Console.WriteLine("=== Running Simple PredictHQ Test ===\n");

        var simpleConfig = new Dictionary<string, ICollection<IApiRequest>>
        {
            ["PredictHQ"] = new List<IApiRequest>
        {
            new MeminiEventApiRequest
            {
                Location = "59.3293,18.0686", // Stockholm
                Radius = "10km",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(30),
                PageSize = 20
            }
        }
        };

        var exactConfig = new Dictionary<string, ICollection<IApiRequest>>
        {
            ["PredictHQ"] = new List<IApiRequest>
        {
            new MeminiEventApiRequest
            {
                Country = "Sweden",
                CountryCode = "SE",
                PageSize = 10
                // Minimal parameters for basic test
            }
        }
        };

        var config = CreateTestConfigs();

        return await handler.FetchDataFromApis(config);
    }
}

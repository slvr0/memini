using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeminiEventAPI.handlers;
using MeminiEventAPI.structures;
using MeminiEventAPI.structures.foursquare;


namespace MeminiEventAPI.testing.configs.foursquare;

public class FourSquareTesting {


    public Dictionary<string, ICollection<IApiRequest>> CreateSimpleFoursquareTestConfig()
    {
        var configs = new Dictionary<string, ICollection<IApiRequest>>
        {
            ["FourSquare"] = new List<IApiRequest>
        {
            new FoursquareApiRequest
            {
                City = "Göteborg",
                SearchSize = 1
            }
        }
        };

        return configs;
    }
    // FoursquareApiTester.cs - Updated CreateTestConfigs
    public Dictionary<string, ICollection<IApiRequest>> CreateTestConfigs()
{
    var configs = new Dictionary<string, ICollection<IApiRequest>>
    {
        ["FourSquare"] = new List<IApiRequest>
        {
            // Test 1: Restaurants in Stockholm
            new FoursquareApiRequest
            {
                City = "Stockholm>",
                Country = "Sweden",
                Radius = "1000",
                Categories = FoursquareCategory.Food,
                SearchSize = 1,
                
            },

            //// Test 2: Bars & Nightlife in Stockholm
            //new FoursquareApiRequest
            //{
            //    City = "Göteborg",
            //    Radius = "3000",
            //    Categories = FoursquareCategory.NightlifeSpot,
            //    SearchSize = 15,
            //    SortBy = "RATING"
            //},

            //// Test 3: Coffee Shops near specific coordinates
            //new FoursquareApiRequest
            //{
            //    Location = "59.3293,18.0686", // Stockholm coordinates
            //    Radius = "2000",
            //    Categories = FoursquareCategory.NightlifeSpot,
            //    SearchSize = 10,
            //    SortBy = "DISTANCE"
            //},

            //// Test 4: Hotels in Stockholm
            //new FoursquareApiRequest
            //{
            //    City = "Stockholm",
            //    Radius = "5000",
            //    Categories = FoursquareCategory.NightlifeSpot,
            //    SearchSize = 10
            //},

            //// Test 5: Landmarks & Attractions
            //new FoursquareApiRequest
            //{
            //    City = "Linköping",
            //    Radius = "10000",
            //    Categories = FoursquareCategory.NightlifeSpot,
            //    SearchSize = 15
            //},

            //// Test 6: Arts & Entertainment
            //new FoursquareApiRequest
            //{
            //    Location = "59.3293,18.0686",
            //    Radius = "5000",
            //    Categories = FoursquareCategory.NightlifeSpot,
            //    SearchSize = 20
            //},

            //// Test 7: Search by query - "pizza"
            //new FoursquareApiRequest
            //{
            //    City = "Stockholm",
            //    Query = "pizza",
            //    Radius = "5000",
            //    SearchSize = 15
            //},

            //// Test 8: Multiple categories - Restaurants + Bars
            //new FoursquareApiRequest
            //{
            //    City = "Uppsala",
            //    Categories = FoursquareCategory.Residence | FoursquareCategory.TravelAndTransport,
            //    Radius = "4000",
            //    SearchSize = 25
            //},

            //// Test 9: Museums
            //new FoursquareApiRequest
            //{
            //    City = "Örebro",
            //    Categories = FoursquareCategory.ShopAndService,
            //    Radius = "5000",
            //    SearchSize = 10
            //},

            //// Test 10: Parks
            //new FoursquareApiRequest
            //{
            //    City = "Örebro",
            //    Categories = FoursquareCategory.Event,
            //    Radius = "8000",
            //    SearchSize = 10
            //},

            //// Test 11: Bakeries
            //new FoursquareApiRequest
            //{
            //    City = "Stockholm",
            //    Categories = FoursquareCategory.Food,
            //    Radius = "3000",
            //    SearchSize = 15
            //},

            //// Test 12: Shopping Malls
            //new FoursquareApiRequest
            //{
            //    City = "Stockholm",
            //    Categories = FoursquareCategory.TravelAndTransport,                
            //    Radius = "10000",
            //    SearchSize = 10
            //}
        }
    };

    return configs;
    }
    public Dictionary<string, ICollection<IApiRequest>> EfficientFoursquareSweden()
    {
        var requests = new List<IApiRequest>();

        var coveragePoints = new[]
        {
        //("Malmö", "55.6050,13.0038"),
        ("Göteborg", "57.7089,11.9746"),
        //("Linköping", "58.4108,15.6214"),
        //("Stockholm", "59.3293,18.0686"),
        //("Västerås", "59.6099,16.5448"),
        //("Sundsvall", "62.3908,17.3069"),
        //("Umeå", "63.8258,20.2630"),
        //("Luleå", "65.5848,22.1547")
        };

        int pagesPerPoint = 1; // 10 pages × 50 = 500 POIs per point

        foreach (var (city, latlong) in coveragePoints)
        {
            // Paginate through results
            for (int page = 0; page < pagesPerPoint; page++)
            {
                requests.Add(new FoursquareApiRequest
                {
                    Country = "Sweden",
                    CountryCode = "SE",
                    City = city,
                    Location = latlong,
                    Radius = "100000",      // 100km
                    SearchSize = 50,        // 50 per page
                    Offset = page * 50,     // Foursquare uses offset, not page number!
                    SortBy = "distance"
                });
            }
        }

        Console.WriteLine($"═══════════════════════════════════════");
        Console.WriteLine($"Foursquare Sweden Coverage with Pagination");
        Console.WriteLine($"═══════════════════════════════════════");
        Console.WriteLine($"Coverage points: {coveragePoints.Length}");
        Console.WriteLine($"Pages per point: {pagesPerPoint}");
        Console.WriteLine($"Total requests: {requests.Count}");
        Console.WriteLine($"Expected POIs: ~{requests.Count * 50}");
        Console.WriteLine($"Free calls remaining: 9,761");
        Console.WriteLine($"Calls used: {requests.Count} ({(requests.Count / 9761.0):P1})");
        Console.WriteLine($"═══════════════════════════════════════");

        return new Dictionary<string, ICollection<IApiRequest>>
        {
            ["FourSquare"] = requests
        };
    }

}

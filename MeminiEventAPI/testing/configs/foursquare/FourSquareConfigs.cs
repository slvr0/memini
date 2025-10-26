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
                City = "Stockholm",
                Country = "Sweden",
                Radius = "5000",
                Categories = FoursquareCategory.Food,
                SearchSize = 20,
                SortBy = "RELEVANCE"
            },

            // Test 2: Bars & Nightlife in Stockholm
            new FoursquareApiRequest
            {
                City = "Göteborg",
                Radius = "3000",
                Categories = FoursquareCategory.NightlifeSpot,
                SearchSize = 15,
                SortBy = "RATING"
            },

            // Test 3: Coffee Shops near specific coordinates
            new FoursquareApiRequest
            {
                Location = "59.3293,18.0686", // Stockholm coordinates
                Radius = "2000",
                Categories = FoursquareCategory.NightlifeSpot,
                SearchSize = 10,
                SortBy = "DISTANCE"
            },

            // Test 4: Hotels in Stockholm
            new FoursquareApiRequest
            {
                City = "Stockholm",
                Radius = "5000",
                Categories = FoursquareCategory.NightlifeSpot,
                SearchSize = 10
            },

            // Test 5: Landmarks & Attractions
            new FoursquareApiRequest
            {
                City = "Linköping",
                Radius = "10000",
                Categories = FoursquareCategory.NightlifeSpot,
                SearchSize = 15
            },

            // Test 6: Arts & Entertainment
            new FoursquareApiRequest
            {
                Location = "59.3293,18.0686",
                Radius = "5000",
                Categories = FoursquareCategory.NightlifeSpot,
                SearchSize = 20
            },

            // Test 7: Search by query - "pizza"
            new FoursquareApiRequest
            {
                City = "Stockholm",
                Query = "pizza",
                Radius = "5000",
                SearchSize = 15
            },

            // Test 8: Multiple categories - Restaurants + Bars
            new FoursquareApiRequest
            {
                City = "Uppsala",
                Categories = FoursquareCategory.Residence | FoursquareCategory.TravelAndTransport,
                Radius = "4000",
                SearchSize = 25
            },

            // Test 9: Museums
            new FoursquareApiRequest
            {
                City = "Örebro",
                Categories = FoursquareCategory.ShopAndService,
                Radius = "5000",
                SearchSize = 10
            },

            // Test 10: Parks
            new FoursquareApiRequest
            {
                City = "Örebro",
                Categories = FoursquareCategory.Event,
                Radius = "8000",
                SearchSize = 10
            },

            // Test 11: Bakeries
            new FoursquareApiRequest
            {
                City = "Stockholm",
                Categories = FoursquareCategory.Food,
                Radius = "3000",
                SearchSize = 15
            },

            // Test 12: Shopping Malls
            new FoursquareApiRequest
            {
                City = "Stockholm",
                Categories = FoursquareCategory.TravelAndTransport,                
                Radius = "10000",
                SearchSize = 10
            }
        }
    };

    return configs;
    }

    public async Task<MeminiApiResponse> RunSimpleTest(ApiAdapterHandler handler)
    {
        Console.WriteLine("=== Running Simple Foursquare Test ===\n");

        var simpleConfig = new Dictionary<string, ICollection<IApiRequest>>
        {
            ["FourSquare"] = new List<IApiRequest>
            {
                new FoursquareApiRequest
                {
                    City = "Stockholm",
                    Radius = "3000",
                    //Categories = ((int)FoursquareCategory.CoffeeShop).ToString(),
                    SearchSize = 10
                }
            }
        };

        var exactConfig = new Dictionary<string, ICollection<IApiRequest>>
        {
            ["FourSquare"] = new List<IApiRequest>
        {
            new FoursquareApiRequest
            {
                City = "Stockholm",
                SearchSize = 5
                // No other parameters - matches the PowerShell test exactly
            }
        }
        };

        var config = CreateTestConfigs();

        return await handler.FetchDataFromApis(simpleConfig);
       
    }
}

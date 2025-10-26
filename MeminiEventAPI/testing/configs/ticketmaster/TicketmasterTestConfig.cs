using MeminiEventAPI.structures;
using MeminiEventAPI.structures.weather;
using MeminiEventAPI.handlers;

namespace MeminiEventAPI.testing.configs.ticketmaster;

public class TicketmasterTestConfig
{
    // Swedish city coordinates
    private static readonly Dictionary<string, (double Lat, double Lng)> CityCoordinates = new()
    {
        { "Göteborg", (57.70887, 11.97456) },
        { "Stockholm", (59.3293, 18.0686) },
        { "Malmö", (55.6050, 13.0038) },
        { "Uppsala", (59.8586, 17.6389) },
        { "Linköping", (58.4108, 15.6214) },
        { "Västerås", (59.6099, 16.5448) },
        { "Örebro", (59.2753, 15.2134) },
        { "Norrköping", (58.5877, 16.1924) },
        { "Helsingborg", (56.0465, 12.6945) },
        { "Jönköping", (57.7826, 14.1618) },
        { "Umeå", (63.8258, 20.2630) },
        { "Lund", (55.7047, 13.1910) },
        { "Borås", (57.7210, 12.9401) },
        { "Gävle", (60.6749, 17.1413) }
    };

    public Dictionary<string, ICollection<IApiRequest>> OptimizedSwedishCoverage()
    {
        var requests = new List<IApiRequest>();
        int pageSize = 200; // Max allowed by Ticketmaster
        int totalPages = 12; // 2262 ÷ 200 = 11.31, round up to 12

        for (int page = 0; page < totalPages; page++)
        {
            requests.Add(new MeminiEventApiRequest
            {
                Country = "Sweden",
                CountryCode = "SE",
                PageSize = pageSize,
                PageNumber = page,
            });
        }

        Console.WriteLine($"Total API requests: {requests.Count}");
        Console.WriteLine($"Max results: {requests.Count * pageSize}");

        return new Dictionary<string, ICollection<IApiRequest>>
        {
            ["Ticketmaster"] = requests
        };
    }
    public Dictionary<string, ICollection<IApiRequest>> CategoryBasedSweden()
    {
        var requests = new List<IApiRequest>();
        int pageSize = 200;

        var categories = new[] { "Music", "Sports", "Arts & Theatre", "Family", "Film", "Miscellaneous" };

        foreach (var category in categories)
        {
            // Each category search can return up to 1000 results
            for (int page = 0; page < 5; page++) // 5 pages × 200 = 1000 max per category
            {
                requests.Add(new MeminiEventApiRequest
                {
                    Country = "Sweden",
                    CountryCode = "SE",
                    Category = category,
                    PageSize = pageSize,
                    PageNumber = page
                });
            }
        }

        // Catch uncategorized events
        for (int page = 0; page < 5; page++)
        {
            requests.Add(new MeminiEventApiRequest
            {
                Country = "Sweden",
                CountryCode = "SE",
                PageSize = pageSize,
                PageNumber = page
            });
        }

        Console.WriteLine($"Total requests: {requests.Count}"); // ~35 requests
        return new Dictionary<string, ICollection<IApiRequest>>
        {
            ["Ticketmaster"] = requests
        };
    }
    public Dictionary<string, ICollection<IApiRequest>> OrebroOnlyConfig()
    {
        var requests = new List<IApiRequest>();

        requests.Add(new MeminiEventApiRequest
        {
            Country = "Sweden",
            CountryCode = "SE",
            City = "Örebro"
            // Don't set PageSize, PageNumber, Category - let them be null/default
        });

        return new Dictionary<string, ICollection<IApiRequest>>
        {
            ["Ticketmaster"] = requests
        };
    }

    public Dictionary<string, ICollection<IApiRequest>> GothenburgOnlyConfig()
    {
        var requests = new List<IApiRequest>();

        requests.Add(new MeminiEventApiRequest
        {
            Country = "Sweden",
            CountryCode = "SE",
            City = "Göteborg",
            PageSize = 200,
            PageNumber = 0
            
            // Don't set PageSize, PageNumber, Category - let them be null/default
        });

        requests.Add(new MeminiEventApiRequest
        {
            Country = "Sweden",
            CountryCode = "SE",
            City = "Göteborg",
            PageSize = 200,
            PageNumber = 1

            // Don't set PageSize, PageNumber, Category - let them be null/default
        });

        return new Dictionary<string, ICollection<IApiRequest>>
        {
            ["Ticketmaster"] = requests
        };
    }

    public Dictionary<string, ICollection<IApiRequest>> RadiusBasedSwedenConfig()
    {
        var requests = new List<IApiRequest>();

        // Strategic points across Sweden with 150km radius (covers most areas)
        var searchPoints = new[]
        {
        ("Malmö (South)", "55.6050,13.0038", 150),
        ("Göteborg (Southwest)", "57.7089,11.9746", 150),
        ("Stockholm (East)", "59.3293,18.0686", 150),
        ("Örebro (Central)", "59.2753,15.2134", 150),
        ("Sundsvall (Mid-North)", "62.3908,17.3069", 150),
        ("Umeå (North)", "63.8258,20.2630", 150),
        ("Luleå (Far North)", "65.5848,22.1547", 150),
        ("Karlstad (West)", "59.3793,13.5036", 150),
        ("Östersund (Northwest)", "63.1792,14.6357", 150)
        };

        foreach (var (name, latlong, radius) in searchPoints)
        {
            // Paginate each radius search
            for (int page = 0; page < 3; page++)
            {
                requests.Add(new MeminiEventApiRequest
                {
                    CountryCode = "SE",
                    Location = latlong,
                    Radius = radius.ToString(),
                    Unit = "km",
                    PageSize = 200,
                    PageNumber = page
                });
            }

            Console.WriteLine($"{name}: radius {radius}km around {latlong}");
        }

        Console.WriteLine($"Total requests: {requests.Count} (9 regions × 3 pages)");
        // ~27 requests to cover all of Sweden

        return new Dictionary<string, ICollection<IApiRequest>>
        {
            ["Ticketmaster"] = requests
        };
    }


    private static DateTime GetNextFriday(DateTime date)
    {
        int daysUntilFriday = ((int)DayOfWeek.Friday - (int)date.DayOfWeek + 7) % 7;
        if (daysUntilFriday == 0) daysUntilFriday = 7;
        return date.AddDays(daysUntilFriday);
    }
}
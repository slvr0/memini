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

    public Dictionary<string, ICollection<IApiRequest>> SimpleTestConfig()
    {
        var today = DateTime.UtcNow.Date;
        var requests = new List<IApiRequest>();

        // === GÖTEBORG (PRIMARY TEST CITY) ===

        // All categories - comprehensive date ranges
        requests.Add(new MeminiEventApiRequest
        {
            Country = "Sweden",
            CountryCode = "SE",
            City = "Göteborg",
            SearchSize = 200,
            StartDate = today,
            EndDate = today.AddDays(30),
            SortBy = "date"
        });

        requests.Add(new MeminiEventApiRequest
        {
            Country = "Sweden",
            CountryCode = "SE",
            City = "Göteborg",
            SearchSize = 200,
            StartDate = today.AddDays(31),
            EndDate = today.AddDays(90),
            SortBy = "date"
        });

        requests.Add(new MeminiEventApiRequest
        {
            Country = "Sweden",
            CountryCode = "SE",
            City = "Göteborg",
            SearchSize = 200,
            StartDate = today.AddDays(91),
            EndDate = today.AddDays(180),
            SortBy = "date"
        });

        // Music - paginated
        for (int page = 0; page < 3; page++)
        {
            requests.Add(new MeminiEventApiRequest
            {
                Country = "Sweden",
                CountryCode = "SE",
                City = "Göteborg",
                Category = "Music",
                SearchSize = 200,
                PageSize = 200,
                PageOffset = page * 200,
                StartDate = today,
                EndDate = today.AddMonths(6),
                SortBy = "date"
            });
        }

        // Sports
        requests.Add(new MeminiEventApiRequest
        {
            Country = "Sweden",
            CountryCode = "SE",
            City = "Göteborg",
            Category = "Sports",
            SearchSize = 200,
            StartDate = today,
            EndDate = today.AddMonths(6),
            SortBy = "date"
        });

        // Arts & Theatre
        requests.Add(new MeminiEventApiRequest
        {
            Country = "Sweden",
            CountryCode = "SE",
            City = "Göteborg",
            Category = "Arts & Theatre",
            SearchSize = 150,
            StartDate = today,
            EndDate = today.AddMonths(6),
            SortBy = "date"
        });

        // Family
        requests.Add(new MeminiEventApiRequest
        {
            Country = "Sweden",
            CountryCode = "SE",
            City = "Göteborg",
            Category = "Family",
            SearchSize = 100,
            StartDate = today,
            EndDate = today.AddMonths(4),
            SortBy = "date"
        });

        // Radius searches from Göteborg
        requests.Add(new MeminiEventApiRequest
        {
            Location = "57.70887,11.97456",
            Radius = "30km",
            SearchSize = 200,
            StartDate = today,
            EndDate = today.AddMonths(3),
            SortBy = "distance"
        });

        requests.Add(new MeminiEventApiRequest
        {
            Location = "57.70887,11.97456",
            Radius = "75km",
            Category = "Music",
            SearchSize = 200,
            StartDate = today,
            EndDate = today.AddMonths(6),
            SortBy = "distance"
        });

        // === STOCKHOLM ===

        // All categories - comprehensive
        requests.Add(new MeminiEventApiRequest
        {
            Country = "Sweden",
            CountryCode = "SE",
            City = "Stockholm",
            SearchSize = 200,
            StartDate = today,
            EndDate = today.AddMonths(2),
            SortBy = "date"
        });

        // Music - paginated
        for (int page = 0; page < 2; page++)
        {
            requests.Add(new MeminiEventApiRequest
            {
                Country = "Sweden",
                CountryCode = "SE",
                City = "Stockholm",
                Category = "Music",
                SearchSize = 200,
                PageSize = 200,
                PageOffset = page * 200,
                StartDate = today,
                EndDate = today.AddMonths(6),
                SortBy = "relevance"
            });
        }

        // Sports
        requests.Add(new MeminiEventApiRequest
        {
            Country = "Sweden",
            CountryCode = "SE",
            City = "Stockholm",
            Category = "Sports",
            SearchSize = 200,
            StartDate = today,
            EndDate = today.AddMonths(6),
            SortBy = "date"
        });

        // Arts & Theatre
        requests.Add(new MeminiEventApiRequest
        {
            Country = "Sweden",
            CountryCode = "SE",
            City = "Stockholm",
            Category = "Arts & Theatre",
            SearchSize = 150,
            StartDate = today,
            EndDate = today.AddMonths(4),
            SortBy = "date"
        });

        // === MALMÖ ===

        requests.Add(new MeminiEventApiRequest
        {
            Country = "Sweden",
            CountryCode = "SE",
            City = "Malmö",
            SearchSize = 200,
            StartDate = today,
            EndDate = today.AddMonths(3),
            SortBy = "date"
        });

        requests.Add(new MeminiEventApiRequest
        {
            Country = "Sweden",
            CountryCode = "SE",
            City = "Malmö",
            Category = "Music",
            SearchSize = 150,
            StartDate = today,
            EndDate = today.AddMonths(6),
            SortBy = "date"
        });

        // === OTHER MAJOR CITIES ===

        var otherCities = new[] { "Uppsala", "Linköping", "Västerås", "Örebro", "Norrköping", "Helsingborg" };
        foreach (var city in otherCities)
        {
            requests.Add(new MeminiEventApiRequest
            {
                Country = "Sweden",
                CountryCode = "SE",
                City = city,
                SearchSize = 100,
                StartDate = today,
                EndDate = today.AddMonths(4),
                SortBy = "date"
            });
        }

        // === SWEDEN-WIDE SEARCHES ===

        // All events - paginated
        for (int page = 0; page < 2; page++)
        {
            requests.Add(new MeminiEventApiRequest
            {
                Country = "Sweden",
                CountryCode = "SE",
                SearchSize = 200,
                PageSize = 200,
                PageOffset = page * 200,
                StartDate = today,
                EndDate = today.AddMonths(2),
                SortBy = "date"
            });
        }

        // Music nationwide
        requests.Add(new MeminiEventApiRequest
        {
            Country = "Sweden",
            CountryCode = "SE",
            Category = "Music",
            SearchSize = 200,
            StartDate = today,
            EndDate = today.AddMonths(3),
            SortBy = "relevance"
        });

        // Sports nationwide
        requests.Add(new MeminiEventApiRequest
        {
            Country = "Sweden",
            CountryCode = "SE",
            Category = "Sports",
            SearchSize = 150,
            StartDate = today,
            EndDate = today.AddMonths(4),
            SortBy = "date"
        });

        // Film
        requests.Add(new MeminiEventApiRequest
        {
            Country = "Sweden",
            CountryCode = "SE",
            Category = "Film",
            SearchSize = 100,
            StartDate = today,
            EndDate = today.AddMonths(3),
            SortBy = "date"
        });

        // Miscellaneous
        requests.Add(new MeminiEventApiRequest
        {
            Country = "Sweden",
            CountryCode = "SE",
            Category = "Miscellaneous",
            SearchSize = 100,
            StartDate = today,
            EndDate = today.AddMonths(3),
            SortBy = "date"
        });

        // === GENRE-SPECIFIC SEARCHES ===

        var genres = new[] { "Rock", "Pop", "Classical", "Jazz", "Electronic", "Hip-Hop", "Metal" };
        foreach (var genre in genres)
        {
            requests.Add(new MeminiEventApiRequest
            {
                Country = "Sweden",
                CountryCode = "SE",
                Labels = genre,
                SearchSize = 50,
                StartDate = today,
                EndDate = today.AddMonths(6),
                SortBy = "date"
            });
        }

        // Sports genres
        var sports = new[] { "Football", "Hockey", "Basketball", "Handball" };
        foreach (var sport in sports)
        {
            requests.Add(new MeminiEventApiRequest
            {
                Country = "Sweden",
                CountryCode = "SE",
                Labels = sport,
                SearchSize = 50,
                StartDate = today,
                EndDate = today.AddMonths(6),
                SortBy = "date"
            });
        }

        // === WEEKEND SEARCHES ===

        var weekendDate = GetNextFriday(today);
        for (int i = 0; i < 4; i++) // Next 4 weekends
        {
            requests.Add(new MeminiEventApiRequest
            {
                Country = "Sweden",
                CountryCode = "SE",
                SearchSize = 100,
                StartDate = weekendDate.AddDays(i * 7),
                EndDate = weekendDate.AddDays(i * 7 + 2), // Friday to Sunday
                SortBy = "date"
            });
        }

        // === SHORT-TERM HIGH-DENSITY SEARCHES ===

        // This week - major cities
        foreach (var city in new[] { "Göteborg", "Stockholm", "Malmö" })
        {
            requests.Add(new MeminiEventApiRequest
            {
                Country = "Sweden",
                CountryCode = "SE",
                City = city,
                SearchSize = 100,
                StartDate = today,
                EndDate = today.AddDays(7),
                SortBy = "date"
            });
        }

        // === RADIUS SEARCHES FROM MULTIPLE CITIES ===

        foreach (var kvp in CityCoordinates.Take(5))
        {
            requests.Add(new MeminiEventApiRequest
            {
                Location = $"{kvp.Value.Lat},{kvp.Value.Lng}",
                Radius = "50km",
                SearchSize = 100,
                StartDate = today,
                EndDate = today.AddMonths(3),
                SortBy = "distance"
            });
        }

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
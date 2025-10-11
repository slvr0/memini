using System;
using System.Collections.Generic;
using System.Linq;
using MeminiEventAPI.api_datamodels;
using TM = MeminiEventAPI.api_datamodels.ticketmaster;
using MeminiEventAPI.mapping;

namespace MeminiEventAPI.mapping.profiles;

/// <summary>
/// Ticketmaster to NormalizedEvent mapper using FluentQualityMapper
/// </summary>
public class TicketmasterMapper : FluentQualityMapper<TM.TicketmasterEvent, NormalizedEvent>
{
    public TicketmasterMapper()
    {
        ConfigureMapping();
    }


    private void ConfigureMapping()
    {
        // ==================== BASIC INFORMATION ====================
        Map(s => s.Id, d => d.ExternalId, id => id?.Trim(), trackQuality: true);
        Map(s => s.Name, d => d.Name, name => name?.Trim(), trackQuality: true);
        Map(s => s.Url, d => d.Url, trackQuality: true);
        Map(s => s.Info, d => d.Description,
            info => string.IsNullOrWhiteSpace(info) ? null : info.Trim(), trackQuality: true);

        // ==================== COMPLEX MAPPINGS ====================
        Map(s => s.Dates, d => d.TemporalInfo, dates => BuildTemporalInfo(dates), trackQuality: true);
        Map(s => s.Embedded, d => d.GeographicInfo, embedded => BuildGeographicInfo(embedded), trackQuality: true);
        Map(s => s.Embedded, d => d.VenueInfo, embedded => BuildVenueInfo(embedded), trackQuality: true);
        Map(s => s.Classifications, d => d.CategorizationInfo,
            classifications => BuildCategorizationInfo(classifications), trackQuality: true);
        Map(s => s.Sales, d => d.StatusInfo, sales => BuildStatusInfo(sales), trackQuality: true);
        Map(s => s.PriceRanges, d => d.PricingInfo,
            priceRanges => BuildPricingInfo(priceRanges), trackQuality: true);
        Map(s => s.Images, d => d.Media, images => BuildMedia(images), trackQuality: true);
    
    }
    // ==================== TEMPORAL INFO BUILDER ====================

    private EventTemporalInfo? BuildTemporalInfo(TM.DateInfo? dates)
    {
        if (dates == null) return null;

        var start = dates.Start;
        if (start == null) return null;

        return new EventTemporalInfo
        {
            StartDate = start.DateTime,
            LocalStartDate = ParseDateTime(start.LocalDate),
            Timezone = string.IsNullOrWhiteSpace(dates.Timezone) ? null : dates.Timezone,
            DisplayTime = string.IsNullOrWhiteSpace(start.LocalTime) ? null : start.LocalTime
        };
    }

    // ==================== GEOGRAPHIC INFO BUILDER ====================

    private EventGeographicInfo? BuildGeographicInfo(TM.EventEmbedded? embedded)
    {
        var venue = embedded?.Venues?.FirstOrDefault();
        if (venue == null) return null;

        var location = venue.Location;
        var address = venue.Address;
        var city = venue.City;
        var country = venue.Country;

        // Only create coordinates if both lat/lon are valid
        GeoCoordinates? coordinates = null;
        if (location != null &&
            !string.IsNullOrWhiteSpace(location.Latitude) &&
            !string.IsNullOrWhiteSpace(location.Longitude) &&
            double.TryParse(location.Latitude, out var lat) &&
            double.TryParse(location.Longitude, out var lon))
        {
            coordinates = new GeoCoordinates
            {
                Latitude = lat,
                Longitude = lon
            };
        }

        // Only return if we have at least some geographic data
        var hasData = !string.IsNullOrWhiteSpace(country?.Name) ||
                     !string.IsNullOrWhiteSpace(city?.Name) ||
                     coordinates != null;

        if (!hasData) return null;

        return new EventGeographicInfo
        {
            Country = string.IsNullOrWhiteSpace(country?.Name) ? null : country.Name,
            CountryCode = string.IsNullOrWhiteSpace(country?.CountryCode) ? null : country.CountryCode,
            City = string.IsNullOrWhiteSpace(city?.Name) ? null : city.Name,
            Address = string.IsNullOrWhiteSpace(address?.Line1) ? null : address.Line1,
            Coordinates = coordinates
        };
    }

    // ==================== VENUE INFO BUILDER ====================

    private EventVenueInfo? BuildVenueInfo(TM.EventEmbedded? embedded)
    {
        var venue = embedded?.Venues?.FirstOrDefault();
        if (venue == null) return null;

        // Only create coordinates if both lat/lon are valid
        GeoCoordinates? coordinates = null;
        if (venue.Location != null &&
            !string.IsNullOrWhiteSpace(venue.Location.Latitude) &&
            !string.IsNullOrWhiteSpace(venue.Location.Longitude) &&
            double.TryParse(venue.Location.Latitude, out var lat) &&
            double.TryParse(venue.Location.Longitude, out var lon))
        {
            coordinates = new GeoCoordinates
            {
                Latitude = lat,
                Longitude = lon
            };
        }

        return new EventVenueInfo
        {
            VenueId = string.IsNullOrWhiteSpace(venue.Id) ? null : venue.Id,
            Name = string.IsNullOrWhiteSpace(venue.Name) ? null : venue.Name,
            City = string.IsNullOrWhiteSpace(venue.City?.Name) ? null : venue.City.Name,
            Address = string.IsNullOrWhiteSpace(venue.Address?.Line1) ? null : venue.Address.Line1,
            Coordinates = coordinates
        };
    }

    // ==================== CATEGORIZATION INFO BUILDER ====================

    private EventCategorizationInfo? BuildCategorizationInfo(List<TM.Classification>? classifications)
    {
        var firstClass = classifications?.FirstOrDefault();
        if (firstClass == null) return null;

        var hasData = !string.IsNullOrWhiteSpace(firstClass.Segment?.Name) ||
                     !string.IsNullOrWhiteSpace(firstClass.Genre?.Name) ||
                     !string.IsNullOrWhiteSpace(firstClass.SubGenre?.Name);

        if (!hasData) return null;

        return new EventCategorizationInfo
        {
            PrimaryCategory = string.IsNullOrWhiteSpace(firstClass.Segment?.Name) ? null : firstClass.Segment.Name,
            Segment = string.IsNullOrWhiteSpace(firstClass.Segment?.Name) ? null : firstClass.Segment.Name,
            Genre = string.IsNullOrWhiteSpace(firstClass.Genre?.Name) ? null : firstClass.Genre.Name,
            SubGenre = string.IsNullOrWhiteSpace(firstClass.SubGenre?.Name) ? null : firstClass.SubGenre.Name
        };
    }

    // ==================== STATUS INFO BUILDER ====================

    private EventStatusInfo? BuildStatusInfo(TM.SalesInfo? sales)
    {
        // Ticketmaster events returned from API are typically active
        return new EventStatusInfo
        {
            IsActive = true,
            TicketAvailability = sales?.Public?.StartDateTime.HasValue == true
                ? TicketAvailability.Available
                : TicketAvailability.Unknown
        };
    }

    // ==================== PRICING INFO BUILDER ====================

    private EventPricingInfo? BuildPricingInfo(List<TM.PriceRange>? priceRanges)
    {
        if (priceRanges == null || !priceRanges.Any()) return null;

        var firstRange = priceRanges.First();

        // Build individual price ranges for the normalized model
        var ranges = priceRanges
            .Where(pr => !string.IsNullOrWhiteSpace(pr.Currency))
            .Select(pr => new PriceRange  // ✅ Normalized model, not API model
            {
                Type = string.IsNullOrWhiteSpace(pr.Type) ? null : pr.Type,
                Min = pr.Min,
                Max = pr.Max,
                Currency = pr.Currency
            })
            .ToList();

        return new EventPricingInfo
        {
            MinPrice = firstRange.Min,
            MaxPrice = firstRange.Max,
            Currency = string.IsNullOrWhiteSpace(firstRange.Currency) ? null : firstRange.Currency,
            IsFree = firstRange.Min == 0,
            PriceRanges = ranges.Any() ? ranges : null  // ✅ No ?. needed, ranges is never null
        };
    }

    // ==================== MEDIA BUILDER ====================

    private List<EventMedia>? BuildMedia(List<TM.EventImage>? images)
    {
        if (images == null || !images.Any()) return null;

        var media = images
            .Where(img => !string.IsNullOrWhiteSpace(img.Url))
            .Select((img, index) => new EventMedia
            {
                Url = img.Url,
                Type = MediaType.Image,
                Width = img.Width,
                Height = img.Height,
                IsPrimary = index == 0
            })
            .ToList();

        return media.Any() ? media : null;
    }

    // ==================== HELPER METHODS ====================

    private DateTime? ParseDateTime(string? dateString)
    {
        if (string.IsNullOrWhiteSpace(dateString)) return null;
        return DateTime.TryParse(dateString, out var result) ? result : null;
    }
}
//    // ==================== USAGE EXAMPLES ====================

//    public class TicketmasterMapperExamples
//    {
//        public void Example1_BasicMapping()
//        {
//            // Create the mapper
//            var mapper = new TicketmasterMapper();

//            // Sample Ticketmaster event
//            var ticketmasterEvent = new TM.TicketmasterEvent
//            {
//                Id = "TM123456",
//                Name = "The Rolling Stones - World Tour",
//                Url = "https://www.ticketmaster.com/event/123456",
//                Info = "An unforgettable night of rock and roll",
//                Dates = new TM.DateInfo
//                {
//                    Start = new TM.StartDate
//                    {
//                        DateTime = new DateTime(2025, 12, 15, 20, 0, 0),
//                        LocalDate = "2025-12-15",
//                        LocalTime = "20:00:00"
//                    },
//                    Timezone = "America/New_York"
//                },
//                Classifications = new List<TM.Classification>
//                {
//                    new TM.Classification
//                    {
//                        Segment = new TM.Genre { Name = "Music" },
//                        Genre = new TM.Genre { Name = "Rock" },
//                        SubGenre = new TM.Genre { Name = "Classic Rock" }
//                    }
//                },
//                PriceRanges = new List<TM.PriceRange>
//                {
//                    new TM.PriceRange
//                    {
//                        Type = "standard",
//                        Min = 75.00m,
//                        Max = 250.00m,
//                        Currency = "USD"
//                    }
//                },
//                Embedded = new TM.EventEmbedded
//                {
//                    Venues = new List<TM.Venue>
//                    {
//                        new TM.Venue
//                        {
//                            Id = "KovZpZAEAlaA",
//                            Name = "Madison Square Garden",
//                            City = new TM.City { Name = "New York" },
//                            Country = new TM.Country
//                            {
//                                Name = "United States Of America",
//                                CountryCode = "US"
//                            },
//                            Address = new TM.TicketmasterAddress
//                            {
//                                Line1 = "4 Pennsylvania Plaza"
//                            },
//                            Location = new TM.Location
//                            {
//                                Latitude = "40.750504",
//                                Longitude = "-73.993439"
//                            }
//                        }
//                    }
//                },
//                Images = new List<TM.EventImage>
//                {
//                    new TM.EventImage
//                    {
//                        Url = "https://example.com/image1.jpg",
//                        Width = 1024,
//                        Height = 683
//                    },
//                    new TM.EventImage
//                    {
//                        Url = "https://example.com/image2.jpg",
//                        Width = 640,
//                        Height = 427
//                    }
//                }
//            };

//            // Map the event
//            var result = mapper.Map(ticketmasterEvent);

//            // Display results
//            Console.WriteLine("=== MAPPING RESULTS ===");
//            Console.WriteLine($"Event Name: {result.Result.Name}");
//            Console.WriteLine($"Event Source: {result.Result.Source}");
//            Console.WriteLine($"External ID: {result.Result.ExternalId}");
//            Console.WriteLine($"Data Quality: {result.Result.DataQuality:P2}");
//            Console.WriteLine($"\nQuality Score: {result.Quality:P2} ({result.FilledFields}/{result.TotalFields} fields)");
//            Console.WriteLine($"\n=== TEMPORAL INFO ===");
//            Console.WriteLine($"Start Date: {result.Result.TemporalInfo?.StartDate}");
//            Console.WriteLine($"Timezone: {result.Result.TemporalInfo?.Timezone}");
//            Console.WriteLine($"\n=== VENUE INFO ===");
//            Console.WriteLine($"Venue: {result.Result.VenueInfo?.Name}");
//            Console.WriteLine($"City: {result.Result.GeographicInfo?.City}");
//            Console.WriteLine($"Country: {result.Result.GeographicInfo?.Country}");
//            Console.WriteLine($"Coordinates: {result.Result.GeographicInfo?.Coordinates?.Latitude}, {result.Result.GeographicInfo?.Coordinates?.Longitude}");
//            Console.WriteLine($"\n=== CATEGORIZATION ===");
//            Console.WriteLine($"Category: {result.Result.CategorizationInfo?.PrimaryCategory}");
//            Console.WriteLine($"Genre: {result.Result.CategorizationInfo?.Genre}");
//            Console.WriteLine($"\n=== PRICING ===");
//            Console.WriteLine($"Price Range: {result.Result.PricingInfo?.MinPrice} - {result.Result.PricingInfo?.MaxPrice} {result.Result.PricingInfo?.Currency}");
//            Console.WriteLine($"\n=== MEDIA ===");
//            Console.WriteLine($"Images: {result.Result.Media?.Count ?? 0}");
//        }

//        public void Example2_MinimalDataEvent()
//        {
//            var mapper = new TicketmasterMapper();

//            // Minimal event with only required fields
//            var minimalEvent = new TM.TicketmasterEvent
//            {
//                Id = "TM999",
//                Name = "Local Band Concert"
//                // No other data provided
//            };

//            var result = mapper.Map(minimalEvent);

//            Console.WriteLine("=== MINIMAL EVENT MAPPING ===");
//            Console.WriteLine($"Event Name: {result.Result.Name}");
//            Console.WriteLine($"Quality Score: {result.Quality:P2}");
//            Console.WriteLine($"Fields Filled: {result.FilledFields}/{result.TotalFields}");
//            Console.WriteLine($"This shows low quality due to missing data");
//        }

//        public void Example3_BulkMappingWithQualityFilter()
//        {
//            var mapper = new TicketmasterMapper();

//            // Simulate multiple events from API
//            var events = new List<TM.TicketmasterEvent>
//            {
//                CreateFullEvent("TM001", "Complete Event"),
//                CreateMinimalEvent("TM002", "Partial Event"),
//                CreateFullEvent("TM003", "Another Complete Event")
//            };

//            // Map with minimum quality threshold of 50%
//            var results = mapper.MapMany(events, minQuality: 0.5);

//            Console.WriteLine("=== BULK MAPPING RESULTS ===");
//            Console.WriteLine($"Total Events Processed: {events.Count}");
//            Console.WriteLine($"Events Meeting Quality Threshold: {results.Count}");
//            Console.WriteLine($"Average Quality: {results.Average(r => r.Quality):P2}");

//            Console.WriteLine($"\nEvent Details:");
//            foreach (var result in results)
//            {
//                Console.WriteLine($"  - {result.Result.Name}: {result.Quality:P2} quality");
//            }
//        }

//        public void Example4_UsingBulkQualityMapper()
//        {
//            var mapper = new TicketmasterMapper();
//            var bulkMapper = new BulkQualityMapper<TM.TicketmasterEvent, NormalizedEvent>(mapper.Mapper);

//            var events = new List<TM.TicketmasterEvent>
//            {
//                CreateFullEvent("TM001", "Complete Event"),
//                CreateMinimalEvent("TM002", "Partial Event"),
//                CreateFullEvent("TM003", "Another Complete Event")
//            };

//            var bulkResult = bulkMapper.MapMany(events, minQuality: 0.5);

//            Console.WriteLine("=== BULK QUALITY ANALYSIS ===");
//            Console.WriteLine($"Total Mapped: {bulkResult.TotalMapped}");
//            Console.WriteLine($"Average Quality: {bulkResult.AverageQuality:P2}");
//            Console.WriteLine($"Quality Range: {bulkResult.MinQuality:P2} - {bulkResult.MaxQuality:P2}");
//            Console.WriteLine($"\nQuality Distribution:");

//            foreach (var (qualityBucket, count) in bulkResult.QualityDistribution.OrderByDescending(kv => kv.Key))
//            {
//                var percentage = qualityBucket * 100;
//                var bar = new string('█', (int)(qualityBucket * 20));
//                Console.WriteLine($"  {percentage,3:F0}%: {bar} ({count} events)");
//            }
//        }

//        private TM.TicketmasterEvent CreateFullEvent(string id, string name)
//        {
//            return new TM.TicketmasterEvent
//            {
//                Id = id,
//                Name = name,
//                Url = $"https://ticketmaster.com/{id}",
//                Info = "Full event description",
//                Dates = new TM.DateInfo
//                {
//                    Start = new TM.StartDate { DateTime = DateTime.Now.AddDays(30) },
//                    Timezone = "America/New_York"
//                },
//                Classifications = new List<TM.Classification>
//                {
//                    new TM.Classification
//                    {
//                        Segment = new TM.Genre { Name = "Music" },
//                        Genre = new TM.Genre { Name = "Rock" }
//                    }
//                },
//                PriceRanges = new List<TM.PriceRange>
//                {
//                    new TM.PriceRange { Min = 50, Max = 150, Currency = "USD" }
//                },
//                Embedded = new TM.EventEmbedded
//                {
//                    Venues = new List<TM.Venue>
//                    {
//                        new TM.Venue
//                        {
//                            Id = "V001",
//                            Name = "Arena",
//                            City = new TM.City { Name = "New York" },
//                            Country = new TM.Country { Name = "USA", CountryCode = "US" },
//                            Location = new TM.Location { Latitude = "40.7", Longitude = "-74.0" }
//                        }
//                    }
//                },
//                Images = new List<TM.EventImage>
//                {
//                    new TM.EventImage { Url = "https://example.com/img.jpg", Width = 800, Height = 600 }
//                }
//            };
//        }

//        private TM.TicketmasterEvent CreateMinimalEvent(string id, string name)
//        {
//            return new TM.TicketmasterEvent
//            {
//                Id = id,
//                Name = name
//            };
//        }
//    }
//}
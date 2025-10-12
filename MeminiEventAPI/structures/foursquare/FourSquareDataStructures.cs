using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeminiEventAPI.structures.foursquare
{    public enum FoursquareCategory
    {
        Restaurant = 13065,
        Bar = 13003,
        CoffeeShop = 13032,
        Hotel = 13033,
        Landmark = 16000,
        Entertainment = 10000,
        Nightclub = 10032,
        FastFood = 13145,
        Bakery = 13002,
        Museum = 10027,
        Park = 16013,
        ShoppingMall = 17114
    }
    public class FoursquareApiRequest : IApiRequest
    {
        public string? Country { get; set; } = string.Empty;
        public string? CountryCode { get; set; } = string.Empty;
        public string? City { get; set; } = string.Empty;
        public string? Location { get; set; } // "latitude,longitude"
        public string? Radius { get; set; } // in meters (e.g., "5000")
        public int? SearchSize { get; set; } = 50; // limit parameter
        public string? Query { get; set; } = string.Empty; // search query
        public string? Categories { get; set; } = string.Empty; // comma-separated category IDs
        public string? SortBy { get; set; } = string.Empty;
    }
}

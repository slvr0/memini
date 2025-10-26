using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeminiEventAPI.structures.foursquare
{ 
    public class FoursquareApiRequest : IApiRequest
    {
        public string? Country { get; set; } = string.Empty;
        public string? CountryCode { get; set; } = string.Empty;
        public string? City { get; set; } = string.Empty;
        public string? Location { get; set; } // "latitude,longitude"
        public string? Radius { get; set; } // in meters (e.g., "5000")
        public int? SearchSize { get; set; } = 50; // limit parameter
        public string? Query { get; set; } = string.Empty; // search query
        public int? Offset { get; set; }
        public FoursquareCategory Categories { get; set; }
        public string? SortBy { get; set; } = string.Empty;
    }
}

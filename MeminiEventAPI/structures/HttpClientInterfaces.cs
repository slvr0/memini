using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeminiEventAPI.structures;

public class HttpConnectionResponse : EventArgs
{
    public string Source { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public int StatusCode { get; set; } 
    
    public Exception? Exception { get; set; }
    public string ErrorMessage { get; set; } = string.Empty;
}

public class ApiFetchMetrics : EventArgs
{
    public int EventCount { get; set; }
    public long ResponseSizeBytes { get; set; }
    public Exception? Exception { get; set; }
    public string ErrorMessage { get; set; } = string.Empty;
}

public class TicketmasterRequestConfiguration : IRequestConfiguration
{
    public string? City { get; set; }
    public string? CountryCode { get; set; }
    public int SearchSize { get; set; } = 20;
}

public class PredictHqRequestConfiguration : IRequestConfiguration
{
    public string? Location { get; set; } // Format: "latitude,longitude" e.g. "40.7128,-74.0060"
    public string? Radius { get; set; } // Format: "{value}{unit}" e.g. "10mi", "5km"
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Category { get; set; }
    public string? Country { get; set; } // 2-letter country code e.g. "US"
    public string? Query { get; set; } // Full-text search
    public int? PageSize { get; set; }
    public int? Page { get; set; }

    // PredictHQ specific properties
    public string? State { get; set; } // "active", "predicted", "cancelled", "postponed"
    public bool? BrandSafe { get; set; } // true to exclude brand-unsafe events
    public string? Labels { get; set; } // Comma-separated PHQ labels
    public int? MinRank { get; set; } // 0-100
    public int? MaxRank { get; set; } // 0-100
    public string? SortBy { get; set; } // "rank", "-rank", "start", "-start", etc.
}


public class MeminiEventApiRequest
{
    /* Search geographically filters */
    public string? Country { get; set; } = string.Empty;
    public string? CountryCode { get; set; } = string.Empty;
    public string? City { get; set; } = string.Empty;
    public string? CityCode { get; set; } = string.Empty;
    public string? Location { get; set; } = string.Empty;// Format: "latitude,longitude" e.g. "40.7128,-74.0060"
    public string? Radius { get; set; } = string.Empty; // Format: "{value}{unit}" e.g. "10mi", "5km"

    /* Search chronologically filter */
    public DateTime? StartDate { get; set; } = null;
    public DateTime? EndDate { get; set; } = null;

    /* Search categorical / Type / Preference filter */
    public string? State { get; set; } = string.Empty;// "active", "predicted", "cancelled", "postponed"
    public string? Category { get; set; } = string.Empty;
    public string? Labels { get; set; } = string.Empty;

    /* Result control , Pageination / Max searchs , Sort by */
    public int? SearchSize { get; set; } = null;
    public int? PageSize { get; set; } = null;
    public int? PageOffset { get; set; } = null;
    public string? SortBy { get; set; } = null;// "rank", "-rank", "start", "-start", etc.

    public string? SortBySeatGeek { get; set; } = null;
    


}


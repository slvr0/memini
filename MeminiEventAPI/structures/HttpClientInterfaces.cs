using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeminiEventAPI.api_datamodels;

namespace MeminiEventAPI.structures;

/* Final endpoint data response */
public class MeminiApiResponse
{
    public Dictionary<string, IApiResult> ApiResults = new Dictionary<string, IApiResult>();
}

public interface IApiResult
{
    public string AdapterId { get; set; }
}

public class EventsApiResult : IApiResult
{
    public string AdapterId { get; set; } = string.Empty;
    public List<MappingResult<NormalizedEvent>>? Events { get; set; }
    public int TotalFetched { get; set; }
    public int TotalMapped { get; set; }
    public EventsApiResult(string adapterId, List<MappingResult<NormalizedEvent>>? events, int totalFetched, int totalMapped)
    {
        AdapterId = adapterId;
        Events = events;
        TotalFetched = totalFetched;
        TotalMapped = totalMapped;
    }
}
public class PlacesApiResult : IApiResult
{
    public string AdapterId { get; set; } = string.Empty;
    public List<MappingResult<NormalizedPlace>>? Places { get; set; }
    public int TotalFetched { get; set; }
    public int TotalMapped { get; set; }

    public PlacesApiResult(string adapterId, List<MappingResult<NormalizedPlace>>? places, int totalFetched, int totalMapped)
    {
        AdapterId = adapterId;
        Places = places;
        TotalFetched = totalFetched;
        TotalMapped = totalMapped;
    }
}

public class NewsApiResult : IApiResult
{
    public string AdapterId { get; set; } = string.Empty;
    public List<MappingResult<NormalizedNews>>? News { get; set; }
    public int TotalFetched { get; set; }
    public int TotalMapped { get; set; }

    public NewsApiResult(string adapterId, List<MappingResult<NormalizedNews>>? news, int totalFetched, int totalMapped)
    {
        AdapterId = adapterId;
        News = news;
        TotalFetched = totalFetched;
        TotalMapped = totalMapped;
    }
}

public class WeatherApiResult : IApiResult
{
    public string AdapterId { get; set; } = string.Empty;
    public List<MappingResult<NormalizedWeather>>? Weathers { get; set; }
    public int TotalFetched { get; set; }
    public int TotalMapped { get; set; }

    public WeatherApiResult(string adapterId, List<MappingResult<NormalizedWeather>>? weathers, int totalFetched, int totalMapped)
    {
        AdapterId = adapterId;
        Weathers = weathers;
        TotalFetched = totalFetched;
        TotalMapped = totalMapped;
    }
}

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

public class MeminiEventApiRequest : IApiRequest
{
    /* Search geographically filters */
    public string? Country { get; set; } = string.Empty;
    public string? CountryCode { get; set; } = string.Empty;
    public string? City { get; set; } = string.Empty;
    public string? CityCode { get; set; } = string.Empty;
    public string? Location { get; set; } = string.Empty;// Format: "latitude,longitude" e.g. "40.7128,-74.0060"
    public string? Radius { get; set; } = string.Empty; // Format: "{value}{unit}" e.g. "10mi", "5km"

    public string? Unit { get; set; } = string.Empty;
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
    public int? PageNumber { get;set; } = null;
    public int? PageOffset { get; set; } = null;
    public string? SortBy { get; set; } = null;// "rank", "-rank", "start", "-start", etc.

    public string? SortBySeatGeek { get; set; } = null;
}



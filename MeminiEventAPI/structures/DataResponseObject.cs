using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeminiEventAPI.api_datamodels;
using MeminiEventAPI.mapping;

namespace MeminiEventAPI.structures
{
    /// </summary>
    //public class UnifiedFetchResult
    //{
    //    /// <summary>
    //    /// All normalized events from all sources in a single array
    //    /// </summary>
    //    public List<NormalizedEvent> UnifiedEvents { get; set; } = new();

    //    /// <summary>
    //    /// Individual bulk results by source
    //    /// </summary>
    //    public Dictionary<string, BulkMappingResult> ResultsBySource { get; set; } = new();

    //    /// <summary>
    //    /// Total number of unified events
    //    /// </summary>
    //    public int TotalEvents { get; set; }

    //    /// <summary>
    //    /// Total events processed across all sources
    //    /// </summary>
    //    public int TotalProcessed { get; set; }

    //    /// <summary>
    //    /// Overall average quality across all events
    //    /// </summary>
    //    public double OverallAverageQuality { get; set; }

    //    /// <summary>
    //    /// When the fetch operation started
    //    /// </summary>
    //    public DateTime StartTime { get; set; }

    //    /// <summary>
    //    /// When the fetch operation completed
    //    /// </summary>
    //    public DateTime EndTime { get; set; }

    //    /// <summary>
    //    /// Total duration
    //    /// </summary>
    //    public TimeSpan Duration => EndTime - StartTime;

    //    /// <summary>
    //    /// HTTP connection information
    //    /// </summary>
    //    public Dictionary<string, HttpConnectionResponse> HttpConnectionResponses { get; set; } = new();

    //    /// <summary>
    //    /// Fetch metrics per adapter
    //    /// </summary>
    //    public Dictionary<string, ApiFetchMetrics> FetchMetrics { get; set; } = new();

    //    /// <summary>
    //    /// Whether an error occurred
    //    /// </summary>
    //    public bool HasError { get; set; }

    //    /// <summary>
    //    /// Error message if any
    //    /// </summary>
    //    public string? ErrorMessage { get; set; }


    //}
}

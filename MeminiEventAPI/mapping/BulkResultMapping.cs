using System;
using System.Collections.Generic;
using System.Linq;
using MeminiEventAPI.api_datamodels;


namespace MeminiEventAPI.mapping;

/// <summary>
/// Result container for bulk event mapping operations with quality statistics
/// </summary>
public class BulkMappingResult
{
    /// <summary>
    /// Successfully mapped events that met the quality threshold
    /// </summary>
    public List<NormalizedEvent> Events { get; set; } = new();

    /// <summary>
    /// Total number of events processed
    /// </summary>
    public int TotalProcessed { get; set; }

    /// <summary>
    /// Number of events successfully mapped and meeting quality threshold
    /// </summary>
    public int TotalMapped { get; set; }

    /// <summary>
    /// Number of events that failed mapping or didn't meet quality threshold
    /// </summary>
    public int TotalFiltered { get; set; }

    /// <summary>
    /// Average data quality across all mapped events
    /// </summary>
    public double AverageQuality { get; set; }

    /// <summary>
    /// Minimum quality score among mapped events
    /// </summary>
    public double MinQuality { get; set; }

    /// <summary>
    /// Maximum quality score among mapped events
    /// </summary>
    public double MaxQuality { get; set; }

    /// <summary>
    /// Quality distribution grouped by 10% buckets (0.0-0.1, 0.1-0.2, etc.)
    /// </summary>
    public Dictionary<double, int> QualityDistribution { get; set; } = new();

    /// <summary>
    /// Number of events from each source
    /// </summary>
    public Dictionary<EventSource, int> EventsBySource { get; set; } = new();

    /// <summary>
    /// Average quality by source
    /// </summary>
    public Dictionary<EventSource, double> AverageQualityBySource { get; set; } = new();

    /// <summary>
    /// Timestamp when bulk mapping started
    /// </summary>
    public DateTime StartTime { get; set; }

    /// <summary>
    /// Timestamp when bulk mapping completed
    /// </summary>
    public DateTime EndTime { get; set; }

    /// <summary>
    /// Total duration of the bulk mapping operation
    /// </summary>
    public TimeSpan Duration => EndTime - StartTime;

    /// <summary>
    /// Events processed per second
    /// </summary>
    public double EventsPerSecond => Duration.TotalSeconds > 0
        ? TotalProcessed / Duration.TotalSeconds
        : 0;
}

/// <summary>
/// Builder for creating bulk mapping results with statistics
/// </summary>
public class BulkMappingResultBuilder
{
    private readonly List<MappingResult<NormalizedEvent>> _mappingResults = new();
    private readonly DateTime _startTime;
    private int _totalProcessed;

    public BulkMappingResultBuilder()
    {
        _startTime = DateTime.UtcNow;
    }

    /// <summary>
    /// Add a mapping result to the bulk operation
    /// </summary>
    public void AddResult(MappingResult<NormalizedEvent> result, bool meetsQualityThreshold)
    {
        _totalProcessed++;
        if (meetsQualityThreshold && result.Result != null)
        {
            _mappingResults.Add(result);
        }
    }

    /// <summary>
    /// Build the final bulk mapping result with all statistics
    /// </summary>
    public BulkMappingResult Build()
    {
        var endTime = DateTime.UtcNow;
        var events = _mappingResults.Select(r => r.Result).ToList();

        var result = new BulkMappingResult
        {
            Events = events,
            TotalProcessed = _totalProcessed,
            TotalMapped = events.Count,
            TotalFiltered = _totalProcessed - events.Count,
            StartTime = _startTime,
            EndTime = endTime
        };

        if (_mappingResults.Any())
        {
            // Quality statistics
            var qualities = _mappingResults.Select(r => r.Quality).ToList();
            result.AverageQuality = qualities.Average();
            result.MinQuality = qualities.Min();
            result.MaxQuality = qualities.Max();

            // Quality distribution (buckets of 10%)
            result.QualityDistribution = _mappingResults
                .GroupBy(r => Math.Floor(r.Quality * 10) / 10)
                .ToDictionary(g => g.Key, g => g.Count());

            // Events by source
            result.EventsBySource = events
                .Where(e => e.Source.HasValue)
                .GroupBy(e => e.Source!.Value)
                .ToDictionary(g => g.Key, g => g.Count());

            // Average quality by source
            result.AverageQualityBySource = events
                .Where(e => e.Source.HasValue && e.DataQuality.HasValue)
                .GroupBy(e => e.Source!.Value)
                .ToDictionary(
                    g => g.Key,
                    g => g.Average(e => e.DataQuality!.Value)
                );
        }

        return result;
    }
}

/// <summary>
/// Helper class for bulk mapping operations across multiple API sources
/// </summary>
public static class BulkMappingHelper
{
    public static async Task<BulkMappingResult> MapEventsAsync<TSource>(
        IEnumerable<TSource> sources,
        Func<TSource, Task<MappingResult<NormalizedEvent>>> mapFunctionAsync,
        double minQuality = 0.0)
    {
        var builder = new BulkMappingResultBuilder();
        var tasks = new List<Task<(MappingResult<NormalizedEvent>? result, bool success)>>();

        foreach (var source in sources)
        {
            tasks.Add(MapSingleItemAsync(source, mapFunctionAsync, minQuality));
        }

        var results = await Task.WhenAll(tasks);  // ← Process all in parallel

        foreach (var (result, success) in results)
        {
            if (result != null)
            {
                builder.AddResult(result, success);
            }
        }

        return builder.Build();
    }

    private static async Task<(MappingResult<NormalizedEvent>? result, bool success)> MapSingleItemAsync<TSource>(
        TSource source,
        Func<TSource, Task<MappingResult<NormalizedEvent>>> mapFunctionAsync,
        double minQuality)
    {
        try
        {
            var result = await mapFunctionAsync(source);
            var meetsThreshold = result.Quality >= minQuality;
            return (result, meetsThreshold);
        }
        catch
        {
            return (new MappingResult<NormalizedEvent>
            {
                Result = null,
                Quality = 0,
                TotalFields = 0,
                FilledFields = 0
            }, false);
        }
    }

    /// <summary>
    /// Map multiple events from any source with quality filtering
    /// </summary>
    public static BulkMappingResult MapEvents<TSource>(
        IEnumerable<TSource> sources,
        Func<TSource, MappingResult<NormalizedEvent>> mapFunction,
        double minQuality = 0.0)
    {
        var builder = new BulkMappingResultBuilder();

        foreach (var source in sources)
        {
            try
            {
                var result = mapFunction(source);
                var meetsThreshold = result.Quality >= minQuality;
                builder.AddResult(result, meetsThreshold);
            }
            catch
            {
                builder.AddResult(new MappingResult<NormalizedEvent>
                {
                    Result = null,
                    Quality = 0,
                    TotalFields = 0,
                    FilledFields = 0
                }, false);
            }
        }

        return builder.Build();
    }

    // ✅ ASYNC VERSION - SAME SIGNATURE AS SYNC
    public static Task<BulkMappingResult> MapEventsAsync<TSource>(
        IEnumerable<TSource> sources,
        Func<TSource, MappingResult<NormalizedEvent>> mapFunction,  // ✅ Same signature!
        double minQuality = 0.0)
    {
        // Wrap the entire sync logic in Task.Run
        return Task.Run(() =>
        {
            var builder = new BulkMappingResultBuilder();

            foreach (var source in sources)
            {
                try
                {
                    var result = mapFunction(source);
                    var meetsThreshold = result.Quality >= minQuality;
                    builder.AddResult(result, meetsThreshold);
                }
                catch
                {
                    builder.AddResult(new MappingResult<NormalizedEvent>
                    {
                        Result = null,
                        Quality = 0,
                        TotalFields = 0,
                        FilledFields = 0
                    }, false);
                }
            }

            return builder.Build();
        });
    }
}

/// <summary>
/// Extension methods for formatting bulk mapping results
/// </summary>
public static class BulkMappingResultExtensions
{
    /// <summary>
    /// Get a formatted summary string of the bulk mapping results
    /// </summary>
    public static string GetSummary(this BulkMappingResult result)
    {
        var summary = $@"
=== BULK MAPPING SUMMARY ===
Total Processed: {result.TotalProcessed}
Successfully Mapped: {result.TotalMapped}
Filtered Out: {result.TotalFiltered}

Quality Statistics:
  Average: {result.AverageQuality:P2}
  Min: {result.MinQuality:P2}
  Max: {result.MaxQuality:P2}

Performance:
  Duration: {result.Duration.TotalSeconds:F2}s
  Events/Second: {result.EventsPerSecond:F2}

Sources:
{GetSourceBreakdown(result)}

Quality Distribution:
{GetQualityDistribution(result)}
";
        return summary;
    }

    private static string GetSourceBreakdown(BulkMappingResult result)
    {
        if (!result.EventsBySource.Any())
            return "  No source data available";

        var lines = result.EventsBySource
            .OrderByDescending(kv => kv.Value)
            .Select(kv =>
            {
                var avgQuality = result.AverageQualityBySource.ContainsKey(kv.Key)
                    ? $"{result.AverageQualityBySource[kv.Key]:P2}"
                    : "N/A";
                return $"  {kv.Key}: {kv.Value} events (avg quality: {avgQuality})";
            });

        return string.Join("\n", lines);
    }

    private static string GetQualityDistribution(BulkMappingResult result)
    {
        if (!result.QualityDistribution.Any())
            return "  No distribution data available";

        var lines = result.QualityDistribution
            .OrderByDescending(kv => kv.Key)
            .Select(kv =>
            {
                var percentage = kv.Key * 100;
                var bar = new string('█', Math.Min(kv.Value, 50));
                return $"  {percentage,3:F0}%-{percentage + 10,3:F0}%: {bar} ({kv.Value})";
            });

        return string.Join("\n", lines);
    }

    /// <summary>
    /// Filter events by minimum quality
    /// </summary>
    public static BulkMappingResult FilterByQuality(this BulkMappingResult result, double minQuality)
    {
        var filteredEvents = result.Events
            .Where(e => e.DataQuality >= minQuality)
            .ToList();

        var newResult = new BulkMappingResult
        {
            Events = filteredEvents,
            TotalProcessed = result.TotalProcessed,
            TotalMapped = filteredEvents.Count,
            TotalFiltered = result.TotalProcessed - filteredEvents.Count,
            StartTime = result.StartTime,
            EndTime = result.EndTime
        };

        if (filteredEvents.Any())
        {
            var qualities = filteredEvents.Select(e => e.DataQuality ?? 0).ToList();
            newResult.AverageQuality = qualities.Average();
            newResult.MinQuality = qualities.Min();
            newResult.MaxQuality = qualities.Max();
        }

        return newResult;
    }

    /// <summary>
    /// Group events by source
    /// </summary>
    public static Dictionary<EventSource, List<NormalizedEvent>> GroupBySource(this BulkMappingResult result)
    {
        return result.Events
            .Where(e => e.Source.HasValue)
            .GroupBy(e => e.Source!.Value)
            .ToDictionary(g => g.Key, g => g.ToList());
    }

    /// <summary>
    /// Get top N highest quality events
    /// </summary>
    public static List<NormalizedEvent> GetTopQualityEvents(this BulkMappingResult result, int count)
    {
        return result.Events
            .OrderByDescending(e => e.DataQuality)
            .Take(count)
            .ToList();
    }
}
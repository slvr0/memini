using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using FuzzySharp;

namespace Memini.validators;
public static class DbDeduplicationMethods
{
    /// <summary>
    /// Optimized version: Pre-filter DB query before fuzzy comparison
    /// 
    /// Example 
    /// 
    ///         var eventsToInsert = await _context.Events.GetItemsToInsertOptimized(
    //  newEvents,
    //    e => e.Name,
    //    e => e.City == "Stockholm" && 
    //         e.EventDate >= startDate && 
    //         e.EventDate <= endDate,  // Pre-filter DB query
    //    similarityThreshold: 90
    //);
    /// </summary>
    public static async Task<IEnumerable<T>> GetItemsToInsertOptimized<T>(
        this DbSet<T> dbSet,
        IEnumerable<T> newItems,
        Func<T, string> fieldSelector,
        Expression<Func<T, bool>> preFilter,
        int similarityThreshold = 85) where T : class   {        

        //prefilter db set on pred
        var existingItems = await dbSet.Where(preFilter).ToListAsync();

        var itemsToInsert = new List<T>();

        foreach (var newItem in newItems)
        {
            var newValue = fieldSelector(newItem);

            if (string.IsNullOrWhiteSpace(newValue))
                continue;

            bool existsInDb = existingItems.Any(existing =>
            {
                var existingValue = fieldSelector(existing);
                if (string.IsNullOrWhiteSpace(existingValue))
                    return false;

                return Fuzz.TokenSetRatio(newValue, existingValue) >= similarityThreshold;
            });

            if (!existsInDb)
                itemsToInsert.Add(newItem);
        }

        return itemsToInsert;
    }


    /// <summary>
    /// Returns only items that don't exist in DB based on fuzzy comparison
    /// </summary>
    public static async Task<IEnumerable<T>> GetItemsToInsert<T>(
        this DbSet<T> dbSet,
        IEnumerable<T> newItems,
        Func<T, string> fieldSelector,
        int similarityThreshold = 85,
        SimilarityAlgorithm algorithm = SimilarityAlgorithm.TokenSetRatio) where T : class
    {
        // Fetch existing items from DB
        var existingItems = await dbSet.ToListAsync();

        var itemsToInsert = new List<T>();

        foreach (var newItem in newItems)
        {
            var newValue = fieldSelector(newItem);

            if (string.IsNullOrWhiteSpace(newValue))
                continue;

            // Check if similar item exists
            bool existsInDb = existingItems.Any(existing =>
            {
                var existingValue = fieldSelector(existing);
                if (string.IsNullOrWhiteSpace(existingValue))
                    return false;

                var similarity = algorithm switch
                {
                    SimilarityAlgorithm.Ratio => Fuzz.Ratio(newValue, existingValue),
                    SimilarityAlgorithm.PartialRatio => Fuzz.PartialRatio(newValue, existingValue),
                    SimilarityAlgorithm.TokenSetRatio => Fuzz.TokenSetRatio(newValue, existingValue),
                    SimilarityAlgorithm.TokenSortRatio => Fuzz.TokenSortRatio(newValue, existingValue),
                    SimilarityAlgorithm.WeightedRatio => Fuzz.WeightedRatio(newValue, existingValue),
                    _ => Fuzz.Ratio(newValue, existingValue)
                };

                return similarity >= similarityThreshold;
            });

            if (!existsInDb)
                itemsToInsert.Add(newItem);
        }

        return itemsToInsert;
    }

    /// <summary>
    /// Compare on multiple fields (e.g., Name AND Date)
    /// </summary>
    public static async Task<IEnumerable<T>> GetItemsToInsertMultiField<T>(
        this DbSet<T> dbSet,
        IEnumerable<T> newItems,
        Func<T, string> stringFieldSelector,
        Func<T, DateTime?> dateFieldSelector,
        int similarityThreshold = 85,
        int dateDifferenceThresholdDays = 1) where T : class
    {
        var existingItems = await dbSet.ToListAsync();

        var itemsToInsert = new List<T>();

        foreach (var newItem in newItems)
        {
            var newName = stringFieldSelector(newItem);
            var newDate = dateFieldSelector(newItem);

            if (string.IsNullOrWhiteSpace(newName))
                continue;

            bool existsInDb = existingItems.Any(existing =>
            {
                var existingName = stringFieldSelector(existing);
                var existingDate = dateFieldSelector(existing);

                if (string.IsNullOrWhiteSpace(existingName))
                    return false;

                // Check name similarity
                var nameSimilarity = Fuzz.TokenSetRatio(newName, existingName);
                if (nameSimilarity < similarityThreshold)
                    return false;

                // Check date proximity (if both have dates)
                if (newDate.HasValue && existingDate.HasValue)
                {
                    var dateDifference = Math.Abs((newDate.Value - existingDate.Value).TotalDays);
                    return dateDifference <= dateDifferenceThresholdDays;
                }

                // If only comparing names (no dates), name match is enough
                return true;
            });

            if (!existsInDb)
                itemsToInsert.Add(newItem);
        }

        return itemsToInsert;
    }

    /// <summary>
    /// Flexible composite field comparison with custom predicate
    /// </summary>
    public static async Task<IEnumerable<T>> GetItemsToInsertCustom<T>(
        this DbSet<T> dbSet,
        IEnumerable<T> newItems,
        Func<T, T, bool> areSimilar) where T : class
    {
        var existingItems = await dbSet.ToListAsync();

        return newItems.Where(newItem =>
            !existingItems.Any(existing => areSimilar(newItem, existing))
        );
    }
}

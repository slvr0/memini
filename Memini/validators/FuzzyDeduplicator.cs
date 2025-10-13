using FuzzySharp;
using MoreLinq;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Memini.validators;
public static class FuzzyDeduplicator
{
    /// <summary>
    /// Reduces collection by fuzzy comparing fields and keeping highest quality items
    /// </summary>
    public static IEnumerable<T> ReduceCompare<T>(
        this IEnumerable<T> source,
        Func<T, string> fieldSelector,
        Func<T, double> qualitySelector,
        Func<string, string, bool> areSimilar)
    {
        return source
            .GroupBy(item => item, new SimilarityComparer<T>(fieldSelector, areSimilar))
            .Select(group => group.OrderByDescending(qualitySelector).First());
    }

    /// <summary>
    /// Overload with threshold-based similarity
    /// </summary>
    public static IEnumerable<T> ReduceCompare<T>(
        this IEnumerable<T> source,
        Func<T, string> fieldSelector,
        Func<T, double> qualitySelector,
        int similarityThreshold = 85,
        SimilarityAlgorithm algorithm = SimilarityAlgorithm.TokenSetRatio)
    {
        Func<string, string, bool> predicate = (s1, s2) =>
        {
            var similarity = algorithm switch
            {
                SimilarityAlgorithm.Ratio => Fuzz.Ratio(s1, s2),
                SimilarityAlgorithm.PartialRatio => Fuzz.PartialRatio(s1, s2),
                SimilarityAlgorithm.TokenSetRatio => Fuzz.TokenSetRatio(s1, s2),
                SimilarityAlgorithm.TokenSortRatio => Fuzz.TokenSortRatio(s1, s2),
                SimilarityAlgorithm.WeightedRatio => Fuzz.WeightedRatio(s1, s2),
                _ => Fuzz.Ratio(s1, s2)
            };
            return similarity >= similarityThreshold;
        };

        return ReduceCompare(source, fieldSelector, qualitySelector, predicate);
    }
}

public enum SimilarityAlgorithm
{
    Ratio,              // Basic Levenshtein
    PartialRatio,       // Best matching substring
    TokenSetRatio,      // Ignores word order (best for general text)
    TokenSortRatio,     // Sorts tokens before comparing
    WeightedRatio       // Combination approach
}
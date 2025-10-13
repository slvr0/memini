using System;
using System.Collections.Generic;

namespace Memini.validators;
public class SimilarityComparer<T> : IEqualityComparer<T>
{
    private readonly Func<T, string> _fieldSelector;
    private readonly Func<string, string, bool> _areSimilar;

    public SimilarityComparer(Func<T, string> fieldSelector, Func<string, string, bool> areSimilar)
    {
        _fieldSelector = fieldSelector;
        _areSimilar = areSimilar;
    }

    public bool Equals(T x, T y)
    {
        if (x == null || y == null) return false;

        var val1 = _fieldSelector(x);
        var val2 = _fieldSelector(y);

        if (string.IsNullOrWhiteSpace(val1) || string.IsNullOrWhiteSpace(val2))
            return false;

        return _areSimilar(val1, val2);
    }

    public int GetHashCode(T obj) => 0; // Force all items to same bucket for comparison
}
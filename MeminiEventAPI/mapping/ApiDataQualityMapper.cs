using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using MeminiEventAPI.api_datamodels;


namespace MeminiEventAPI.mapping;

/// <summary>
/// Custom fluent mapper with built-in quality tracking (no AutoMapper dependency)
/// </summary>
public class FluentQualityMapper<TSource, TDestination> where TDestination : new()
{
    private readonly List<MappingRule<TSource, TDestination>> _rules = new();

    public class MappingRule<TSrc, TDest>
    {
        public string SourcePropertyName { get; set; }
        public string DestPropertyName { get; set; }
        public Func<TSrc, object> Getter { get; set; }
        public Action<TDest, object> Setter { get; set; }
        public Func<object, object> Converter { get; set; }
        public bool TrackQuality { get; set; }
    }

    /// <summary>
    /// Map a field with optional conversion and quality tracking
    /// Usage: mapper.Map(s => s.SourceField, d => d.DestField, (value) => Convert(value), trackQuality: true)
    /// </summary>
    public FluentQualityMapper<TSource, TDestination> Map<TSourceProp, TDestProp>(
        Expression<Func<TSource, TSourceProp>> sourceExpression,
        Expression<Func<TDestination, TDestProp>> destExpression,
        Func<TSourceProp, TDestProp> converter = null,
        bool trackQuality = true)
    {
        var sourceGetter = sourceExpression.Compile();
        var destSetter = CreateSetter(destExpression);

        _rules.Add(new MappingRule<TSource, TDestination>
        {
            SourcePropertyName = GetMemberName(sourceExpression),
            DestPropertyName = GetMemberName(destExpression),
            Getter = src => sourceGetter(src),
            Setter = (dest, value) => destSetter(dest, (TDestProp)value),
            Converter = converter != null
                ? (value) => converter((TSourceProp)value)
                : (value) => value,
            TrackQuality = trackQuality
        });

        return this;
    }

    /// <summary>
    /// Execute mapping with quality calculation
    /// </summary>
    public MappingResult<TDestination> Execute(TSource source)
    {
        var destination = new TDestination();
        int totalFields = 0;
        int filledFields = 0;

        foreach (var rule in _rules)
        {
            try
            {
                var sourceValue = rule.Getter(source);
                var convertedValue = rule.Converter?.Invoke(sourceValue) ?? sourceValue;

                if (rule.TrackQuality)
                {
                    totalFields++;
                    if (IsFieldFilled(convertedValue))
                    {
                        filledFields++;
                        rule.Setter(destination, convertedValue);
                    }
                }
                else
                {
                    rule.Setter(destination, convertedValue);
                }
            }
            catch
            {
                // Mapping failed, skip this field
                if (rule.TrackQuality)
                    totalFields++;
            }
        }

        return new MappingResult<TDestination>
        {
            Result = destination,
            Quality = totalFields > 0 ? (double)filledFields / totalFields : 0.0,
            TotalFields = totalFields,
            FilledFields = filledFields
        };
    }

    private Action<TDestination, TProp> CreateSetter<TProp>(Expression<Func<TDestination, TProp>> expression)
    {
        var memberExpr = expression.Body as MemberExpression;
        if (memberExpr == null)
            throw new ArgumentException("Expression must be a member expression");

        var property = memberExpr.Member as System.Reflection.PropertyInfo;
        if (property == null)
            throw new ArgumentException("Expression must be a property");

        return (dest, value) => property.SetValue(dest, value);
    }

    private string GetMemberName<T, TProp>(Expression<Func<T, TProp>> expression)
    {
        // Handle case where expression is just the parameter itself (e.g., s => s)
        if (expression.Body is ParameterExpression)
            return "$self";

        if (expression.Body is MemberExpression member)
            return member.Member.Name;

        throw new ArgumentException("Expression must be a member expression or parameter expression");
    }

    private bool IsFieldFilled(object value)
    {
        if (value == null) return false;
        if (value is string str) return !string.IsNullOrWhiteSpace(str);
        if (value is DateTime dt) return dt != default;

        // For complex objects, consider them filled if not null
        return true;
    }
}

public class MappingResult<T>
{
    public T Result { get; set; }
    public double Quality { get; set; }
    public int TotalFields { get; set; }
    public int FilledFields { get; set; }
}

//// ==================== EXAMPLE USAGE ====================

//public class AutoMapperExample
//{
//    public void Example1_FluentQualityMapper()
//    {
//        // Create mapper
//        var mapper = new FluentQualityMapper<TicketmasterEvent, NormalizedEvent>()
//            .Map(s => s.Id, d => d.ExternalId, trackQuality: true)
//            .Map(s => s.Name, d => d.Name, trackQuality: true)
//            .Map(s => s.Url, d => d.Url, trackQuality: true)
//            .Map(
//                s => s.Dates.Start.DateTime,
//                d => d.TemporalInfo.StartDate,
//                converter: dt => dt,
//                trackQuality: true
//            );

//        // Execute mapping
//        var ticketmasterEvent = new TicketmasterEvent { Id = "123", Name = "Concert" };
//        var result = mapper.Execute(ticketmasterEvent);

//        Console.WriteLine($"Mapped Event: {result.Result.Name}");
//        Console.WriteLine($"Quality: {result.Quality:P2}");
//        Console.WriteLine($"Fields: {result.FilledFields}/{result.TotalFields}");
//    }

//    public void Example2_ConfigureTicketmasterMapper()
//    {
//        var mapper = new FluentQualityMapper<TicketmasterEvent, NormalizedEvent>();

//        // Basic fields
//        mapper.Map(s => s.Id, d => d.ExternalId,
//            converter: id => id?.Trim(),
//            trackQuality: true);

//        mapper.Map(s => s.Name, d => d.Name,
//            trackQuality: true);

//        mapper.Map(s => s.Url, d => d.Url,
//            trackQuality: true);

//        mapper.Map(s => s.Info, d => d.Description,
//            trackQuality: true);

//        // Execute
//        var source = new TicketmasterEvent
//        {
//            Id = "TM001",
//            Name = "Concert",
//            Url = "https://example.com"
//        };

//        var result = mapper.Execute(source);

//        Console.WriteLine($"Quality Score: {result.Quality:P2}");
//    }
//}

//// ==================== ADVANCED PROFILE-BASED MAPPER ====================

///// <summary>
///// Profile-based mapper similar to AutoMapper profiles
///// </summary>
//public abstract class QualityMappingProfile<TSource, TDestination>
//    where TDestination : new()
//{
//    protected FluentQualityMapper<TSource, TDestination> Mapper { get; }

//    protected QualityMappingProfile()
//    {
//        Mapper = new FluentQualityMapper<TSource, TDestination>();
//        Configure();
//    }

//    protected abstract void Configure();

//    public MappingResult<TDestination> Map(TSource source)
//    {
//        return Mapper.Execute(source);
//    }
//}

//// Example profile
//public class TicketmasterToNormalizedProfile : QualityMappingProfile<TicketmasterEvent, NormalizedEvent>
//{
//    protected override void Configure()
//    {
//        // Configure all mappings in one place
//        Mapper
//            .Map(s => s.Id, d => d.ExternalId, trackQuality: true)
//            .Map(s => s.Name, d => d.Name, trackQuality: true)
//            .Map(s => s.Url, d => d.Url, trackQuality: true)
//            .Map(s => s.Info, d => d.Description, trackQuality: true);
//    }
//}

//// ==================== BULK MAPPER WITH QUALITY STATISTICS ====================

//public class BulkQualityMapper<TSource, TDestination>
//    where TDestination : new()
//{
//    private readonly FluentQualityMapper<TSource, TDestination> _mapper;

//    public BulkQualityMapper(FluentQualityMapper<TSource, TDestination> mapper)
//    {
//        _mapper = mapper;
//    }

//    public BulkMappingResult<TDestination> MapMany(IEnumerable<TSource> sources, double minQuality = 0.0)
//    {
//        var results = new List<MappingResult<TDestination>>();

//        foreach (var source in sources)
//        {
//            var result = _mapper.Execute(source);
//            if (result.Quality >= minQuality)
//            {
//                results.Add(result);
//            }
//        }

//        return new BulkMappingResult<TDestination>
//        {
//            Results = results.Select(r => r.Result).ToList(),
//            AverageQuality = results.Any() ? results.Average(r => r.Quality) : 0.0,
//            MinQuality = results.Any() ? results.Min(r => r.Quality) : 0.0,
//            MaxQuality = results.Any() ? results.Max(r => r.Quality) : 0.0,
//            TotalMapped = results.Count,
//            QualityDistribution = results
//                .GroupBy(r => Math.Floor(r.Quality * 10) / 10)
//                .ToDictionary(g => g.Key, g => g.Count())
//        };
//    }
//}

//public class BulkMappingResult<T>
//{
//    public List<T> Results { get; set; }
//    public double AverageQuality { get; set; }
//    public double MinQuality { get; set; }
//    public double MaxQuality { get; set; }
//    public int TotalMapped { get; set; }
//    public Dictionary<double, int> QualityDistribution { get; set; }
//}

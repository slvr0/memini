using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeminiEventAPI.api_datamodels;
using MeminiEventAPI.structures;
/* Tool for executing mapping to events datalayer */
namespace MeminiEventAPI.mapping;

/// <summary>
/// Executes mapping of API models to normalized structure
/// </summary>
/// 

public static class EventsMapperExecutor
{
    public static List<MappingResult<NormalizedEvent>> Execute<TSource>(
        IEnumerable<TSource> sources,
        FluentQualityMapper<TSource, NormalizedEvent> mapper,
        double minQuality = 0.1)
    {
        return mapper.MapMany(sources, minQuality);
    }
}
public static class PlacesMapperExecutor
{
    public static List<MappingResult<NormalizedPlace>> Execute<TSource>(
        IEnumerable<TSource> sources,
        FluentQualityMapper<TSource, NormalizedPlace> mapper,
        double minQuality = 0.1)
    {
        return mapper.MapMany(sources, minQuality);
    }
}
public static class TheNewsMapperExecuter
{
    public static List<MappingResult<NormalizedNews>> Execute<TSource>(
       IEnumerable<TSource> sources,
       FluentQualityMapper<TSource, NormalizedNews> mapper,
       double minQuality = 0.1)
    {
        return mapper.MapMany(sources, minQuality);
    }
}

public static class WeatherMapperExecuter
{
    public static List<MappingResult<NormalizedWeather>> Execute<TSource>(
       IEnumerable<TSource> sources,
       FluentQualityMapper<TSource, NormalizedWeather> mapper,
       double minQuality = 0.1)
    {
        return mapper.MapMany(sources, minQuality);
    }
}
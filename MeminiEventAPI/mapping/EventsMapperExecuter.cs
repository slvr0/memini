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
/// Executes mapping of API events to NormalizedEvent
/// </summary>
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

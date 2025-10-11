using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeminiEventAPI.api_datamodels;
using MeminiEventAPI.structures;
/* Tool for executing mapping to places datalayer */
namespace MeminiEventAPI.mapping
{
    /// <summary>
    /// Executes mapping of API places to NormalizedPlace
    /// </summary>
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
}

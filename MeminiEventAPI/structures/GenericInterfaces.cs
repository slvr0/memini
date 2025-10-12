using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;

using MeminiEventAPI.mapping;
using MeminiEventAPI.api_datamodels;
namespace MeminiEventAPI.structures
{
    public interface IApiRequest
    {
    }

    public interface IApiDataModel
    {

    }

    public interface IApiDataModelResult
    {

    }

    public interface IEventAdapter
    {     
        List<MappingResult<NormalizedEvent>> MapToNormalizedEvents(double minQuality = 0.1);
        public int GetAccumulatedFetchData();
        public Task FetchAllAndDeserialize(ICollection<IApiRequest> requestconfigs, JsonSerializerOptions options);
    }

    public interface IPlaceAdapter
    {
        List<MappingResult<NormalizedPlace>> MapToNormalizedPlaces(double minQuality = 0.1);
        public int GetAccumulatedFetchData();
        public Task FetchAllAndDeserialize(ICollection<IApiRequest> requestconfigs, JsonSerializerOptions options);
    }

    public interface INewsAdapter
    {
        List<MappingResult<NormalizedNews>> MapToNormalizedNews(double minQuality = 0.1);
        public int GetAccumulatedFetchData();
        public Task FetchAllAndDeserialize(ICollection<IApiRequest> requestconfigs, JsonSerializerOptions options);
    }

    public interface IWeatherAdapter
    {
        List<MappingResult<NormalizedWeather>> MapToNormalizedWeather(double minQuality = 0.1);
        public int GetAccumulatedFetchData();
        public Task FetchAllAndDeserialize(ICollection<IApiRequest> requestconfigs, JsonSerializerOptions options);
    }

    public class MappingResult<T>
    {
        public T Result { get; set; }
        public double Quality { get; set; }
        public int TotalFields { get; set; }
        public int FilledFields { get; set; }
    }

    public interface IMapper<TSource, TResult>
    {
        MappingResult<TResult> Map(TSource source);
    }



}

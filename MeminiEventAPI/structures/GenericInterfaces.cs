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

    public interface IApiRequest
    {
        // Common geographic filters
        string? Country { get; set; }
        string? CountryCode { get; set; }
        string? City { get; set; }
        string? Location { get; set; }
        string? Radius { get; set; }
        // Result control
        int? SearchSize { get; set; }
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

    public enum FoursquareCategory
    {
        Restaurant = 13065,
        Bar = 13003,
        CoffeeShop = 13032,
        Hotel = 13033,
        Landmark = 16000,
        Entertainment = 10000,
        Nightclub = 10032,
        FastFood = 13145,
        Bakery = 13002,
        Museum = 10027,
        Park = 16013,
        ShoppingMall = 17114
    }

}

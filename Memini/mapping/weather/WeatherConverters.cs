using MeminiEventAPI.api_datamodels;
using Memini.entities;
using Memini.structures;

namespace Memini.mapping.weather;
public static class WeatherConverters
{
    public static CoreNode ConvertToWeatherCoreNode(this NormalizedWeather normalizedWeather)
    {
        var node =  new CoreNode
        {
            Guid = Guid.NewGuid().ToString(),
            Source = "OpenMeteo",
            StartDate = !string.IsNullOrEmpty(normalizedWeather.Date)
            ? DateTime.SpecifyKind(DateTime.Parse(normalizedWeather.Date), DateTimeKind.Utc)
            : null,
            Type = (int)CoreNodeTypes.Weather,
            Country = normalizedWeather.LocationInfo?.Country ?? null,
            CountryCode = normalizedWeather.LocationInfo?.CountryCode ?? null,
            City = normalizedWeather.LocationInfo ?.City ?? null
        };

        /* The structure is collection because i had an idea to store a node with startdate - enddate range and collect a weatherforecast for lets say a week. implement soon mb */
        node.WeatherInfos = new List<WeatherInfo>() { normalizedWeather.ConvertToWeatherInfo() };
         
        return node;
    }

    public static WeatherInfo ConvertToWeatherInfo(this NormalizedWeather normalizedWeather)
    {
        return new WeatherInfo
        {
            TemperatureMax = (float?)normalizedWeather.TemperatureMax,
            TemperatureMin = (float?)normalizedWeather.TemperatureMin,
            PrecipitationSum = (float?)normalizedWeather.PrecipitationSum,         
            WeatherDescription = normalizedWeather.WeatherDescription,
            WindspeedMax = (float?)normalizedWeather.WindSpeedMax,
            WindDirection = normalizedWeather.WindDirectionCardinal 
        };
    }
}

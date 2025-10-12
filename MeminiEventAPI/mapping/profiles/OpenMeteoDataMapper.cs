using System;
using System.Collections.Generic;
using System.Linq;
using MeminiEventAPI.api_datamodels;
using OM = MeminiEventAPI.api_datamodels.openmeteo;
using MeminiEventAPI.mapping;
using MeminiEventAPI.api_datamodels.openmeteo;
using MeminiEventAPI.services;

namespace MeminiEventAPI.mapping.profiles
{
    public class OpenMeteoMapper : FluentQualityMapper<OM.DailyForecast, NormalizedWeather>
    {
        public OpenMeteoMapper()
        {
            ConfigureMapping();
        }

        private void ConfigureMapping()
        {            // Date and location
            Map(s => s.Date, d => d.Date, date => date?.Trim(), trackQuality: true);
            Map(s => s.Latitude, d => d.Latitude, trackQuality: true);
            Map(s => s.Longitude, d => d.Longitude, trackQuality: true);
            Map(s => s.Timezone, d => d.Timezone,
                timezone => string.IsNullOrWhiteSpace(timezone) ? null : timezone.Trim(), trackQuality: true);
            Map(s => s.Elevation, d => d.Elevation, trackQuality: true);

            // Temperature
            Map(s => s.TemperatureMax, d => d.TemperatureMax, trackQuality: true);
            Map(s => s.TemperatureMin, d => d.TemperatureMin, trackQuality: true);

            // Precipitation
            Map(s => s.PrecipitationSum, d => d.PrecipitationSum, trackQuality: true);

            // Weather code and description
            Map(s => s.WeatherCode, d => d.WeatherCode, trackQuality: true);
            Map(s => s.WeatherCode, d => d.WeatherDescription,
                code => GetWeatherDescription(code), trackQuality: true);

            // Wind
            Map(s => s.WindSpeedMax, d => d.WindSpeedMax, trackQuality: true);
            Map(s => s.WindDirection, d => d.WindDirection, trackQuality: true);
            Map(s => s.WindDirection, d => d.WindDirectionCardinal,
                direction => GetCardinalDirection(direction), trackQuality: true);

            Map(s => s.LocationInfo, d => d.LocationInfo, locationInfo => BuildLocationInfo(locationInfo) ,trackQuality: true);
        }
        private LocationInfo? BuildLocationInfo(LocationInfo locationInfo)
        {
            if (locationInfo.City == "Unknown")
                return null;
            if (locationInfo.Country == "Unknown")
                return null;

            if (locationInfo.CountryCode == null)
                return null;

            if (locationInfo.Country == "Unknown")
                return null;    

            return locationInfo;
        }


        private static string GetWeatherDescription(int? weatherCode)
        {
            if (!weatherCode.HasValue) return null;

            return weatherCode.Value switch
            {
                0 => "Clear sky",
                1 => "Mainly clear",
                2 => "Partly cloudy",
                3 => "Overcast",
                45 => "Fog",
                48 => "Depositing rime fog",
                51 => "Light drizzle",
                53 => "Moderate drizzle",
                55 => "Dense drizzle",
                56 => "Light freezing drizzle",
                57 => "Dense freezing drizzle",
                61 => "Slight rain",
                63 => "Moderate rain",
                65 => "Heavy rain",
                66 => "Light freezing rain",
                67 => "Heavy freezing rain",
                71 => "Slight snow fall",
                73 => "Moderate snow fall",
                75 => "Heavy snow fall",
                77 => "Snow grains",
                80 => "Slight rain showers",
                81 => "Moderate rain showers",
                82 => "Violent rain showers",
                85 => "Slight snow showers",
                86 => "Heavy snow showers",
                95 => "Thunderstorm",
                96 => "Thunderstorm with slight hail",
                99 => "Thunderstorm with heavy hail",
                _ => "Unknown"
            };
        }

        private static string GetCardinalDirection(int? degrees)
        {
            if (!degrees.HasValue) return null;

            var directions = new[] { "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
                                    "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW" };
            var index = (int)Math.Round(degrees.Value / 22.5) % 16;
            return directions[index];
        }

    }
}

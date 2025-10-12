using System.Text.Json.Serialization;
using MeminiEventAPI.structures;
using MeminiEventAPI.services;

namespace MeminiEventAPI.api_datamodels.openmeteo
{
    using System.Text.Json.Serialization;

    // Root response model
    public class OpenMeteoDataModel : IApiDataModel
    {
        [JsonPropertyName("latitude")]
        public double Latitude { get; set; }

        [JsonPropertyName("longitude")]
        public double Longitude { get; set; }

        [JsonPropertyName("generationtime_ms")]
        public double GenerationTimeMs { get; set; }

        [JsonPropertyName("utc_offset_seconds")]
        public int UtcOffsetSeconds { get; set; }

        [JsonPropertyName("timezone")]
        public string Timezone { get; set; }

        [JsonPropertyName("timezone_abbreviation")]
        public string TimezoneAbbreviation { get; set; }

        [JsonPropertyName("elevation")]
        public double Elevation { get; set; }

        [JsonPropertyName("daily_units")]
        public DailyUnits DailyUnits { get; set; }

        [JsonPropertyName("daily")]
        public DailyWeather Daily { get; set; }
    }

    public class DailyUnits
    {
        [JsonPropertyName("time")]
        public string Time { get; set; }

        [JsonPropertyName("temperature_2m_max")]
        public string Temperature2mMax { get; set; }

        [JsonPropertyName("temperature_2m_min")]
        public string Temperature2mMin { get; set; }

        [JsonPropertyName("precipitation_sum")]
        public string PrecipitationSum { get; set; }

        [JsonPropertyName("weathercode")]
        public string Weathercode { get; set; }

        [JsonPropertyName("windspeed_10m_max")]
        public string Windspeed10mMax { get; set; }

        [JsonPropertyName("winddirection_10m_dominant")]
        public string Winddirection10mDominant { get; set; }
    }

    public class DailyWeather
    {
        [JsonPropertyName("time")]
        public List<string> Time { get; set; } = new List<string>();

        [JsonPropertyName("temperature_2m_max")]
        public List<double?> Temperature2mMax { get; set; } = new List<double?>();

        [JsonPropertyName("temperature_2m_min")]
        public List<double?> Temperature2mMin { get; set; } = new List<double?>();

        [JsonPropertyName("precipitation_sum")]
        public List<double?> PrecipitationSum { get; set; } = new List<double?>();

        [JsonPropertyName("weathercode")]
        public List<int?> Weathercode { get; set; } = new List<int?>();

        [JsonPropertyName("windspeed_10m_max")]
        public List<double?> Windspeed10mMax { get; set; } = new List<double?>();

        [JsonPropertyName("winddirection_10m_dominant")]
        public List<int?> Winddirection10mDominant { get; set; } = new List<int?>();
    }

    // Individual day forecast (for processing)
    public class DailyForecast
    {
        public string Date { get; set; }
        public double? TemperatureMax { get; set; }
        public double? TemperatureMin { get; set; }
        public double? PrecipitationSum { get; set; }
        public int? WeatherCode { get; set; }
        public double? WindSpeedMax { get; set; }
        public int? WindDirection { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Timezone { get; set; }
        public double Elevation { get; set; }
        public LocationInfo LocationInfo { get; set;}
         
    }
}

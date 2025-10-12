using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeminiEventAPI.structures.weather
{
    public class OpenMeteoRequest : IApiRequest
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        // Daily forecast variables
        public List<string> DailyVariables { get; set; } = new List<string>
    {
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_sum",
        "weathercode",
        "windspeed_10m_max",
        "winddirection_10m_dominant"
    };

        // Hourly forecast variables (optional)
        public List<string> HourlyVariables { get; set; } = new List<string>();

        // Current weather (optional)
        public List<string> CurrentVariables { get; set; } = new List<string>();

        // Settings
        public string TemperatureUnit { get; set; } = "celsius"; // celsius or fahrenheit
        public string WindSpeedUnit { get; set; } = "kmh"; // kmh, ms, mph, kn
        public string PrecipitationUnit { get; set; } = "mm"; // mm or inch
        public string Timezone { get; set; } = "auto"; // auto or specific timezone
        public int ForecastDays { get; set; } = 7; // 1-16 days
        public string PastDays { get; set; } = "0"; // 0-92 days of past weather
    }

    public static class OpenMeteoVariables
    {
        // Daily variables
        public const string TempMax = "temperature_2m_max";
        public const string TempMin = "temperature_2m_min";
        public const string ApparentTempMax = "apparent_temperature_max";
        public const string ApparentTempMin = "apparent_temperature_min";
        public const string Precipitation = "precipitation_sum";
        public const string Rain = "rain_sum";
        public const string Snowfall = "snowfall_sum";
        public const string WeatherCode = "weathercode";
        public const string Sunrise = "sunrise";
        public const string Sunset = "sunset";
        public const string WindSpeedMax = "windspeed_10m_max";
        public const string WindDirection = "winddirection_10m_dominant";
        public const string UVIndexMax = "uv_index_max";

        // Hourly variables
        public const string TempHourly = "temperature_2m";
        public const string HumidityHourly = "relativehumidity_2m";
        public const string PrecipitationHourly = "precipitation";
        public const string WeatherCodeHourly = "weathercode";
    }
}

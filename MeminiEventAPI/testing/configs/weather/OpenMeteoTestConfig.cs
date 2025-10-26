using MeminiEventAPI.structures;
using MeminiEventAPI.structures.weather;
using MeminiEventAPI.handlers;


namespace MeminiEventAPI.testing.configs.weather
{
    public static class OpenMeteoTestConfig
    {
        public static Dictionary<string, ICollection<IApiRequest>> WeatherTestConfig()
        {
            return new Dictionary<string, ICollection<IApiRequest>>
            {
                ["OpenMeteo"] = new List<IApiRequest>
                {
                    // Test 1: Stockholm 7-day forecast
                    new OpenMeteoRequest
                    {
                        Latitude = 59.33,
                        Longitude = 18.07,
                        ForecastDays = 7,
                        Timezone = "Europe/Stockholm"
                    },
            
                    // Test 2: New York with more variables
                    new OpenMeteoRequest
                    {
                        Latitude = 40.71,
                        Longitude = -74.01,
                        DailyVariables = new List<string>
                        {
                            OpenMeteoVariables.TempMax,
                            OpenMeteoVariables.TempMin,
                            OpenMeteoVariables.Precipitation,
                            OpenMeteoVariables.WeatherCode,
                            OpenMeteoVariables.UVIndexMax,
                            OpenMeteoVariables.Sunrise,
                            OpenMeteoVariables.Sunset
                        },
                        ForecastDays = 10,
                        Timezone = "America/New_York"
                    },
            
                    // Test 3: Tokyo with Fahrenheit
                    new OpenMeteoRequest
                    {
                        Latitude = 35.68,
                        Longitude = 139.76,
                        TemperatureUnit = "fahrenheit",
                        WindSpeedUnit = "mph",
                        ForecastDays = 14,
                        Timezone = "Asia/Tokyo"
                    }
                }
            };
        }
        public static Dictionary<string, ICollection<IApiRequest>> SwedishCitiesWeatherConfig()
        {
            var swedishCities = new[]
            {
                ("Stockholm", 59.3293, 18.0686),
                ("Göteborg", 57.7089, 11.9746),
                ("Malmö", 55.6050, 13.0038),
                ("Uppsala", 59.8586, 17.6389),
                ("Örebro", 59.2753, 15.2134),
                ("Västerås", 59.6099, 16.5448),
                ("Linköping", 58.4108, 15.6214),
                ("Helsingborg", 56.0465, 12.6945),
                ("Jönköping", 57.7826, 14.1618),
                ("Norrköping", 58.5877, 16.1924),
                ("Lund", 55.7047, 13.1910),
                ("Umeå", 63.8258, 20.2630),
                ("Gävle", 60.6749, 17.1413),
                ("Borås", 57.7210, 12.9401)
            };

            var requests = new List<IApiRequest>();

            foreach (var (city, lat, lng) in swedishCities)
            {
                requests.Add(new OpenMeteoRequest
                {
                    Latitude = lat,
                    Longitude = lng,
                    DailyVariables = new List<string>
                    {
                        "temperature_2m_max",
                        "temperature_2m_min",
                        "precipitation_sum",
                        "precipitation_probability_max",
                        "weathercode",
                        "windspeed_10m_max",
                        "winddirection_10m_dominant",
                        "uv_index_max",
                        "sunrise",
                        "sunset"
                    },
                    TemperatureUnit = "celsius",
                    WindSpeedUnit = "kmh",
                    PrecipitationUnit = "mm",
                    Timezone = "Europe/Stockholm",
                    ForecastDays = 7
                });
            }

            Console.WriteLine($"Weather forecasts for {swedishCities.Length} Swedish cities");
            Console.WriteLine($"Total requests: {requests.Count}");

            return new Dictionary<string, ICollection<IApiRequest>>
            {
                ["OpenMeteo"] = requests
            };
        }
    }


}

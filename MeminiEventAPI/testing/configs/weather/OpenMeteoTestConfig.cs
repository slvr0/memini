using MeminiEventAPI.structures;
using MeminiEventAPI.structures.weather;
using MeminiEventAPI.handlers;


namespace MeminiEventAPI.testing.configs.weather
{
    public class OpenMeteoTestConfig
    {
        public async Task<MeminiApiResponse> WeatherTestConfig(ApiAdapterHandler handler)
        {
            var configs = new Dictionary<string, ICollection<IApiRequest>>
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

            return await handler.FetchDataFromApis(configs);
        }
    }
}

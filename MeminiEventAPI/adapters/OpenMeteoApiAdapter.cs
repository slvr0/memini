using MeminiEventAPI.structures;
using MeminiEventAPI.mapping;
using MeminiEventAPI.mapping.profiles;
using MeminiEventAPI.api_datamodels.openmeteo;
using MeminiEventAPI.api_datamodels;
using MeminiEventAPI.structures.weather;
using MeminiEventAPI.services;

namespace MeminiEventAPI.adapters
{
    internal class OpenMeteoApiAdapter(HttpClient httpClient) : WeatherApiBaseAdapter<OpenMeteoDataModel, DailyForecast>(httpClient, "OpenMeteo")
    {
        public readonly static string ConnectionString = "https://api.open-meteo.com/v1/";

        protected override int ApiDataModelTotalResult(OpenMeteoDataModel dataModel) => dataModel.Daily?.Time?.Count ?? 0;
        protected override async Task<List<DailyForecast>> ApiDataModelResult(OpenMeteoDataModel dataModel, IApiRequest requestConfig)
        {
            using var reverseGeocodingHttpClient = new HttpClient();        
            ReverseGeocoder reverseGeocoder = new ReverseGeocoder(reverseGeocodingHttpClient);

            if (dataModel.Daily == null || dataModel.Daily.Time == null)
                return new List<DailyForecast>();

            var forecasts = new List<DailyForecast>();
            for (int i = 0; i < dataModel.Daily.Time.Count; i++)
            {
                LocationInfo locationInfo = await reverseGeocoder.GetLocationInfoBigDataCloud(dataModel.Latitude, dataModel.Longitude);

                forecasts.Add(new DailyForecast
                {
                    Date = dataModel.Daily.Time[i],
                    TemperatureMax = dataModel.Daily.Temperature2mMax?.ElementAtOrDefault(i),
                    TemperatureMin = dataModel.Daily.Temperature2mMin?.ElementAtOrDefault(i),
                    PrecipitationSum = dataModel.Daily.PrecipitationSum?.ElementAtOrDefault(i),
                    WeatherCode = dataModel.Daily.Weathercode?.ElementAtOrDefault(i),
                    WindSpeedMax = dataModel.Daily.Windspeed10mMax?.ElementAtOrDefault(i),
                    WindDirection = dataModel.Daily.Winddirection10mDominant?.ElementAtOrDefault(i),
                    Latitude = dataModel.Latitude,
                    Longitude = dataModel.Longitude,
                    Timezone = dataModel.Timezone,
                    Elevation = dataModel.Elevation,
                    LocationInfo = locationInfo
                });
            }

            reverseGeocodingHttpClient.Dispose();
            return forecasts;
        }

        public override string GenerateApiRequestUrl(IApiRequest requestConfig)
        {
            var config = requestConfig as OpenMeteoRequest;
            if (config == null)
                throw new ArgumentException("Invalid request config type");

            var query = System.Web.HttpUtility.ParseQueryString(string.Empty);

            // Required parameters
            query["latitude"] = config.Latitude.ToString(System.Globalization.CultureInfo.InvariantCulture);
            query["longitude"] = config.Longitude.ToString(System.Globalization.CultureInfo.InvariantCulture);

            // Daily variables
            if (config.DailyVariables?.Any() == true)
                query["daily"] = string.Join(",", config.DailyVariables);

            // Hourly variables (optional)
            if (config.HourlyVariables?.Any() == true)
                query["hourly"] = string.Join(",", config.HourlyVariables);

            // Current variables (optional)
            if (config.CurrentVariables?.Any() == true)
                query["current"] = string.Join(",", config.CurrentVariables);

            // Units
            query["temperature_unit"] = config.TemperatureUnit;
            query["windspeed_unit"] = config.WindSpeedUnit;
            query["precipitation_unit"] = config.PrecipitationUnit;

            // Timezone
            if (!string.IsNullOrEmpty(config.Timezone))
                query["timezone"] = config.Timezone;

            // Forecast days
            if (config.ForecastDays > 0 && config.ForecastDays <= 16)
                query["forecast_days"] = config.ForecastDays.ToString();

            // Past days
            if (!string.IsNullOrEmpty(config.PastDays) && config.PastDays != "0")
                query["past_days"] = config.PastDays;

            var queryString = query.ToString();
            return string.IsNullOrEmpty(queryString) ? "forecast" : $"forecast?{queryString}";
        }

        public override List<MappingResult<NormalizedWeather>> MapToNormalizedWeather(double keepThreshold = 0.1)
        {
            var mapper = new mapping.profiles.OpenMeteoMapper();
            return WeatherMapperExecuter.Execute<DailyForecast>(AccumulatedData, mapper, keepThreshold);
        }
    }
}

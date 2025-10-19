
using MeminiEventAPI.services;

namespace MeminiEventAPI.api_datamodels;
public class NormalizedWeather
{
    public string? Date { get; set; }
    public double? TemperatureMax { get; set; }
    public double? TemperatureMin { get; set; }
    public double? PrecipitationSum { get; set; }
    public int? WeatherCode { get; set; }
    public string? WeatherDescription { get; set; }
    public double? WindSpeedMax { get; set; }
    public int? WindDirection { get; set; }
    public string? WindDirectionCardinal { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    public string? Timezone { get; set; }
    public double? Elevation { get; set; }
    public string? State { get; set; }
    public LocationInfo? LocationInfo { get; set; }
}

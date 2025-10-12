
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MeminiEventAPI.services;

public class ReverseGeocoder
{
    private readonly HttpClient _httpClient;
    private readonly Dictionary<string, LocationInfo> _cache = new();

    public ReverseGeocoder(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<LocationInfo> GetLocationInfoBigDataCloud(double latitude, double longitude)
    {
        // Cache key to avoid duplicate requests for same location
        var cacheKey = $"{latitude:F2},{longitude:F2}";

        if (_cache.TryGetValue(cacheKey, out var cachedLocation))
            return cachedLocation;

        try
        {
            var url = $"https://api.bigdatacloud.net/data/reverse-geocode-client?latitude={latitude.ToString(System.Globalization.CultureInfo.InvariantCulture)}&longitude={longitude.ToString(System.Globalization.CultureInfo.InvariantCulture)}&localityLanguage=en";

            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<BigDataCloudResponse>(json);

            var locationInfo = new LocationInfo
            {
                City = result?.City ?? result?.Locality,
                Country = result?.CountryName,
                CountryCode = result?.CountryCode,
                State = result?.PrincipalSubdivision
            };

            _cache[cacheKey] = locationInfo;
            return locationInfo;
        }
        catch (Exception ex)
        {
            // Return partial location info if geocoding fails
            return new LocationInfo
            {
                City = "Unknown",
                Country = "Unknown",
                CountryCode = null,
                State = null
            };
        }
    }
}

public class BigDataCloudResponse
{
    [JsonPropertyName("city")]
    public string City { get; set; }

    [JsonPropertyName("locality")]
    public string Locality { get; set; }

    [JsonPropertyName("countryName")]
    public string CountryName { get; set; }

    [JsonPropertyName("countryCode")]
    public string CountryCode { get; set; }

    [JsonPropertyName("principalSubdivision")]
    public string PrincipalSubdivision { get; set; }
}

public class LocationInfo
{
    public string City { get; set; }
    public string Country { get; set; }
    public string CountryCode { get; set; }
    public string State { get; set; }
}

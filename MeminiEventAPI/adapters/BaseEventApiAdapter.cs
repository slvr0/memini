using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using MeminiEventAPI.Attributes;
using MeminiEventAPI.handlers;
using MeminiEventAPI.structures;
using MeminiEventAPI.api_datamodels.ticketmaster;
using MeminiEventAPI.mapping;

namespace MeminiEventAPI.adapters;

public abstract class BaseAdapter(string apiKey, string adapterId)
{
    public string AdapterId = adapterId;
    public string ApiKey { get; set; } = apiKey;
    
    public event EventHandler<HttpConnectionResponse>? FetchResponse;
    public event EventHandler<ApiFetchMetrics>? MetricsResponse;
    public abstract string GenerateApiRequestUrl(MeminiEventApiRequest requestConfig); //Implement me
    public void InvokeHttpResponse(string url, int statusCode, Exception? exception = null)
    {
        FetchResponse?.Invoke(this, new HttpConnectionResponse
        {
            Source = AdapterId,
            Url = url,
            StatusCode = statusCode,
            Exception = exception,
            ErrorMessage = exception?.Message ?? ""
        });
    }

    public void InvokeDataMetricsResponse(int eventCount, int responseSizeInBytes, Exception? exception = null)
    {
        MetricsResponse?.Invoke(this, new ApiFetchMetrics
        {
            EventCount = eventCount,
            ResponseSizeBytes = responseSizeInBytes,
            Exception = exception,
            ErrorMessage = exception?.Message ?? ""
        });
    }
}
public abstract class EventApiBaseAdapter : BaseAdapter
{
    protected readonly HttpClient _httpClient;
    protected EventApiBaseAdapter(HttpClient httpClient, string adapterId)
       : base(ExtractApiKey(httpClient), adapterId)
    {
        _httpClient = httpClient;
    }
    private static string ExtractApiKey(HttpClient httpClient)
    {
        var authHeader = httpClient.DefaultRequestHeaders.Authorization;
        if (authHeader != null && authHeader.Scheme == "Bearer")
        {
            return authHeader.Parameter ?? "";
        }
        return "";
    } 
    public async Task<string> FetchDataAsync(MeminiEventApiRequest requestConfig)
    {
        string url = GenerateApiRequestUrl(requestConfig);
        HttpResponseMessage? response = null;

        try
        {
            response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            InvokeHttpResponse(url, (int)response.StatusCode, null);
            return content;
        }
        catch (Exception e)
        {
            InvokeHttpResponse(url, (int)response?.StatusCode, e);
            throw;
        }
    }

    public abstract Task<BulkMappingResult> MapEventResultBulkData(IApiDataModel deserializedData); // Implement me
  

    public abstract Task<IApiDataModel> DeserializeData(string jsonContent); //Implement me
    public async Task<IApiDataModel?> DeserializeApiData(string jsonContent)
    {
        try
        {
            var result = await DeserializeData(jsonContent);               
            return result;
        }
        catch (System.Text.Json.JsonException e)
        {
            Console.WriteLine($"Deserialization error: {e.Message}");
            return default; // or throw
        }
    }
}   

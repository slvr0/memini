using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Http;
using System;
using System.Linq;
using System.Net.Http.Headers;
using MeminiEventAPI.adapters;
using MeminiEventAPI.Attributes;
using MeminiEventAPI.handlers;

namespace MeminiEventAPI.services;


public static class MeminiEventApiConnectionSetup
{
    public static IServiceCollection AddEventApiClients(
     this IServiceCollection services,
     IConfiguration configuration)
    {
        // Register all adapters
        RegisterApiAdapter<TicketmasterEventApiAdapter>(services, configuration, "Ticketmaster");
        RegisterApiAdapter<PredictHQEventApiAdapter>(services, configuration, "PredictHQ");
        //RegisterApiAdapter<SeatGeekEventApiAdapter>(services, configuration, "SeatGeek");
        //RegisterApiAdapter<SongkickEventApiAdapter>(services, configuration, "SeatGeek"); // Note: uses SeatGeek key

        // Eventful doesn't need an API key
        //RegisterApiAdapter<EventfulEventApiAdapter>(services, configuration, null);

        // Register the handler
        services.AddSingleton<ApiAdapterHandler>();

        return services;
    }

    private static void RegisterApiAdapter<TAdapter>(
            IServiceCollection services,
            IConfiguration configuration,
            string? configKey)
            where TAdapter : EventApiBaseAdapter
    {
        string apiKey = string.IsNullOrEmpty(configKey)
            ? ""
            : configuration[$"EventApis:{configKey}:ApiKey"] ?? "";

        var connectionString = GetConnectionString<TAdapter>();

        // The framework will automatically inject this configured HttpClient
        // into your adapter's constructor
        services.AddHttpClient<TAdapter>(client =>
        {
            client.BaseAddress = new Uri(connectionString);
            client.Timeout = TimeSpan.FromSeconds(30);

            if (!string.IsNullOrEmpty(apiKey))
            {
                client.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", apiKey);
            }
            client.DefaultRequestHeaders.Add("Accept", "application/json");
        });

        // Optional: Also register as base type for polymorphic usage
        services.AddTransient<EventApiBaseAdapter>(sp =>
            sp.GetRequiredService<TAdapter>());
    }

    private static string GetConnectionString<TAdapter>() where TAdapter : EventApiBaseAdapter
    {
        return typeof(TAdapter).Name switch
        {
            nameof(TicketmasterEventApiAdapter) => TicketmasterEventApiAdapter.ConnectionString,
            nameof(PredictHQEventApiAdapter) => PredictHQEventApiAdapter.ConnectionString,
            nameof(SeatGeekEventApiAdapter) => SeatGeekEventApiAdapter.ConnectionString,
            nameof(SongkickEventApiAdapter) => SongkickEventApiAdapter.ConnectionString,          
            _ => throw new InvalidOperationException($"Unknown adapter type: {typeof(TAdapter).Name}")
        };
    }
}
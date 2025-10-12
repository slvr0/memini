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
        //RegisterApiAdapter<TicketmasterApiAdapter>(services, configuration, "Ticketmaster");
        //RegisterApiAdapter<PredictHQEventApiAdapter>(services, configuration, "PredictHQ");
        //RegisterApiAdapter<SeatGeekEventApiAdapter>(services, configuration, "SeatGeek");
        //RegisterApiAdapter<SongkickEventApiAdapter>(services, configuration, "SeatGeek"); // Note: uses SeatGeek key

        // Eventful doesn't need an API key
        //RegisterApiAdapter<EventfulEventApiAdapter>(services, configuration, null);

        //RegisterApiAdapter<FourSquareApiAdapter>(services, configuration, "FourSquare");
        //RegisterApiAdapter<TheNewsApiAdapter>(services, configuration, "TheNews");

        RegisterApiAdapter<OpenMeteoApiAdapter>(services, configuration, "OpenMeteo");

        // Register the handler
        services.AddSingleton<ApiAdapterHandler>();

        return services;
    }

    private static void RegisterApiAdapter<TAdapter>(
           IServiceCollection services,
           IConfiguration configuration,
           string? configKey)
           where TAdapter : BaseAdapter
    {
        string apiKey = string.IsNullOrEmpty(configKey)
            ? ""
            : configuration[$"EventApis:{configKey}:ApiKey"] ?? "";
        var connectionString = GetConnectionString<TAdapter>();

        services.AddHttpClient<TAdapter>(client =>
        {
            client.BaseAddress = new Uri(connectionString);
            client.Timeout = TimeSpan.FromSeconds(30);

            //open meteo doesnt require api key so it wont set up the header.
            if (!string.IsNullOrEmpty(apiKey))
            {
                // Special handling for Foursquare
                if (typeof(TAdapter).Name == nameof(FourSquareApiAdapter))
                {
                    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
                    client.DefaultRequestHeaders.Add("X-Places-Api-Version", "2025-06-17");
                }
                else
                {
                    client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", apiKey);
                }
            }
            client.DefaultRequestHeaders.Add("Accept", "application/json");
        });

        services.AddTransient<BaseAdapter>(sp =>
            sp.GetRequiredService<TAdapter>());
    }
    private static string GetConnectionString<TAdapter>() where TAdapter : BaseAdapter
    {
        return typeof(TAdapter).Name switch
        {
            nameof(TicketmasterApiAdapter) => TicketmasterApiAdapter.ConnectionString,
            nameof(FourSquareApiAdapter) => FourSquareApiAdapter.ConnectionString,
            nameof(TheNewsApiAdapter) => TheNewsApiAdapter.ConnectionString,
            nameof(OpenMeteoApiAdapter) => OpenMeteoApiAdapter.ConnectionString,
            //nameof(PredictHQEventApiAdapter) => PredictHQEventApiAdapter.ConnectionString,
            //nameof(SeatGeekEventApiAdapter) => SeatGeekEventApiAdapter.ConnectionString,                  
            _ => throw new InvalidOperationException($"Unknown adapter type: {typeof(TAdapter).Name}")
        };
    }
}
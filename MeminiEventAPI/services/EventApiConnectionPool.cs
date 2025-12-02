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
        // Only register once

        RegisterApiAdapter<TicketmasterApiAdapter>(services, configuration, "Ticketmaster");
        RegisterApiAdapter<FourSquareApiAdapter>(services, configuration, "FourSquare");
        RegisterApiAdapter<TheNewsApiAdapter>(services, configuration, "TheNews");
        RegisterApiAdapter<OpenMeteoApiAdapter>(services, configuration, "OpenMeteo");

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

        // Check if already registered
        var existingRegistration = services.FirstOrDefault(s =>
            s.ServiceType == typeof(TAdapter));

        if (existingRegistration != null)
        {
            Console.WriteLine($"{typeof(TAdapter).Name} already registered, skipping...");
            return;
        }


        services.AddHttpClient<TAdapter>(client =>
        {
            client.BaseAddress = new Uri(connectionString);
            client.Timeout = TimeSpan.FromSeconds(30);

            if (!string.IsNullOrEmpty(apiKey))
            {
                // Special handling for Foursquare - FIXED
                if (typeof(TAdapter).Name == nameof(FourSquareApiAdapter))
                {                    
                    client.DefaultRequestHeaders.Authorization =
                          new AuthenticationHeaderValue("Bearer", apiKey);
                    client.DefaultRequestHeaders.Add("X-Places-Api-Version", "2025-06-17");
                }
                else
                {
                    client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", apiKey);
                }
            }

            client.DefaultRequestHeaders.Add("Accept", "application/json");
        })
        .ConfigurePrimaryHttpMessageHandler(() => new SocketsHttpHandler
        {
            PooledConnectionLifetime = TimeSpan.FromMinutes(2),
            PooledConnectionIdleTimeout = TimeSpan.FromMinutes(1),
            MaxConnectionsPerServer = 10
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
            _ => throw new InvalidOperationException($"Unknown adapter type: {typeof(TAdapter).Name}")
        };
    }
}
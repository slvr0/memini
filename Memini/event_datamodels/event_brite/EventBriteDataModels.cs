
using Memini.entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Memini.dto;
using Memini.managers;
using Memini.services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Memini.event_datamodels.event_brite;
public class EventbriteSearchResponse
{
    [JsonPropertyName("events")]
    public List<EventbriteEvent> Events { get; set; }

    [JsonPropertyName("pagination")]
    public Pagination Pagination { get; set; }
}

public class EventbriteEvent
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("name")]
    public EventName Name { get; set; }

    [JsonPropertyName("description")]
    public EventDescription Description { get; set; }

    [JsonPropertyName("start")]
    public EventDateTime Start { get; set; }

    [JsonPropertyName("end")]
    public EventDateTime End { get; set; }

    [JsonPropertyName("url")]
    public string Url { get; set; }

    [JsonPropertyName("logo")]
    public EventLogo Logo { get; set; }

    [JsonPropertyName("venue")]
    public Venue Venue { get; set; }

    [JsonPropertyName("is_free")]
    public bool IsFree { get; set; }

    [JsonPropertyName("category")]
    public Category Category { get; set; }
}

public class EventName
{
    [JsonPropertyName("text")]
    public string Text { get; set; }
}

public class EventDescription
{
    [JsonPropertyName("text")]
    public string Text { get; set; }
}

public class EventDateTime
{
    [JsonPropertyName("utc")]
    public DateTime Utc { get; set; }

    [JsonPropertyName("timezone")]
    public string Timezone { get; set; }
}

public class EventLogo
{
    [JsonPropertyName("url")]
    public string Url { get; set; }
}

public class Venue
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("address")]
    public Address Address { get; set; }

    [JsonPropertyName("latitude")]
    public string Latitude { get; set; }

    [JsonPropertyName("longitude")]
    public string Longitude { get; set; }
}

public class Address
{
    [JsonPropertyName("city")]
    public string City { get; set; }

    [JsonPropertyName("region")]
    public string Region { get; set; }

    [JsonPropertyName("address_1")]
    public string Address1 { get; set; }
}

public class Category
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }
}

public class Pagination
{
    [JsonPropertyName("page_count")]
    public int PageCount { get; set; }

    [JsonPropertyName("page_number")]
    public int PageNumber { get; set; }

    [JsonPropertyName("has_more_items")]
    public bool HasMoreItems { get; set; }
}
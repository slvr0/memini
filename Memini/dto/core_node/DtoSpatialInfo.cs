using Memini.entities;

namespace Memini.dto.core_node;

public class DtoSpatialInfo
{
    public int SpatialInfoKey { get; set; }
    public int CoreNodeKey { get; set; }
    public string? Address { get; set; }
    public string? State { get; set; }
    public string? StateCode { get; set; }
    public string? PostalCode { get; set; }
    public string? Latitude { get; set; }
    public string? Longitude { get; set; }
    public string? Timezone { get; set; }
    public string? Duration { get; set; }
    public string? VenueName { get; set; }
    public string? VenueId { get; set; }
    public string? VenueType { get; set; }
    public string? VenueUrl { get; set; }
    public int? VenueCapacity { get; set; }
    public bool? Recurring { get; set; }
    public string? RecurrenceFrequency { get; set; }
}

// Extension Method
public static class SpatialInfoExtensions
{
    public static DtoSpatialInfo ToDto(this SpatialInfo spatialInfo)
    {
        return new DtoSpatialInfo
        {
            SpatialInfoKey = spatialInfo.SpatialInfoKey,
            CoreNodeKey = spatialInfo.CoreNodeKey,
            Address = spatialInfo.Address,
            State = spatialInfo.State,
            StateCode = spatialInfo.StateCode,
            PostalCode = spatialInfo.PostalCode,
            Latitude = spatialInfo.Latitude,
            Longitude = spatialInfo.Longitude,
            Timezone = spatialInfo.Timezone,
            Duration = spatialInfo.Duration,
            VenueName = spatialInfo.VenueName,
            VenueId = spatialInfo.VenueId,
            VenueType = spatialInfo.VenueType,
            VenueUrl = spatialInfo.VenueUrl,
            VenueCapacity = spatialInfo.VenueCapacity,
            Recurring = spatialInfo.Recurring,
            RecurrenceFrequency = spatialInfo.RecurrenceFrequency
        };
    }

    public static SpatialInfo ToEntity(this DtoSpatialInfo dto)
    {
        return new SpatialInfo
        {
            SpatialInfoKey = dto.SpatialInfoKey,
            CoreNodeKey = dto.CoreNodeKey,
            Address = dto.Address,
            State = dto.State,
            StateCode = dto.StateCode,
            PostalCode = dto.PostalCode,
            Latitude = dto.Latitude,
            Longitude = dto.Longitude,
            Timezone = dto.Timezone,
            Duration = dto.Duration,
            VenueName = dto.VenueName,
            VenueId = dto.VenueId,
            VenueType = dto.VenueType,
            VenueUrl = dto.VenueUrl,
            VenueCapacity = dto.VenueCapacity,
            Recurring = dto.Recurring,
            RecurrenceFrequency = dto.RecurrenceFrequency
            // Note: CoreNodeKeyNavigation is not set as it's typically loaded by EF Core
        };
    }
}

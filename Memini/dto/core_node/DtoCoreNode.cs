using Memini.entities;

namespace Memini.dto.core_node;

public class DtoCoreNode
{
    public int Key { get; set; }
    public int? OwnerUserkey { get; set; }
    public string ExternalId { get; set; } = string.Empty;
    public string Guid { get; set; } = string.Empty;
    public string Source { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int Type { get; set; }
    public string CountryCode { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public DateTime? DateAdded { get; set; }
    public string Country { get; set; } = string.Empty;

    public object? CommercialStatusInfo { get; set; } = null!;
    public DtoContentInfo? ContentInfo { get; set; } = null!;
    public object? PoiInfo { get; set; } = null!;
    public DtoSpatialInfo? SpatialInfo { get; set; } = null!;
    public object? WeatherInfo { get; set; } = null!;
}   


public static class CoreNodeExtension {
    public static DtoCoreNode MapToDto(this CoreNode node) {
        return new DtoCoreNode
        {
            Key = node.Key,
            ExternalId = node.ExternalId,
            Guid = node.Guid,
            Source = node.Source,
            Label = node.Label,
            Description = node.Description,
            StartDate = node.StartDate,
            EndDate = node.EndDate,
            Type = node.Type,
            CountryCode = node.CountryCode,
            City = node.City,
            DateAdded = node.DateAdded,
            Country = node.Country,
            OwnerUserkey = node.OwnerUserkey,
            CommercialStatusInfo = node.CommercialStatusInfo,
            ContentInfo = node.ContentInfo?.ToDto(),
            PoiInfo = node.PoiInfo,
            SpatialInfo = node.SpatialInfo?.ToDto(),
            WeatherInfo = node.WeatherInfo
        };
    }    
}


using Memini.dto.general;
namespace Memini.dto.poi;

public class DtoPointOfInterest
{
}

public class DtoPointOfInterestSearchFilter
{
    public string Country { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string? CountryCode { get; set; } = string.Empty;
    public string PlacesFreeSearch { get; set; } = string.Empty;
    public List<string> PlacesCategories { get; set; } = new();
    public int PlacesCategoriesEnumValue { get; set; }
    public int MinRating { get; set; }
    public int TotalRatings { get; set; }
    public DtoPaginationState Pagination { get; set; } = new();
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeminiEventAPI.structures.foursquare;

[Flags]
public enum FoursquareCategory
{
    Any = 0,
    ArtsAndEntertainment = 1 << 0,       // 1
    CollegeAndUniversity = 1 << 1,       // 2
    Event = 1 << 2,                      // 4
    Food = 1 << 3,                       // 8
    NightlifeSpot = 1 << 4,              // 16
    OutdoorsAndRecreation = 1 << 5,      // 32
    ProfessionalAndOtherPlaces = 1 << 6, // 64
    Residence = 1 << 7,                  // 128
    ShopAndService = 1 << 8,             // 256
    TravelAndTransport = 1 << 9          // 512
}

/// <summary>
/// Translation table between enum values and Foursquare category IDs
/// </summary>
public static class FoursquareCategoryIds
{
    private static readonly Dictionary<FoursquareCategory, string> CategoryToIdMap = new Dictionary<FoursquareCategory, string>
    {
        { FoursquareCategory.Any, "" },
        { FoursquareCategory.ArtsAndEntertainment, "4d4b7104d754a06370d81259" },
        { FoursquareCategory.CollegeAndUniversity, "4d4b7105d754a06372d81259" },
        { FoursquareCategory.Event, "4d4b7105d754a06373d81259" },
        { FoursquareCategory.Food, "4d4b7105d754a06374d81259" },
        { FoursquareCategory.NightlifeSpot, "4d4b7105d754a06376d81259" },
        { FoursquareCategory.OutdoorsAndRecreation, "4d4b7105d754a06377d81259" },
        { FoursquareCategory.ProfessionalAndOtherPlaces, "4d4b7105d754a06375d81259" },
        { FoursquareCategory.Residence, "4e67e38e036454776db1fb3a" },
        { FoursquareCategory.ShopAndService, "4d4b7105d754a06378d81259" },
        { FoursquareCategory.TravelAndTransport, "4d4b7105d754a06379d81259" }
    };

    private static readonly Dictionary<string, FoursquareCategory> IdToCategoryMap = new Dictionary<string, FoursquareCategory>
        {
            { "4d4b7104d754a06370d81259", FoursquareCategory.ArtsAndEntertainment },
            { "4d4b7105d754a06372d81259", FoursquareCategory.CollegeAndUniversity },
            { "4d4b7105d754a06373d81259", FoursquareCategory.Event },
            { "4d4b7105d754a06374d81259", FoursquareCategory.Food },
            { "4d4b7105d754a06376d81259", FoursquareCategory.NightlifeSpot },
            { "4d4b7105d754a06377d81259", FoursquareCategory.OutdoorsAndRecreation },
            { "4d4b7105d754a06375d81259", FoursquareCategory.ProfessionalAndOtherPlaces },
            { "4e67e38e036454776db1fb3a", FoursquareCategory.Residence },
            { "4d4b7105d754a06378d81259", FoursquareCategory.ShopAndService },
            { "4d4b7105d754a06379d81259", FoursquareCategory.TravelAndTransport }
        };

    /// <summary>
    /// Get Foursquare category ID from enum
    /// </summary>

    public static string GetCategoryIds(FoursquareCategory categories)
    {
        var ids = new List<string>();

        foreach (FoursquareCategory category in Enum.GetValues(typeof(FoursquareCategory)))
        {
            if (category == FoursquareCategory.Any)
                continue;

            if (categories.HasFlag(category))
            {
                var id = GetId(category);
                if (!string.IsNullOrEmpty(id))
                    ids.Add(id);
            }
        }

        return string.Join(",", ids);
    }

    public static string GetId(FoursquareCategory category)
    {
        return CategoryToIdMap.TryGetValue(category, out var id) ? id : null;
    }


    /// <summary>
    /// Get enum from Foursquare category ID
    /// </summary>
    public static FoursquareCategory? GetCategory(string categoryId)
    {
        return IdToCategoryMap.TryGetValue(categoryId, out var category)
            ? category
            : (FoursquareCategory?)null;
    }

    /// <summary>
    /// Get display name for category
    /// </summary>
    public static string GetDisplayName(FoursquareCategory category)
    {
        return category switch
        {
            FoursquareCategory.ArtsAndEntertainment => "Arts & Entertainment",
            FoursquareCategory.CollegeAndUniversity => "College & University",
            FoursquareCategory.Event => "Event",
            FoursquareCategory.Food => "Food",
            FoursquareCategory.NightlifeSpot => "Nightlife",
            FoursquareCategory.OutdoorsAndRecreation => "Outdoors & Recreation",
            FoursquareCategory.ProfessionalAndOtherPlaces => "Professional & Other",
            FoursquareCategory.Residence => "Residence",
            FoursquareCategory.ShopAndService => "Shop & Service",
            FoursquareCategory.TravelAndTransport => "Travel & Transport",
            _ => category.ToString()
        };
    }

    /// <summary>
    /// Get all category IDs as comma-separated string for API request
    /// </summary>

}

/// <summary>
/// Configuration for Foursquare venue search
/// </summary>
public class FoursquareSearchConfig
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public List<FoursquareCategory> Categories { get; set; } = new List<FoursquareCategory>();
    public int Radius { get; set; } = 1000;
    public int Limit { get; set; } = 50;
    public string Intent { get; set; } = "browse";

    /// <summary>
    /// Build the API request URL
    /// </summary>
    
}
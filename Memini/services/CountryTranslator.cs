namespace Memini.services;

public static class CountryCodeTranslator
{
    private static readonly Dictionary<string, string> CountryToCode = new()
    {
        { "Sweden", "SE" },
        { "Denmark", "DK" },
        { "Norway", "NO" },
        { "Finland", "FI" },
        { "Germany", "DE" },
        { "United Kingdom", "GB" },
        { "France", "FR" },
        { "Spain", "ES" },
        { "Italy", "IT" },
        { "Netherlands", "NL" },
        { "Belgium", "BE" },
        { "Austria", "AT" },
        { "Switzerland", "CH" },
        { "Poland", "PL" },
        { "United States", "US" },
        { "Canada", "CA" }
        // Add more as needed
    };

    public static string ToCountryCode(string countryName)
    {
        return CountryToCode.TryGetValue(countryName, out var code)
            ? code
            : countryName; // Return original if no mapping found
    }
}
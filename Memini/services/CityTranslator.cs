using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeminiEventAPI.services
{
    public static class CityTranslator
    {
        private static readonly Dictionary<string, string> EnglishToSwedish = new()
    {
        { "Gothenburg", "Göteborg" },
        { "Stockholm", "Stockholm" },
        { "Malmo", "Malmö" },
        { "Malmö", "Malmö" },
        { "Uppsala", "Uppsala" },
        { "Linkoping", "Linköping" },
        { "Vasteras", "Västerås" },
        { "Orebro", "Örebro" },
        { "Norrkoping", "Norrköping" },
        { "Helsingborg", "Helsingborg" },
        { "Jonkoping", "Jönköping" },
        { "Umea", "Umeå" },
        { "Lund", "Lund" },
        { "Boras", "Borås" },
        { "Gavle", "Gävle" }
    };

        public static string ToSwedish(string englishCity)
        {
            return EnglishToSwedish.TryGetValue(englishCity, out var swedish)
                ? swedish
                : englishCity; // Return original if no mapping found
        }

        public static string NormalizeSwedishChars(this string input)
        {
            if (string.IsNullOrEmpty(input))
                return input;

            return input
                .Replace("å", "a").Replace("Å", "A")
                .Replace("ä", "a").Replace("Ä", "A")
                .Replace("ö", "o").Replace("Ö", "O");
        }
    }
}

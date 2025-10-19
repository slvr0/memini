using MeminiEventAPI.structures;
using MeminiEventAPI.structures.weather;
using MeminiEventAPI.handlers;

namespace MeminiEventAPI.testing.configs.ticketmaster
{
    public class TicketmasterTestConfig
    {
        public Dictionary<string, ICollection<IApiRequest>>  SimpleTestConfig()
        {
            return new Dictionary<string, ICollection<IApiRequest>>
            {
                ["Ticketmaster"] = new List<IApiRequest>
        {
            new MeminiEventApiRequest
            {
                Country = "Sweden",
                CountryCode = "SE",
                City = "Stockholm",
                SearchSize = 20
            }
        }
            };
        
        }
    }
}

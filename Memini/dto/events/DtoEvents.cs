
using Memini.dto.general;
namespace Memini.dto.events;
public class DtoEvent // cba yet, when the datastructure of sql is determined we can define this until then just pass database structure as object converted to dto response
{

}

public class DtoEventSearchFilter
{
    public string Country { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string? CountryCode { get; set; } = string.Empty;
    public string EventFreeSearch { get; set; } = string.Empty;
    public string EventCreatorSearch { get; set; } = string.Empty;
    public List<string> EventCategories { get; set; } = new();
    public int EventTimespan { get; set; }
    public bool EventSwitchAvailableTickets { get; set; }
    public bool EventSwitchShowTicketmaster { get; set; }
    public bool EventSwitchShowPredictHq { get; set; }
    public DtoPaginationState Pagination { get; set; }
}


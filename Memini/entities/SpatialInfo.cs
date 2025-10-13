using System;
using System.Collections.Generic;

namespace Memini.entities;

public partial class SpatialInfo
{
    public int SpatialInfoKey { get; set; }

    public int CoreNodeKey { get; set; }

    public string? Country { get; set; }

    public string? City { get; set; }

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

    public virtual CoreNode CoreNodeKeyNavigation { get; set; } = null!;
}

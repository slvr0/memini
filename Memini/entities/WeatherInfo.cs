using System;
using System.Collections.Generic;

namespace Memini.entities;

public partial class WeatherInfo
{
    public int WeatherInfoKey { get; set; }

    public int CoreNodeKey { get; set; }

    public float? TemperatureMax { get; set; }

    public float? TemperatureMin { get; set; }

    public float? PrecipitationSum { get; set; }

    public string? WeatherDescription { get; set; }

    public float? WindspeedMax { get; set; }

    public string? WindDirection { get; set; }

    public virtual CoreNode CoreNodeKeyNavigation { get; set; } = null!;
}

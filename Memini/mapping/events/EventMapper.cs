using AutoMapper;
using DM = MeminiEventAPI.api_datamodels;
using Memini.entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Memini.mapping.events;


public class EventNodeMapping : Profile
{
    public EventNodeMapping()
    {
        //Map from a Normalized Event to 

    }
}

//public class EventMappingProfile : Profile
//{
//    public EventMappingProfile()
//    {
//        CreateMap<DM.NormalizedEvent, MeminiEvent>()
//            .ForMember(dest => dest.Source, opt => opt.MapFrom(src => src.Source.HasValue ? src.Source.Value.ToString() : null))
//            .ForMember(dest => dest.EventPerformers, opt => opt.MapFrom(src => src.Performers))
//            .ForMember(dest => dest.EventMedia, opt => opt.MapFrom(src => src.Media))
//            .ForMember(dest => dest.EventPriceRanges, opt => opt.MapFrom(src => src.PricingInfo != null ? src.PricingInfo.PriceRanges : null));

//        // Temporal Info
//        CreateMap<DM.EventTemporalInfo, EventTemporalInfo>()
//            .ForMember(dest => dest.EventId, opt => opt.Ignore())
//            .ForMember(dest => dest.Event, opt => opt.Ignore())
//            .ForMember(dest => dest.DurationMinutes, opt => opt.MapFrom(src => src.Duration.HasValue ? (int?)src.Duration.Value.TotalMinutes : null))
//            .ForMember(dest => dest.IsRecurring, opt => opt.MapFrom(src => src.Recurrence != null ? src.Recurrence.IsRecurring : null))
//            .ForMember(dest => dest.RecurrenceFrequency, opt => opt.MapFrom(src => src.Recurrence != null ? src.Recurrence.Frequency : null))
//            .ForMember(dest => dest.RecurrenceEndDate, opt => opt.MapFrom(src => src.Recurrence != null ? src.Recurrence.RecurrenceEndDate : null));

//        // Geographic Info
//        CreateMap<DM.EventGeographicInfo, EventGeographicInfo>()
//            .ForMember(dest => dest.EventId, opt => opt.Ignore())
//            .ForMember(dest => dest.Event, opt => opt.Ignore())
//            .ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.Coordinates != null ? src.Coordinates.Latitude : null))
//            .ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.Coordinates != null ? src.Coordinates.Longitude : null))
//            .ForMember(dest => dest.SearchRadiusValue, opt => opt.MapFrom(src => src.SearchRadius != null ? (decimal?)src.SearchRadius.Value : null))
//            .ForMember(dest => dest.SearchRadiusUnit, opt => opt.MapFrom(src => src.SearchRadius != null && src.SearchRadius.Unit.HasValue ? src.SearchRadius.Unit.Value.ToString() : null));

//        // Venue Info
//        CreateMap<DM.EventVenueInfo, EventVenueInfo>()
//            .ForMember(dest => dest.EventId, opt => opt.Ignore())
//            .ForMember(dest => dest.Event, opt => opt.Ignore())
//            .ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.Coordinates != null ? src.Coordinates.Latitude : null))
//            .ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.Coordinates != null ? src.Coordinates.Longitude : null));
//            //.ForMember(dest => dest.AdditionalInfoJson, opt => opt.MapFrom(src => src.AdditionalInfo != null ? System.Text.Json.JsonSerializer.Serialize(src.AdditionalInfo) : null));

//        // Categorization Info
//        CreateMap<DM.EventCategorizationInfo, EventCategorizationInfo>()
//            .ForMember(dest => dest.EventId, opt => opt.Ignore())
//            .ForMember(dest => dest.Event, opt => opt.Ignore())
//            .ForMember(dest => dest.GlobalRank, opt => opt.MapFrom(src => src.Rank != null ? src.Rank.GlobalRank : null))
//            .ForMember(dest => dest.LocalRank, opt => opt.MapFrom(src => src.Rank != null ? src.Rank.LocalRank : null))
//            .ForMember(dest => dest.RelevanceScore, opt => opt.MapFrom(src => src.Rank != null && src.Rank.RelevanceScore.HasValue ? (decimal?)src.Rank.RelevanceScore.Value : null));

//        // Status Info
//        CreateMap<DM.EventStatusInfo, EventStatusInfo>()
//            .ForMember(dest => dest.EventId, opt => opt.Ignore())
//            .ForMember(dest => dest.Event, opt => opt.Ignore())
//            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.HasValue ? src.Status.Value.ToString() : null))
//            .ForMember(dest => dest.TicketAvailability, opt => opt.MapFrom(src => src.TicketAvailability.HasValue ? src.TicketAvailability.Value.ToString() : null));

//        // Pricing Info
//        CreateMap<DM.EventPricingInfo, EventPricingInfo>()
//            .ForMember(dest => dest.EventId, opt => opt.Ignore())
//            .ForMember(dest => dest.Event, opt => opt.Ignore());

//        // Price Ranges
//        CreateMap<DM.PriceRange, EventPriceRange>()
//            .ForMember(dest => dest.Id, opt => opt.Ignore())
//            .ForMember(dest => dest.EventId, opt => opt.Ignore())
//            .ForMember(dest => dest.Event, opt => opt.Ignore())
//            .ForMember(dest => dest.MinPrice, opt => opt.MapFrom(src => src.Min))
//            .ForMember(dest => dest.MaxPrice, opt => opt.MapFrom(src => src.Max));

//        // Performers
//        CreateMap<DM.EventPerformer, EventPerformer>()
//            .ForMember(dest => dest.Id, opt => opt.Ignore())
//            .ForMember(dest => dest.EventId, opt => opt.Ignore())
//            .ForMember(dest => dest.Event, opt => opt.Ignore())
//            .ForMember(dest => dest.PerformerId, opt => opt.MapFrom(src => src.Id));

//        // Media
//        CreateMap<DM.EventMedia, EventMedium>()
//            .ForMember(dest => dest.Id, opt => opt.Ignore())
//            .ForMember(dest => dest.EventId, opt => opt.Ignore())
//            .ForMember(dest => dest.Event, opt => opt.Ignore())
//            .ForMember(dest => dest.MediaType, opt => opt.MapFrom(src => src.Type.HasValue ? src.Type.Value.ToString() : null));
//    }

//}

//// Mapper class
//public class EventMapper
//{
//    private readonly IMapper _mapper;

//    public EventMapper()
//    {     
//        var config = new MapperConfiguration(cfg =>
//        {
//            cfg.AddProfile<EventMappingProfile>();
//        });

//        //config.AssertConfigurationIsValid();

//        _mapper = config.CreateMapper();
//    }

//    public MeminiEvent MapToMeminiEvent(DM.NormalizedEvent normalizedEvent)
//    {
//        var eventEntity = _mapper.Map<MeminiEvent>(normalizedEvent);
//        eventEntity.Id = Guid.NewGuid().ToString();
//        SetEventIdForChildren(eventEntity);
//        return eventEntity;
//    }

//    public List<MeminiEvent> MapToMeminiEvents(List<DM.NormalizedEvent> normalizedEvents)
//    {
//        var eventEntities = new List<MeminiEvent>();

//        foreach (var normalizedEvent in normalizedEvents)
//        {
//            var eventEntity = _mapper.Map<MeminiEvent>(normalizedEvent);
//            if(eventEntity.Id == null || eventEntity.Id == 0)
//            {
//                eventEntity.Id = Guid.NewGuid().ToString();
//                SetEventIdForChildren(eventEntity);
//            }
        
//            eventEntities.Add(eventEntity);
//        }

//        return eventEntities;
//    }

//    //public MeminiEvent MapToEntity(DM.NormalizedEvent normalizedEvent)
//    //{
//    //    var eventEntity = _mapper.Map<MeminiEvent>(normalizedEvent);
//    //    eventEntity.Id = Guid.NewGuid().ToString();
//    //    SetEventIdForChildren(eventEntity);
//    //    return eventEntity;
//    //}

//    //public List<MeminiEvent> MapToEntities(IEnumerable<DM.NormalizedEvent> normalizedEvents)
//    //{
//    //    var eventEntities = new List<MeminiEvent>();

//    //    foreach (var normalizedEvent in normalizedEvents)
//    //    {
//    //        var eventEntity = _mapper.Value.Map<MeminiEvent>(normalizedEvent);
//    //        eventEntity.Id = Guid.NewGuid().ToString();
//    //        SetEventIdForChildren(eventEntity);
//    //        eventEntities.Add(eventEntity);
//    //    }

//    //    return eventEntities;
//    //}

//    private void SetEventIdForChildren(MeminiEvent eventEntity)
//    {
//        if (eventEntity.EventTemporalInfo != null)
//            eventEntity.EventTemporalInfo.EventId = eventEntity.Id;

//        if (eventEntity.EventGeographicInfo != null)
//            eventEntity.EventGeographicInfo.EventId = eventEntity.Id;

//        if (eventEntity.EventVenueInfo != null)
//            eventEntity.EventVenueInfo.EventId = eventEntity.Id;

//        if (eventEntity.EventCategorizationInfo != null)
//            eventEntity.EventCategorizationInfo.EventId = eventEntity.Id;

//        if (eventEntity.EventStatusInfo != null)
//            eventEntity.EventStatusInfo.EventId = eventEntity.Id;

//        if (eventEntity.EventPricingInfo != null)
//            eventEntity.EventPricingInfo.EventId = eventEntity.Id;

//        if (eventEntity.EventPerformers != null)
//        {
//            foreach (var performer in eventEntity.EventPerformers)
//                performer.EventId = eventEntity.Id;
//        }

//        if (eventEntity.EventMedia != null)
//        {
//            foreach (var media in eventEntity.EventMedia)
//                media.EventId = eventEntity.Id;
//        }

//        if (eventEntity.EventPriceRanges != null)
//        {
//            foreach (var priceRange in eventEntity.EventPriceRanges)
//                priceRange.EventId = eventEntity.Id;
//        }
//    }
//}
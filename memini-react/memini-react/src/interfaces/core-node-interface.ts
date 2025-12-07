import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export enum CoreNodeType {
    Internal = 0, 
    Event = 1,
    PointOfInterest = 2,
    News = 3,
    Weather = 4
}

export enum CoreNodeSource {
    Internal,
    Ticketmaster,
    FourSquare,
    PredictHQ,
    TheNewsApi,
    OpenMeteo
}

// ============================================
// Database Row Type (what Postgres returns)
// ============================================
export interface ICoreNode {
    Key: number; 
    OwnerUserkey?: number;
    
    Guid: string;
    Label: string;
    Description?: string;
    StartDate: dayjs.Dayjs;
    EndDate: dayjs.Dayjs;
    Created: dayjs.Dayjs;
    Country: string;  
    CountryCode: string;
    City?: string;

    Source: CoreNodeSource;
    Type: CoreNodeType;

    ContentInfo?: IContentInfo;
    SpatialInfo?: ISpatialInfo; 
    PoiInfo?: IPoiInfo;
    CommercialStatusInfo?: ICommercialStatusInfo;

    StartTime: number;
    EndTime: number;
}


export interface ISpatialInfo {
    SpatialInfoKey: number;
    CoreNodeKey: number;
    Address?: string | null;
    State?: string | null;
    StateCode?: string | null;
    postalCode?: string | null;
    Latitude?: string | null;
    Longitude?: string | null;
    Timezone?: string | null;
    Duration?: string | null;
    VenueName?: string | null;
    VenueId?: string | null;
    VenueType?: string | null;
    VenueUrl?: string | null;
    VenueCapacity?: number | null;
    Recurring?: boolean | null;
    RecurrenceFrequency?: string | null;
}

export interface IContentInfo {
    ContentInfoKey: number;
    CoreNodeKey: number;
    ContentInformation?: string | null;
    ContentSubtext?: string | null;
    Category?: string | null;
    Tags?: string | null;
    Genre?: string | null;
    SubGenre?: string | null;
    GlobalRank?: number | null;
    LocalRank?: number | null;
    Relevance?: number | null;
    PerformerName?: string | null;
    PerformerType?: string | null;
    PerformerGenre?: string | null;
}

export interface IContentMedia {

}

export interface IPoiInfo {
    address : string;
    website_url : string;
}

export interface ICommercialStatusInfo {

}


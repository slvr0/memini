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
    DateAdded: dayjs.Dayjs;
    Country: string;  
    CountryCode: string;
    City?: string;

    Source: CoreNodeSource;
    Type: CoreNodeType;

    ContentInfo?: IContentInfo;
    ContentMedia?: IContentMedia;
    PointOfInterest?: IPointOfInterest;
    CommercialInfo?: ICommercialInfo;

    StartTime: number;
    EndTime: number;
}

export interface IContentInfo {

}

export interface IContentMedia {

}

export interface IPointOfInterest {

}

export interface ICommercialInfo {

}


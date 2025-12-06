
import { ICalendarDate, ISimpleDate } from "../../interfaces/common-interfaces";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

import { ICoreNode, CoreNodeSource, CoreNodeType, IContentInfo, IContentMedia, IPointOfInterest, ICommercialInfo } from "../tasks/interfaces/core-node-interface";

export interface IDisplayNode extends Omit<ICoreNode, 'Key'> {    
    height?:number;
    yPosition?:number;
    slotIndex: number; // horizontal alignment
    slotSpan?: number  // can take up multiple index space
    slotCount: number; // horizontal alignment
}

export interface IExtractedDateTime {
    Date: ISimpleDate;
    Minutes: number;
    Timestring: string;
}

// ============================================
// CoreNode Class (implements ICoreNode)
// ============================================
export class CoreNode implements ICoreNode {
    Key: number;
    OwnerKey?: number;
    Source: CoreNodeSource;
    Guid: string;
    Label: string;
    Description?: string;
    StartDate: dayjs.Dayjs;
    EndDate: dayjs.Dayjs;
    DateAdded: dayjs.Dayjs;
    Country: string;
    CountryCode: string;
    City?: string;
    Type: CoreNodeType;
    ContentInfo?: IContentInfo;
    ContentMedia?: IContentMedia;
    PointOfInterest?: IPointOfInterest;
    CommercialInfo?: ICommercialInfo;

    /**
     * Primary constructor - use static factory methods instead
     */
    private constructor(data: ICoreNode) {
        this.Key = data.Key;
        this.OwnerKey = data.OwnerKey;
        this.Source = data.Source;
        this.Guid = data.Guid;
        this.Label = data.Label;
        this.Description = data.Description;
        this.StartDate = data.StartDate;
        this.EndDate = data.EndDate;
        this.DateAdded = data.DateAdded;
        this.Country = data.Country;
        this.CountryCode = data.CountryCode;
        this.City = data.City;
        this.Type = data.Type;
        this.ContentInfo = data.ContentInfo;
        this.ContentMedia = data.ContentMedia;
        this.PointOfInterest = data.PointOfInterest;
        this.CommercialInfo = data.CommercialInfo;
    }

    // ============================================
    // Static Factory Methods
    // ============================================

    /**
     * Create from database row (most common)
     */
    static fromJson(json: any): CoreNode {
        return new CoreNode({
            Key: json.Key,
            OwnerKey: json.OwnerKey,
            Source: json.Source,
            Guid: json.Guid,
            Label: json.Label,
            Description: json.Description,
            StartDate: dayjs(json.StartDate),
            EndDate: dayjs(json.EndDate),
            DateAdded: dayjs(json.DateAdded),
            Country: json.Country,
            CountryCode: json.CountryCode,
            City: json.City,
            Type: json.Type,
            ContentInfo: json.ContentInfo,
            ContentMedia: json.ContentMedia,
            PointOfInterest: json.PointOfInterest,
            CommercialInfo: json.CommercialInfo,
        });
    }
    /**
     * Create new node (for user-created entries)
     */
    static create(params: {
        ownerKey: number;
        source: CoreNodeSource;
        label: string;
        description?: string;
        startDate: dayjs.Dayjs;
        endDate: dayjs.Dayjs;
        country: string;
        countryCode: string;
        city?: string;
        type: CoreNodeType;
        contentInfo?: IContentInfo;
        contentMedia?: IContentMedia;
        pointOfInterest?: IPointOfInterest;
        commercialInfo?: ICommercialInfo;
    }): CoreNode {
        return new CoreNode({
            Key: 0, // Will be set by database
            OwnerKey: params.ownerKey,
            Source: params.source,
            Guid: crypto.randomUUID(), // Generate new GUID
            Label: params.label,
            Description: params.description,
            StartDate: params.startDate,
            EndDate: params.endDate,
            DateAdded: dayjs(),
            Country: params.country,
            CountryCode: params.countryCode,
            City: params.city,
            Type: params.type,
            ContentInfo: params.contentInfo,
            ContentMedia: params.contentMedia,
            PointOfInterest: params.pointOfInterest,
            CommercialInfo: params.commercialInfo,
        });
    }

    /**
     * Create from API response (e.g., Ticketmaster)
     */
    static fromApi(apiData: any, source: CoreNodeSource): CoreNode {
        // Adapt based on your API structure
        return new CoreNode({
            Key: 0,
            Source: source,
            Guid: apiData.id || crypto.randomUUID(),
            Label: apiData.name || apiData.title,
            Description: apiData.description,
            StartDate: dayjs(apiData.dates?.start?.dateTime),
            EndDate: dayjs(apiData.dates?.end?.dateTime || apiData.dates?.start?.dateTime),
            DateAdded: dayjs(),
            Country: apiData._embedded?.venues?.[0]?.country?.name || '',
            CountryCode: apiData._embedded?.venues?.[0]?.country?.countryCode || '',
            City: apiData._embedded?.venues?.[0]?.city?.name,
            Type: CoreNodeType.Event, // Adjust based on API
            // Map additional fields...
        });
    }

    /**
     * Clone with modifications
     */
    clone(modifications?: Partial<ICoreNode>): CoreNode {
        return new CoreNode({
            ...this.toInterface(),
            ...modifications,
        });
    }

    // ============================================
    // Instance Methods
    // ============================================

    /**
     * Get start date as ICalendarDate
     */
    getStartCalendarDate(): ISimpleDate {
        return {
            year: this.StartDate.year(),
            month: this.StartDate.month(),
            day: this.StartDate.date(),
        };
    }

    /**
     * Get end date as ICalendarDate
     */
    getEndCalendarDate(): ISimpleDate {
        return {
            year: this.EndDate.year(),
            month: this.EndDate.month(),
            day: this.EndDate.date(),
        };
    }

    /**
     * Get minutes since midnight for start date
     */
    getMinutesStartTime(): number {
        return this.StartDate.hour() * 60 + this.StartDate.minute();
    }

    /**
     * Get minutes since midnight for end date
     */
    getMinutesEndTime(): number {
        return this.EndDate.hour() * 60 + this.EndDate.minute();
    }

    /**
     * Get full datetime extraction for start
     */
    getStartDateTime(): IExtractedDateTime {
        return {
            Date: this.getStartCalendarDate(),
            Minutes: this.getMinutesStartTime(),
            Timestring: this.StartDate.format('HH:mm'),
        };
    }

    /**
     * Get full datetime extraction for end
     */
    getEndDateTime(): IExtractedDateTime {
        return {
            Date: this.getEndCalendarDate(),
            Minutes: this.getMinutesEndTime(),
            Timestring: this.EndDate.format('HH:mm'),
        };
    }

    /**
     * Check if event is multi-day
     */
    isMultiDay(): boolean {
        return !this.StartDate.isSame(this.EndDate, 'day');
    }

    /**
     * Get duration in minutes
     */
    getDurationMinutes(): number {
        return this.EndDate.diff(this.StartDate, 'minute');
    }

    /**
     * Check if event is currently happening
     */
    isHappening(): boolean {
        const now = dayjs();
        return now.isAfter(this.StartDate) && now.isBefore(this.EndDate);
    }

    /**
     * Check if event is in the past
     */
    isPast(): boolean {
        return dayjs().isAfter(this.EndDate);
    }

    /**
     * Check if event is upcoming
     */
    isUpcoming(): boolean {
        return dayjs().isBefore(this.StartDate);
    }

    /**
     * Format date range for display
     */
    getDateRangeString(format: string = 'MMM D, YYYY'): string {
        if (this.isMultiDay()) {
            return `${this.StartDate.format(format)} - ${this.EndDate.format(format)}`;
        }
        return this.StartDate.format(format);
    }

    /**
     * Format time range for display
     */
    getTimeRangeString(): string {
        return `${this.StartDate.format('HH:mm')} - ${this.EndDate.format('HH:mm')}`;
    }

    /**
     * Convert to plain interface (for API responses)
     */
    toInterface(): ICoreNode {
        return {
            Key: this.Key,
            OwnerKey: this.OwnerKey,
            Source: this.Source,
            Guid: this.Guid,
            Label: this.Label,
            Description: this.Description,
            StartDate: this.StartDate,
            EndDate: this.EndDate,
            DateAdded: this.DateAdded,
            Country: this.Country,
            CountryCode: this.CountryCode,
            City: this.City,
            Type: this.Type,
            ContentInfo: this.ContentInfo,
            ContentMedia: this.ContentMedia,
            PointOfInterest: this.PointOfInterest,
            CommercialInfo: this.CommercialInfo,
        };
    }

    /**
     * Convert to JSON (for API responses)
     */
    toJSON(): any {
        return {
            key: this.Key,
            ownerKey: this.OwnerKey,
            source: this.Source,
            guid: this.Guid,
            label: this.Label,
            description: this.Description,
            startDate: this.StartDate.toISOString(),
            endDate: this.EndDate.toISOString(),
            dateAdded: this.DateAdded.toISOString(),
            country: this.Country,
            countryCode: this.CountryCode,
            city: this.City,
            type: this.Type,
            contentInfo: this.ContentInfo,
            contentMedia: this.ContentMedia,
            pointOfInterest: this.PointOfInterest,
            commercialInfo: this.CommercialInfo,
        };
    }
}
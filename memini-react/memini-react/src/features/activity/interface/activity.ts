import { ICalendarDate, ISimpleDate } from "../../../interfaces/common-interfaces";
import { ICoreNode, CoreNodeSource, CoreNodeType, IContentInfo, IContentMedia, IPointOfInterest, ICommercialInfo } from "../../tasks/interfaces/core-node-interface";

import { toMinutes } from "../../planning/computes/task-scheduler-computations";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export interface IDisplayActivity extends Omit<ICoreNode, 'Key'> {    
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
// Activity Class (implements ICoreNode) to create user activities with core node structures that can be scheduled alsor.
// ============================================
export class Activity implements ICoreNode {
    Key: number;
    OwnerUserkey?: number;
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
    StartTime: number;
    EndTime: number;

    /**
     * Primary constructor - use static factory methods instead
     */
    private constructor(data: ICoreNode) {
        this.Key = data.Key;
        this.OwnerUserkey = data.OwnerUserkey;
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
        this.StartTime = toMinutes(dayjs(data.StartDate));
        this.EndTime = toMinutes(dayjs(data.EndDate));
    }

    // ============================================
    // Static Factory Methods
    // ============================================

    static fromJsonArray(jsonArray: any[]): Activity[] {
        return jsonArray.map(json => Activity.fromJson(json));
    }

    /**
     * Create from database row (most common)
     */
    static fromJson(json: any): Activity {
        return new Activity({
            Key: json.Key,
            OwnerUserkey: json.OwnerUserkey,
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
            StartTime: toMinutes(dayjs(json.StartDate)),
            EndTime: toMinutes(dayjs(json.EndDate)),
        });
    }
    /**
     * Create new node (for user-created entries)
     */
    static create(params: {
        ownerUserKey: number;
        source: CoreNodeSource;
        label: string;
        description?: string;
        startDate: dayjs.Dayjs | string;
        endDate: dayjs.Dayjs | string;
        country: string;
        countryCode: string;
        city?: string;
        type: CoreNodeType;
        contentInfo?: IContentInfo;
        contentMedia?: IContentMedia;
        pointOfInterest?: IPointOfInterest;
        commercialInfo?: ICommercialInfo;
    }): Activity {

        console.log("PARAMS",params);
        return new Activity({
            Key: 0, // Will be set by database
            OwnerUserkey: params.ownerUserKey,
            Source: params.source,
            Guid: crypto.randomUUID(), // Generate new GUID
            Label: params.label,
            Description: params.description,
            StartDate: typeof params.startDate === 'string' 
                ? dayjs(params.startDate) 
                : params.startDate,
            EndDate: typeof params.endDate === 'string' 
                ? dayjs(params.endDate) 
                : params.endDate,
            DateAdded: dayjs(),
            Country: params.country,
            CountryCode: params.countryCode,
            City: params.city,
            Type: params.type,
            ContentInfo: params.contentInfo,
            ContentMedia: params.contentMedia,
            PointOfInterest: params.pointOfInterest,
            CommercialInfo: params.commercialInfo,
            StartTime: toMinutes(dayjs(params.startDate)),
            EndTime: toMinutes(dayjs(params.endDate)),
        });
    }   

    /**
     * Clone with modifications
     */
    clone(modifications?: Partial<ICoreNode>): Activity {
        return new Activity({
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
            OwnerUserkey: this.OwnerUserkey,
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
            StartTime: this.StartTime,
            EndTime: this.EndTime,
        };
    }

    /**
     * Convert to JSON (for API responses)
     */
    toJSON(): any {
        return {
            key: this.Key,
            ownerKey: this.OwnerUserkey,
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
            startTime: this.StartTime,
            endTime: this.EndTime,
        };
    }
}
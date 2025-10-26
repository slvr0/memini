export interface ICalendarDate {
  year: number;
  month: number; // 0-based (Jan = 0)
  day: number;
  week: number;
  weekDay: number;
}

export interface ISimpleDate {
    year: number;
    month: number; // 0-11    
    day: number; // 1-31
}

export interface ICalendarDateState {
  selectedDate: ICalendarDate;
  todaysDate: ICalendarDate;
}

export interface IUserSessionState {
  userSession: any | null; // replace 'any' with your session type
}

export interface IPositionState {
  Country: string;
  City: string;
  CountryCode?: string;
}

export interface IPaginationState {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

export interface IEventSearchFilter extends IPositionState {  
  eventFreeSearch: string;
  eventCreatorSearch: string;
  eventCategories: string[];
  eventTimespan: number;
  eventSwitchAvailableTickets: boolean;
  eventSwitchShowTicketmaster: boolean;
  eventSwitchShowPredictHq: boolean;
  pagination: IPaginationState;
}

export interface IPointOfInterestFilter extends IPositionState{
  placesFreeSearch: string;
  placesCategories: string[];
  placesCategoriesEnumValue: number;
  minRating: number;
  totalRatings: number;
  pagination: IPaginationState;
}

export type EventSearchFilterInput = Omit<IEventSearchFilter, 'pagination'>;
export type PointOfInterestSearchFilterInput = Omit<IPointOfInterestFilter, 'pagination'>;


export interface IPaginatedSearchResponse<T> {
  Data: T;
  TotalItems?: number;
  TotalPages?: number;
}
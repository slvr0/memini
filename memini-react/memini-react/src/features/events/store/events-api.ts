import { 
  fetchEventApiData, 
  cleanupOldApiData, 
  getEvents, 
  getEventsFromFilter, 
  getPointsOfInterest, 
  getPointsOfInterestFromFilter,
  getNews, 
  getWeatherInformationWeekForecast,
  getPointsOfInterestCategories 
} 
  from "../../../services/event-services";
import type { ApiResponse } from "../../../interfaces/api-response";
import { IPaginationState, IPaginatedSearchResponse, IEventSearchFilter, IPointOfInterestFilter } from '@/interfaces/common-interfaces';

export async function getEventsFromAll(): Promise<ApiResponse<any>> {
    return await getEvents().then(response => response.data).catch(e => console.log(e));
}
export async function getPointsOfInterestFromAll(): Promise<ApiResponse<any>> {
    return await getPointsOfInterest().then(response => response.data).catch(e => console.log(e));
}
export async function fetchAllApiData(): Promise<ApiResponse<any>> {
  return await fetchEventApiData().then(response => response.data).catch(e => console.log(e));
}
export async function removeAllApiDataFromDb(): Promise<ApiResponse<any>> {
  return await cleanupOldApiData().then(response => response.data).catch(e => console.log(e));
}
export async function getNewsFromCountry(countryCode: string): Promise<ApiResponse<any>> {
  return await getNews(countryCode).then(response => response.data).catch(e => console.log(e));
}
export async function getWeatherInformationWeekForecastApi(): Promise<ApiResponse<any>> {
  return await getWeatherInformationWeekForecast().then(response => response.data).catch(e => console.log(e));
}
export async function getPointsOfInterestCategoriesApi(): Promise<ApiResponse<any>> {
  return await getPointsOfInterestCategories().then(response => response.data).catch(e => console.log(e));
}
export async function getEventsFromFilteredSearch(
  searchFilter: IEventSearchFilter
): Promise<ApiResponse<any>> {
  return await getEventsFromFilter(searchFilter).then(response => response.data).catch(e => console.log(e));
}
export async function getPointsOfInterestFromFilteredSearch(
  searchFilter: IPointOfInterestFilter
): Promise<ApiResponse<any>> {
  return await getPointsOfInterestFromFilter(searchFilter).then(response => response.data).catch(e => console.log(e));
}
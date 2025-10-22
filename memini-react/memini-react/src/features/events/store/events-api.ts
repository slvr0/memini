import { fetchEventApiData, cleanupOldApiData, getEvents, getPointsOfInterest, getNews, getWeatherInformation,getPointsOfInterestCategories } from "../../../services/event-services"
import type { ApiResponse } from "../../../interfaces/api-response";

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
export async function getWeatherInformationByDate(date: string): Promise<ApiResponse<any>> {
  return await getWeatherInformation(date).then(response => response.data).catch(e => console.log(e));
}
export async function getPointsOfInterestCategoriesApi(): Promise<ApiResponse<any>> {
  return await getPointsOfInterestCategories().then(response => response.data).catch(e => console.log(e));
}
import api from "./api-client.js";
const controllerSyntax = 'Event';

export const fetchEventApiData = (data) =>  api.post(controllerSyntax + '/FetchEventApiData');
export const cleanupOldApiData = (data) => api.post(controllerSyntax + '/CleanupOldApiData');
export const getEvents = () => api.post(controllerSyntax + '/GetEvents');

export const getEventsFromFilter = (eventSearchFilter) => api.post(controllerSyntax + '/GetEventsFromFilter', eventSearchFilter);
export const getPointsOfInterestFromFilter = (poiSearchFilter) => api.post(controllerSyntax + '/GetPointsOfInterestFromFilter', poiSearchFilter);
export const getPointsOfInterest = (request) => api.post(controllerSyntax + '/GetPointsOfInterest');
export const getPointsOfInterestCategories = () => api.get(controllerSyntax + '/GetPointsOfInterestCategories');
export const getNews = (request) => api.post(controllerSyntax + '/GetNews', request);
export const getWeatherInformationWeekForecast = (city) => api.post(controllerSyntax + '/GetWeatherInformationWeekForecast', city);

import api from "./api-client.js";
const controllerSyntax = 'Event';

export const fetchEventApiData = (data) =>  api.post(controllerSyntax + '/FetchEventApiData');
export const cleanupOldApiData = (data) => api.post(controllerSyntax + '/CleanupOldApiData');
export const getEvents = (request) => api.post(controllerSyntax + '/GetEvents');
export const getPointsOfInterest = (request) => api.post(controllerSyntax + '/GetPointsOfInterest');
export const getPointsOfInterestCategories = () => api.get(controllerSyntax + '/GetPointsOfInterestCategories');
export const getNews = (request) => api.post(controllerSyntax + '/GetNews', request);
export const getWeatherInformation = (request) => api.post(controllerSyntax + '/GetWeatherInformation', request);

import api from "./api-client.js";
const controllerSyntax = 'Event';

export const fetchEventApiData = (data) =>  api.post(controllerSyntax + '/FetchEventApiData' , data);
export const cleanupOldApiData = (data) => api.post(controllerSyntax + '/CleanupOldApiData' , data);
export const getEvents = (request) => api.post(controllerSyntax + '/GetEvents');
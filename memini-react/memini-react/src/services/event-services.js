import api from "./api-client.js";
const controllerSyntax = 'Event';

export const fetchEventApiData = (data) => api.post(controllerSyntax + '/FetchEventApiData' , data);

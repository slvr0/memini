import api from "./api-client.js";

const controllerSyntax = 'User';

export const loginUser = (data) => api.post(controllerSyntax + '/LoginUser' , data);
export const registerNewUser = (data) => api.post(controllerSyntax + '/RegisterNewUser', data);
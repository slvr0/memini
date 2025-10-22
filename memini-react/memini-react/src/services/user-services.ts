import { IPositionState } from "@/interfaces/common-interfaces.js";
import { ApiResponse } from '@/interfaces/api-response'; 
import api from "./api-client.js";

const controllerSyntax = 'User';

export const loginUser = (data : any) => api.post(controllerSyntax + '/LoginUser' , data);
export const registerNewUser = (data : any) => api.post(controllerSyntax + '/RegisterNewUser', data);
export const setUserLocation = async (data : any)  => api.post(controllerSyntax + '/SetUserLocation', data);
export const getUserLocation = async ()  => api.post(controllerSyntax + '/GetUserLocation');
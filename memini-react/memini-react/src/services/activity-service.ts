import api from "./api-client.js";

const controllerSyntax = '/Activity';

export const getActivities = () => 
    api.get(controllerSyntax + '/GetActivities');

export const getActivity = (id: number) => 
    api.get(controllerSyntax + '/GetActivity', { params: { id } });

export const addActivity = (data: any) => {    
    return api.post(controllerSyntax + '/AddActivity', data);
}
    
export const updateActivity = (data: any) => 
    api.put(controllerSyntax + '/UpdateActivity', data);

export const deleteActivity = (data: any) => 
    api.delete(controllerSyntax + '/DeleteActivity', { params: { data } });

export const getActivitiesForDate = (data: any) => 
    api.post(controllerSyntax + '/GetActivitiesForDate', data);

export const getActivitiesForDateRange = (data: any) =>  //startDate, endDate
    api.post(controllerSyntax + '/GetActivitiesForDateRange', data);

export const getActivitiesByUser = (userId: number) => 
    api.get(controllerSyntax + '/GetActivitiesByUser', { params: { userId } });
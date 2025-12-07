import { Activity } from "../interface/activity";
import * as activityService from "../../../services/activity-service";
import type { ApiResponse } from "../../../interfaces/api-response";
import dayjs from 'dayjs';


export async function fetchActivitiesApi(): Promise<ApiResponse<Activity[]>> {
    return await activityService.getActivities()
        .then(response => ({
            Success: response.data.Success,
            Message: response.data.Message,
            ResponseObject: Activity.fromJsonArray(response.data.ResponseObject)
        }))
        .catch(e => {
            console.log(e);
            return { ResponseObject: [], Success: false, Message: e.message };
        });
}

export async function fetchActivityApi(id: number): Promise<ApiResponse<Activity>> {
    return await activityService.getActivity(id)
        .then(response => ({
            Success: response.data.Success,
            Message: response.data.Message,
            ResponseObject: Activity.fromJson(response.data.ResponseObject)
        }))
        .catch(e => {
            console.log(e);
            return { ResponseObject: null as any, Success: false, Message: e.message };
        });
}

export async function fetchActivitiesForDateApi(date: dayjs.Dayjs): Promise<ApiResponse<Activity[]>> {
    const data = {
        date: date.format('YYYY-MM-DD'),
    };
    
    return await activityService.getActivitiesForDate(data)
        .then(response => ({
            Success: response.data.Success,
            Message: response.data.Message,
            ResponseObject: Activity.fromJsonArray(response.data.ResponseObject)
        }))
        .catch(e => {
            console.log(e);
            return { ResponseObject: [], Success: false, Message: e.message };
        });
}

export async function fetchActivitiesForDateRangeApi(startDate: dayjs.Dayjs, endDate: dayjs.Dayjs): Promise<ApiResponse<Activity[]>> {
    const data = {
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
    };
    
    return await activityService.getActivitiesForDateRange(data)
        .then(response => ({
            Success: response.data.Success,
            Message: response.data.Message,
            ResponseObject: Activity.fromJsonArray(response.data.ResponseObject)
        }))
        .catch(e => {
            console.log(e);
            return { ResponseObject: [], Success: false, Message: e.message };
        });
}

export async function addActivityApi(activity: Activity): Promise<ApiResponse<Activity>> {
    return await activityService.addActivity(activity.toJSON())
        .then(response => ({
            Success: response.data.Success,
            Message: response.data.Message,
            ResponseObject: Activity.fromJson(response.data.ResponseObject)
        }))
        .catch(e => {
            console.log(e);
            return { ResponseObject: null as any, Success: false, Message: e.message };
        });
}

export async function updateActivityApi(activity: Activity): Promise<ApiResponse<Activity>> {
    return await activityService.updateActivity(activity.toJSON())
        .then(response => ({
            Success: response.data.Success,
            Message: response.data.Message,
            ResponseObject: Activity.fromJson(response.data.ResponseObject)
        }))
        .catch(e => {
            console.log(e);
            return { ResponseObject: null as any, Success: false, Message: e.message };
        });
}

export async function deleteActivityApi(activity: Activity): Promise<ApiResponse<boolean>> {
    return await activityService.deleteActivity(activity)
        .then(response => ({
            Success: response.data.Success,
            Message: response.data.Message,
            ResponseObject: response.data.ResponseObject
        }))
        .catch(e => {
            console.log(e);
            return { ResponseObject: false, Success: false, Message: e.message };
        });
}

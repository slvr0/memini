// ============================================
// stores/activityStore.ts
// ============================================
import { create } from 'zustand';
import { Activity, IDisplayActivity } from '../interface/activity';
import * as activityApi from './activity-api';
import dayjs from 'dayjs';
import { ICalendarDate } from '@/interfaces/common-interfaces';

interface ActivityStore {
    activities: Activity[];
    loading: boolean;
    error: string | null;
    
    // Actions
    loadActivitiesForDates: (dates: dayjs.Dayjs[]) => Promise<void>;
    loadActivitiesForDateRange: (startDate: dayjs.Dayjs, endDate: dayjs.Dayjs ) => Promise<void>;
    getActivitiesForDate: (date: dayjs.Dayjs) => Activity[];
    addActivity: (activity: Activity) => Promise<Activity | null>;
    updateActivity: (activity: Activity) => Promise<Activity | null>;
    deleteActivity: (activity: Activity) => Promise<void>;
    updateActivityFromDragEvent: (activity: IDisplayActivity, weekday: ICalendarDate, relativeY: number, containerHeight: number) => void;
}

export const useActivityStore = create<ActivityStore>((set, get) => ({
    activities: [],
    loading: false,
    error: null,

    loadActivitiesForDates: async (dates: dayjs.Dayjs[]) => {
        set({ loading: true, error: null });
        
        const datePromises = dates.map(date => 
                  activityApi.fetchActivitiesForDateApi(date)
              );
              
        const responses = await Promise.all(datePromises);
        const allActivities = responses.flatMap(r => r.Success ? r.ResponseObject : []);
        set({ activities: allActivities, loading: false });
    },

    loadActivitiesForDateRange: async (startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) => {
        set({ loading: true, error: null });
        const response = await activityApi.fetchActivitiesForDateRangeApi(startDate, endDate);

        if(response.Success) {
             set(state => ({
                activities: response.ResponseObject,
                loading: false
            }));
        } else {
            set({error: response.Message, loading: false})
        }
    },

    getActivitiesForDate: (date: dayjs.Dayjs) => {
        const { activities } = get();
        const dayStart = date.startOf('day');
        const dayEnd = date.endOf('day');
        
        return activities.filter(activity => 
            activity.EndDate.isAfter(dayStart) && 
            activity.StartDate.isBefore(dayEnd)
        );
    },

    addActivity: async (activity: Activity) => {
        set({ loading: true, error: null });
        const response = await activityApi.addActivityApi(activity);
        
        if (response.Success) {
            set(state => ({
                activities: [...state.activities, response.ResponseObject],
                loading: false
            }));
            return response.ResponseObject;
        } else {
            set({ error: response.Message, loading: false });
            return null;
        }
    },

    updateActivity: async (activity: Activity) => {
        set({ loading: true, error: null });
        const response = await activityApi.updateActivityApi(activity);
        
        if (response.Success) {
            set(state => ({
                activities: state.activities.map(a => 
                    a.Key === activity.Key ? response.ResponseObject : a
                ),
                loading: false
            }));
            return response.ResponseObject;
        } else {
            set({ error: response.Message, loading: false });
            return null;
        }
    },

    updateActivityFromDragEvent: (activity: IDisplayActivity, weekday: ICalendarDate, relativeY: number, containerHeight: number) : void => {

    },

    deleteActivity: async (activity: Activity) => {
        set({ loading: true, error: null });
        const response = await activityApi.deleteActivityApi(activity);
        
        if (response.Success) {
            set(state => ({
                activities: state.activities.filter(a => a.Key !== activity.Key),
                loading: false
            }));
            return;
        } else {
            set({ error: response.Message, loading: false });
            return;
        }
    },
}));
import { createSlice, configureStore } from '@reduxjs/toolkit';
import moment from 'moment';

Date.prototype.getWeek = function() {
    const date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    // Set to the nearest Thursday (current date + 4 - current day of week)
    date.setDate(date.getDate() + 4 - (date.getDay() || 7));

    // Get the first day of the year
    const yearStart = new Date(date.getFullYear(), 0, 1);

    // Calculate the number of weeks by dividing the days between the current date and the first day of the year by 7
    const weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
    return weekNo;
};

const today = moment();
const momentToObject = (date) => {
    return {year: date.year(), month: date.month() + 1, day: date.date(), week: date.isoWeek(), weekDay: date.weekday()};
}

const calendarDateState = {selectedDate: momentToObject(today), todaysDate: momentToObject(today)};

const calendarDateSlice = createSlice({
    name: 'calendarDate',
    initialState: calendarDateState,
    reducers: {
        setSelectedDate(state, action) { 
            state.selectedDate  = action.payload.newDate;
            state.todaysDate    = state.todaysDate;
        }           
    }
});

const meminiUserSlice = createSlice( {
    name: 'meminiUser',
    initialState: {userSession: (() => {
        const storedSession = localStorage.getItem('authToken');
        try {
            return storedSession ? JSON.parse(storedSession) : null;
        } catch (e) {
            console.error('Error parsing user session from localStorage:', e);
            return null;  
        }
    })()},
    reducers: {
        login: (state, action) => {        
            if(state.token == null) {
                state.userSession = action.payload.userSession;        
                localStorage.setItem('authToken', JSON.stringify(action.payload.userSession));              
            }            
        },
        logout: (state) => {      
            state.userSession = null;            
            localStorage.removeItem('authToken');
        }
    }
})

const store = configureStore({
    reducer: {
        calendarDate : calendarDateSlice.reducer,
        meminiUser: meminiUserSlice.reducer    
    }
});

export const calendarDateActions = calendarDateSlice.actions;
export const meminiUserActions = meminiUserSlice.actions;

export default store;
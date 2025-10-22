import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {IPositionState} from "../interfaces/common-interfaces"

const initialPositionState: IPositionState = {
    Country: '',
    City: '',
};

export const positionSlice = createSlice({
    name: 'position',
    initialState: initialPositionState,
    reducers: {
        setPosition(state, action: PayloadAction<IPositionState>) {
            state.Country = action.payload.Country;
            state.City = action.payload.City;
            if (action.payload.CountryCode) {
                state.CountryCode = action.payload.CountryCode;
            }   
        },
    },
}); 

export const positionActions = positionSlice.actions;

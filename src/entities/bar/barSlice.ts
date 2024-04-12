import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { initialBarSliceState } from "../../shared/constants";
import { BarName, EventId, TTicket, UID } from '../../shared/types';
import { RootState } from '../../app/store';

const initialState = initialBarSliceState;

export const barSlice = createSlice({
    name: 'bar',
    initialState,
    reducers: {
        setCurrentBar: (state, action: PayloadAction<BarName>) => {
            state.currentBar = action.payload;
        },
    },
})

export const { setCurrentBar } = barSlice.actions;

export const selectCurrentBar = (state: RootState) => state.bar.currentBar; 

export default barSlice.reducer;

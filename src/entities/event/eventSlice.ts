import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {barFullNameMap, initialEventSliceState} from "../../shared/constants";
import { ApiResponse, BarFilter, BarName, EventId, Filter, TEvent } from '../../shared/types';
import { sortEventsByFilter } from '../../shared/utils';
import { RootState } from '../../app/store';

const initialState = initialEventSliceState;

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setEvents: (state, action: PayloadAction<ApiResponse>) => {
            state.events = action.payload;
            state.initialApiResponse = action.payload;
        },
        setFilter: (state, action: PayloadAction<Filter>) => {
            state.filter = action.payload;
            if (state.filter !== 'anyFilter')
                state.events.sort((a, b) => sortEventsByFilter(a, b, state.filter))
        },
        setBarFilter: (state, action: PayloadAction<BarFilter>) => {
            state.events = [...state.initialApiResponse];
            state.barFilter = action.payload;
            if (state.barFilter !== 'anyBar')
                state.events = state.events.filter(event => event.place
                    .split(' ')
                    .some(placeNamePart => placeNamePart === barFullNameMap.get(state.barFilter as BarName)))
        },
        filterBySearchResult: (state, action: PayloadAction<string>) => {
            state.events = [...state.initialApiResponse];
            if (action.payload.length > 0) state.events = state.events.filter(
                event => event.short_name.toLowerCase().includes(action.payload)
            )
        }
    },
})

export const { setEvents, setFilter, setBarFilter, filterBySearchResult } = eventSlice.actions;

export const selectEvents = (state: RootState) => state.events.events;
export const selectFilter = (state: RootState) => state.events.filter;
export const selectBarFilter = (state: RootState) => state.events.barFilter;
export const selectEventById = createSelector(
    [selectEvents, (state, eventId) => eventId],
    (events, id) => events.filter(event => event.event_id === id)[0]
)

export default eventSlice.reducer;

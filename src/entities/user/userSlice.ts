import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { initialUserSliceState } from "../../shared/constants";
import { EventId, TTicket, UID } from '../../shared/types';
import { RootState } from '../../app/store';

const initialState = initialUserSliceState;

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUID: (state, action: PayloadAction<UID>) => {
            state.uid = action.payload;
        },
        setTickets: (state, action: PayloadAction<TTicket[]>) => {
            state.tickets = action.payload;
            console.log(state.tickets);
        },
    },
})

export const { setTickets, setUID } = userSlice.actions;

export const selectUID = (state: RootState) => state.user.uid;
export const selectTickets = (state: RootState) => state.user.tickets;
export const selectTicketByEventId = createSelector(
    [selectTickets, (state: RootState, id) => id],
    (tickets, id) => {
        return tickets.filter(ticket => ticket.event_id === id)[0]
    }
)

export default userSlice.reducer;

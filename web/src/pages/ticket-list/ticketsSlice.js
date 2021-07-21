import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  isLoading: false,
  error: null,
  searchTicketList: [],
};

const ticketListSlice = createSlice({
  name: "ticketList",
  initialState,
  reducers: {
    fetchTicketsLoading: (state) => {
      state.isLoading = true;
    },
    fetchTicketsSuccess: (state, action) => {
      state.tickets = action.payload;
      state.searchTicketList = action.payload;
      state.isLoading = false;
    },
    fetchTicketsFail: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    searchTickets: (state, { payload }) => {
      state.searchTicketList = state.tickets.filter((ticket) =>
        ticket.subject.toLowerCase().includes(payload.toLowerCase())
      );
    },
  },
});

const { reducer, actions } = ticketListSlice;

export const {
  fetchTicketsFail,
  fetchTicketsLoading,
  fetchTicketsSuccess,
  searchTickets,
} = actions;

export default reducer;

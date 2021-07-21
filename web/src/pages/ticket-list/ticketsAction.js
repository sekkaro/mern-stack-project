import { getAllTickets } from "../../api/ticketApi";
import {
  fetchTicketsFail,
  fetchTicketsLoading,
  fetchTicketsSuccess,
  searchTickets,
} from "./ticketsSlice";

export const fetchAllTickets = () => async (dispatch) => {
  dispatch(fetchTicketsLoading());

  try {
    const result = await getAllTickets();

    dispatch(fetchTicketsSuccess(result.data));
  } catch (err) {
    dispatch(fetchTicketsFail(err.message));
  }
};

export const filterSearchTicket = (keyword) => (dispatch) => {
  dispatch(searchTickets(keyword));
};

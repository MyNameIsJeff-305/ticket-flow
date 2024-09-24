import { csrfFetch } from "./csrf";

//CONSTANTS
const GETALLTICKETS = 'tickets/getAllTickets';
const GETMYTICKETS = 'tickets/getMyTickets';
const GETTICKET = 'tickets/getTicket';
const ADDTICKET = 'tickets/addTicket';
const UPDATETICKET = 'tickets/updateTicket';
const DELETETICKET = 'tickets/deleteTicket';

//ACTION CREATORS
const getAllTickets = (tickets) => ({
    type: GETALLTICKETS,
    payload: tickets
});

const getMyTickets = (tickets) => ({
    type: GETMYTICKETS,
    payload: tickets
});

const getTicket = (ticket) => ({
    type: GETTICKET,
    payload: ticket
});

const addTicket = (ticket) => ({
    type: ADDTICKET,
    payload: ticket
});

const updateTicket = (ticket) => ({
    type: UPDATETICKET,
    payload: ticket
});

const deleteTicket = (ticket) => ({
    type: DELETETICKET,
    payload: ticket
});

//THUNKS
export const getAllTicketsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/tickets');
    const tickets = await res.json();
    dispatch(getAllTickets(tickets));
};

export const getMyTicketsThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/tickets/current`);
    const tickets = await res.json();
    dispatch(getMyTickets(tickets));
}

export const getTicketThunk = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/tickets/${id}`);
    const ticket = await res.json();
    dispatch(getTicket(ticket));
}

export const addTicketThunk = (ticket) => async (dispatch) => {
    const res = await csrfFetch('/api/tickets', {
        method: 'POST',
        body: JSON.stringify(ticket)
    });
    const newTicket = await res.json();
    dispatch(addTicket(newTicket));
}

export const updateTicketThunk = (ticket) => async (dispatch) => {
    const res = await csrfFetch(`/api/tickets/${ticket.id}`, {
        method: 'PUT',
        body: JSON.stringify(ticket)
    });
    const updatedTicket = await res.json();
    dispatch(updateTicket(updatedTicket));
}

export const deleteTicketThunk = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/tickets/${id}`, {
        method: 'DELETE'
    });
    const deletedTicket = await res.json();
    dispatch(deleteTicket(deletedTicket));
}

//REDUCER
const initialState = {};

const ticketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETALLTICKETS: {
            return { ...state, allTickets: action.payload };
        }
        case GETMYTICKETS: {
            return { ...state, myTickets: action.payload };
        }
        case GETTICKET: {
            return { ...state, ticket: action.payload };
        }
        case ADDTICKET: {
            return { ...state, myTickets: [...state.myTickets, action.payload] };
        }
        case UPDATETICKET: {
            return { ...state, myTickets: state.myTickets.map(ticket => ticket.id === action.payload.id ? action.payload : ticket) };
        }
        case DELETETICKET: {
            return { ...state, myTickets: state.myTickets.filter(ticket => ticket.id !== action.payload.id) };
        }
        default:
            return state;
    }
}

export default ticketsReducer;
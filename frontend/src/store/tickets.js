import { csrfFetch } from "./csrf";

//CONSTANTS
const GET_ALL_TICKETS = 'tickets/getAllTickets';
const GET_TODAY_TICKETS = 'tickets/getTodayTickets';
const GET_TOTAL_TICKETS_AMOUNT = 'tickets/getTotalTicketsAmount';
const GET_MY_TICKETS = 'tickets/getMyTickets';
const GET_TICKET = 'tickets/getTicket';
const ADD_TICKET = 'tickets/addTicket';
const ASSIGN_TICKET_TO_USER = 'tickets/assignTicketToUser';
const UNASSIGN_TICKET_FROM_USER = 'tickets/unassignTicketFromUser';
const UPDATE_TICKET = 'tickets/updateTicket';
const DELETE_TICKET = 'tickets/deleteTicket';
const GET_TICKET_BY_HASH = 'tickets/getTicketByHash';

const ADD_NOTE_TO_TICKET = 'tickets/addNoteToTicket';

//ACTION CREATORS
const getAllTickets = (tickets) => ({
    type: GET_ALL_TICKETS,
    payload: tickets
});

const getTodayTickets = (tickets) => ({
    type: GET_TODAY_TICKETS,
    payload: tickets
});

const getTotalTicketsAmount = (amount) => ({
    type: GET_TOTAL_TICKETS_AMOUNT,
    payload: amount
});

const getTicketByHash = (ticket) => ({
    type: GET_TICKET_BY_HASH,
    payload: ticket
});

const getMyTickets = (tickets) => ({
    type: GET_MY_TICKETS,
    payload: tickets
});

const getTicket = (ticket) => ({
    type: GET_TICKET,
    payload: ticket
});

const addTicket = (ticket) => ({
    type: ADD_TICKET,
    payload: ticket
});

const assignTicketToUser = (assignment) => ({
    type: ASSIGN_TICKET_TO_USER,
    payload: assignment
});

const unassignTicketFromUser = (assignment) => ({
    type: UNASSIGN_TICKET_FROM_USER,
    payload: assignment
});

const updateTicket = (ticket) => ({
    type: UPDATE_TICKET,
    payload: ticket
});

const deleteTicket = (ticket) => ({
    type: DELETE_TICKET,
    payload: ticket
});

const addNoteToTicket = (note) => ({
    type: ADD_NOTE_TO_TICKET,
    payload: note
});

//THUNKS
export const getAllTicketsThunk = (page, size, filters = null, sortLabel, sortValue) => async (dispatch) => {
    let query = `/api/tickets?page=${page}&size=${size}&sort=${sortLabel}&value=${sortValue}`;

    if (filters) {
        const { statusList, client, search } = filters;
        if (statusList) query += `&statusList=${statusList.join(',')}`;
        if (client) query += `&client=${client}`;
        if (search) query += `&search=${search}`;
    }

    const res = await csrfFetch(query);
    const tickets = await res.json();
    dispatch(getAllTickets(tickets));
};

export const getTodayTicketsThunk = (page, size) => async (dispatch) => {
    const res = await csrfFetch(`/api/tickets?page=${page}&size=${size}&today=true`);
    const tickets = await res.json();
    dispatch(getTodayTickets(tickets));
};

export const getTicketByHashThunk = (hashedId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tickets/track/${hashedId}`);
    const ticket = await res.json();
    dispatch(getTicketByHash(ticket));
}

export const getTotalTicketsAmountThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/tickets/`);
    const amount = await res.json();
    dispatch(getTotalTicketsAmount(amount.length));
}

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

export const assignTicketToUserThunk = (ticketId, userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tickets/${ticketId}/assignees`, {
        method: 'POST',
        body: JSON.stringify({ userId })
    });
    const assignment = await res.json();
    dispatch(assignTicketToUser(assignment));
};

export const unassignTicketFromUserThunk = (ticketId, userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tickets/${ticketId}/assignees/${userId}`, {
        method: 'DELETE'
    });

    // Handle both 204 or JSON response
    let assignment = null;
    try {
        assignment = await res.json();
    } catch {
        assignment = { ticketId, userId };
    }

    dispatch(unassignTicketFromUser(assignment));
};

export const updateTicketThunk = (ticketId, updatedData) => async (dispatch) => {
    const res = await csrfFetch(`/api/tickets/${ticketId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData)
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

export const addNoteToTicketThunk = (note, ticketId) => async (dispatch) => {
    const res = await csrfFetch(`/api/tickets/${ticketId}/notes`, {
        method: 'POST',
        body: JSON.stringify(note)
    });
    const newNote = await res.json();
    dispatch(addNoteToTicket(newNote));
}


//REDUCER
const initialState = {
    allTickets: [],
    todayTickets: [],
    myTickets: [],
    ticket: {},
    ticketByHash: {},
    totalTicketsAmount: 0
};

const ticketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_TICKETS: {
            return { ...state, allTickets: action.payload };
        }
        case GET_TODAY_TICKETS: {
            return { ...state, todayTickets: action.payload };
        }
        case GET_TOTAL_TICKETS_AMOUNT: {
            return { ...state, totalTicketsAmount: action.payload };
        }
        case GET_TICKET_BY_HASH: {
            return { ...state, ticketByHash: action.payload };
        }
        case GET_MY_TICKETS: {
            return { ...state, myTickets: action.payload };
        }
        case GET_TICKET: {
            return { ...state, ticket: action.payload };
        }
        case ADD_TICKET: {
            return { ...state, myTickets: [...state.myTickets, action.payload] };
        }

        case ASSIGN_TICKET_TO_USER: {
            return {
                ...state,
                allTickets: state.allTickets.map(ticket => {
                    if (ticket.id === action.payload.ticketId) {
                        return {
                            ...ticket,
                            TicketEmployees: [
                                ...ticket.TicketEmployees,
                                { userId: action.payload.userId, User: action.payload.user || {} }
                            ]
                        };
                    }
                    return ticket;
                })
            };
        }
        
        case UNASSIGN_TICKET_FROM_USER: {
            return {
                ...state,
                allTickets: state.allTickets.map(ticket => {
                    if (ticket.id === action.payload.ticketId) {
                        return {
                            ...ticket,
                            TicketEmployees: ticket.TicketEmployees.filter(te => te.userId !== action.payload.userId)
                        };
                    } else {
                        return ticket;
                    }
                })
            };
        }

        case UPDATE_TICKET: {
            return {
                ...state,
                allTickets: state.allTickets.map(ticket => {
                    if (ticket.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return ticket;
                    }
                })
            }
        }
        case DELETE_TICKET: {
            return { ...state, myTickets: state.myTickets.filter(ticket => ticket.id !== action.payload.id) };
        }
        default:
            return state;
    }
}

export default ticketsReducer;
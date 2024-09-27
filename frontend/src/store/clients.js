import { csrfFetch } from './csrf';

//Constants
const GET_ALL_CLIENTS = 'clients/getAllClients';
const GET_ONE_CLIENT = 'clients/getOneClient';
const ADD_CLIENT = 'clients/addClient';
const EDIT_CLIENT = 'clients/editClient';
const DELETE_CLIENT = 'clients/deleteClient';

//Action Creators
const getAllClients = (clients) => ({
    type: GET_ALL_CLIENTS,
    payload: clients
});

const getOneClient = (client) => ({
    type: GET_ONE_CLIENT,
    payload: client
});

const addClient = (client) => ({
    type: ADD_CLIENT,
    payload: client
});

const editClient = (client) => ({
    type: EDIT_CLIENT,
    payload: client
});

const deleteClient = (client) => ({
    type: DELETE_CLIENT,
    payload: client
});

//Thunks
export const getAllClientsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/clients');
    const clients = await res.json();
    dispatch(getAllClients(clients));
};

export const getOneClientThunk = (clientId) => async (dispatch) => {
    const res = await csrfFetch(`/api/clients/${clientId}`);
    const client = await res.json();
    dispatch(getOneClient(client));
};

export const addClientThunk = (client) => async (dispatch) => {
    const res = await csrfFetch('/api/clients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
    });
    const newClient = await res.json();
    dispatch(addClient(newClient));
};

export const editClientThunk = (client) => async (dispatch) => {
    const res = await csrfFetch(`/api/clients/${client.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
    });
    const updatedClient = await res.json();
    dispatch(editClient(updatedClient));
};

export const deleteClientThunk = (clientId) => async (dispatch) => {
    const res = await csrfFetch(`/api/clients/${clientId}`, {
        method: 'DELETE'
    });
    const deletedClient = await res.json();
    dispatch(deleteClient(deletedClient));
};

//Reducer
const initialState = {
    allClients: [],
    client: {}
};

const clientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CLIENTS: {
            return { ...state, allClients: action.payload };
        }
        case GET_ONE_CLIENT: {
            return { ...state, client: action.payload };
        }
        case ADD_CLIENT: {
            return { ...state, allClients: [...state.allClients, action.payload] };
        }
        case EDIT_CLIENT: {
            return {
                ...state,
                allClients: state.allClients.map(client => {
                    if (client.id === action.payload.id) {
                        return action.payload;
                    }
                    return client;
                })
            };
        }
        case DELETE_CLIENT: {
            return {
                ...state,
                allClients: state.allClients.filter(client => client.id !== action.payload.id)
            };
        }
        default:
            return state;
    }
}

export default clientsReducer;
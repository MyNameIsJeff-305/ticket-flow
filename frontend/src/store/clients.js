import { csrfFetch } from './csrf';

//Constants
const GET_ALL_CLIENTS = 'clients/getAllClients';
const GET_TOTAL_CLIENTS_AMOUNT = 'clients/getTotalClientsAmount';
const GET_ONE_CLIENT = 'clients/getOneClient';
const ADD_CLIENT = 'clients/addClient';
const EDIT_CLIENT = 'clients/editClient';
const DELETE_CLIENT = 'clients/deleteClient';

//Action Creators
const getAllClients = (clients) => ({
    type: GET_ALL_CLIENTS,
    payload: clients
});

const getTotalClientsAmount = (amount) => ({
    type: GET_TOTAL_CLIENTS_AMOUNT,
    payload: amount
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
export const getAllClientsThunk = (page, size) => async (dispatch) => {
    const res = await csrfFetch(`/api/clients?page=${page}&size=${size}`);
    const clients = await res.json();
    dispatch(getAllClients(clients));
};

export const getTotalClientsAmountThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/clients/');
    const amount = await res.json();
    dispatch(getTotalClientsAmount(amount.length));
};

export const getOneClientThunk = (clientId) => async (dispatch) => {
    const res = await csrfFetch(`/api/clients/${clientId}`);
    const client = await res.json();
    dispatch(getOneClient(client));
};

export const addClientThunk = (client) => async (dispatch) => {
    const formData = new FormData();

    console.log(client, "THIS IS CLIENT");

    // Append the client information to the form data
    if (client.firstName) formData.append('firstName', client.firstName); else formData.append('firstName', '');
    if (client.lastName) formData.append('lastName', client.lastName); else formData.append('lastName', '');
    if (client.companyName) formData.append('companyName', client.companyName); else formData.append('companyName', '');
    if (client.email) formData.append('email', client.email);
    if (client.phoneNumber) formData.append('phoneNumber', client.phoneNumber);

    // Append the profile picture (file) if it exists
    if (client.profilePicUrl) {
        formData.append('image', client.profilePicUrl); // 'image' is the field name used in multer
    }

    const res = await csrfFetch('/api/clients', {
        method: 'POST',
        headers: {
            // No need to set 'Content-Type' to 'multipart/form-data', it will be automatically handled
        },
        body: formData
    });

    const newClient = await res.json();
    dispatch(addClient(newClient));
};

export const editClientThunk = (clientId, formData) => async (dispatch) => {
    const res = await csrfFetch(`/api/clients/${clientId}`, {
        method: 'PUT',
        body: formData, // FormData automatically sets the correct headers
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
    client: {},
    totalClientsAmount: 0
};

const clientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CLIENTS: {
            return { ...state, allClients: action.payload };
        }
        case GET_TOTAL_CLIENTS_AMOUNT: {
            return { ...state, totalClientsAmount: action.payload };
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
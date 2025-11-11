import { csrfFetch } from './csrf';

//CONSTANTS
const GET_ALL_USERS = "session/getAllUsers";
const GET_TOTAL_USERS_AMOUNT = "session/getTotalUsersAmount";
const GET_USER = "session/getUser";
const ADD_USER = "session/addUser";
const EDIT_USER = "session/editUser";
const DEACTIVATE_USER = "session/deactivateUser";
const REMOVE_USER = "session/removeUser";
const SET_USER = "session/setUser";

//ACTION CREATORS
const getAllUsers = (users) => {
    return {
        type: GET_ALL_USERS,
        payload: users
    }
}

const getTotalUsersAmount = (amount) => {
    return {
        type: GET_TOTAL_USERS_AMOUNT,
        payload: amount
    };
};

const getUser = (user) => {
    return {
        type: GET_USER,
        payload: user
    };
};

const addUser = (user) => {
    return {
        type: ADD_USER,
        payload: user
    }
}

const editUser = (user) => {
    return {
        type: EDIT_USER,
        payload: user
    }
}

const deactivateUser = (user) => {
    return {
        type: DEACTIVATE_USER,
        payload: user
    };
}

const removeUser = () => {
    return {
        type: REMOVE_USER
    };
};

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

//THUNKS
export const getAllUsersThunk = (
    page = 1,
    size = 100,
    sortLabel = 'firstName',
    sortValue = 'ASC'
) => async (dispatch) => {
    try {
        const response = await csrfFetch(
            `/api/users?page=${page}&size=${size}&sort=${sortLabel}&value=${sortValue}`
        );

        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        dispatch(getAllUsers(data));
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};


export const getTotalUsersAmountThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/users');
    const data = await response.json();
    dispatch(getTotalUsersAmount(data.length));
};

export const getUserThunk = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}`);
    const data = await response.json();
    dispatch(getUser(data));
    return response;
};

export const addUserThunk = (user) => async (dispatch) => {

    const { username, firstName, lastName, email, password, profilePicUrl } = user;

    const formData = new FormData();

    formData.append("username", username);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePicUrl) formData.append("image", profilePicUrl);

    const response = await csrfFetch("/api/users/add-user", {
        method: "POST",
        body: formData
    });

    const newUser = await response.json();
    dispatch(addUser(newUser));
};

export const updateUserThunk = (userId, updatedUser) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append("image", updatedUser.profilePicUrl);
        formData.append("firstName", updatedUser.firstName);
        formData.append("lastName", updatedUser.lastName);
        formData.append("password", updatedUser.password);

        const options = {
            method: "PUT",
            body: formData
        };

        const response = await csrfFetch(`/api/users/${parseInt(userId)}`, options);

        if (response.ok) {
            const user = await response.json();
            dispatch(editUser(user));
        } else if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                return data;
            } else {
                throw new Error('An error occurred. Please try again.');
            }
        }
        return response.user;
    } catch (e) {
        console.error("Error in updateUserThunk:", e);
        return e;
    }
};

export const deactivateUserThunk = (user) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${user.id}/deactivate`, {
        method: "PUT"
    });
    dispatch(deactivateUser(user));
    return response;
};

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: "DELETE"
    });
    dispatch(removeUser());
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password, image } = user;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    if (image) formData.append("image", image);

    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

//REDUCER
const initialState = { user: null, selectedUser: null, allUsers: [], totalUsersAmount: 0 };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USERS: {
            const newState = { ...state };
            newState.allUsers = action.payload;
            return newState;
        }
        case GET_TOTAL_USERS_AMOUNT: {
            const newState = { ...state };
            newState.totalUsersAmount = action.payload;
            return newState;
        }
        case GET_USER: {
            const newState = { ...state };
            newState.selectedUser = action.payload;
            return newState;
        }
        case ADD_USER: {
            return { ...state, allUsers: [...state.allUsers, action.payload] };
        }
        case EDIT_USER: {
            const newState = { ...state };
            newState.allUsers = newState.allUsers.map(user =>
                user.id === action.payload.id ? action.payload : user
            );
            return newState;
        }
        case DEACTIVATE_USER: {
            const newState = { ...state };
            newState.allUsers = newState.allUsers.map(user =>
                user.id === action.payload.id ? action.payload : user
            );
            return newState;
        }
        case REMOVE_USER: {
            const newState = { ...state };
            newState.user = null;
            return newState;
        }
        case SET_USER: {
            return { ...state, user: action.payload };
        }
        default:
            return state;
    }
};

export default sessionReducer;
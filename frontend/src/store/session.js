import { csrfFetch } from './csrf';


//CONSTANTS
const SET_USER = "session/setUser";
const GET_ALL_USERS = "session/getAllUsers";
const REMOVE_USER = "session/removeUser";
const EDIT_USER = "session/editUser";

//ACTION CREATORS
const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    };
};

const editUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

const getAllUsers = (users) => {
    return {
        type: GET_ALL_USERS,
        payload: users
    }
}


//THUNKS
export const login = (user) => async (dispatch) => {
    // console.log(user, "THIS IS USER");
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

    console.log(username, "THIS IS USERNAME");

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

export const updateUserThunk = (userId, form) => async (dispatch) => {
    const { img_url, firstName, lastName, password } = form;
    try {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append("image", img_url);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("password", password);

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

export const getAllUsersThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/users');
    const data = await response.json();
    // console.log(data, "THIS IS DATA");
    dispatch(getAllUsers(data));
    // return response;
}

//REDUCER
const initialState = { user: null, allUsers: [] };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case EDIT_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            return { ...state, user: null };
        case GET_ALL_USERS: {
            // console.log(action, "THIS IS ACTION PAYLOAD");
            return { ...state, allUsers: action.payload }
        }
        default:
            return state;
    }
};

export default sessionReducer;
import { csrfFetch } from './csrf';


//CONSTANTS
const SET_USER = "session/setUser";
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


//THUNKS
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

export const updateUserThunk = (userId, form) => async (dispatch) => {
    const { img_url } = form
    try {

        console.log(img_url, "THIS IS IMG_URL");

        const formData = new FormData();

        formData.append('userId', userId)
        formData.append("image", img_url);

        const option = {
            method: "PUT",
            headers: { 'Content-Type': 'multipart/form-data' },
            body: formData
        }

        const response = await csrfFetch(`/api/users/${userId}`, option);

        if (response.ok) {
            const user = await response.json();
            dispatch(editUser(user));

        } else if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                return data
            } else {
                throw new Error('An error occured. Please try again.')
            }
        }
        return response;
    } catch (e) {
        return e
    }
}

//REDUCER
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case EDIT_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            return { ...state, user: null };
        default:
            return state;
    }
};

export default sessionReducer;
import { csrfFetch } from './csrf';

//Constants
const GET_ALL_PARTS = 'parts/getAllParts';
const GET_PART = 'parts/getPart';
const ADD_PART = 'parts/addPart';
const EDIT_PART = 'parts/editPart';
const DELETE_PART = 'parts/deletePart';

//Action Creators
const getAllParts = (parts) => ({
    type: GET_ALL_PARTS,
    payload: parts
});

const getPart = (part) => ({
    type: GET_PART,
    payload: part
});

const addPart = (part) => ({
    type: ADD_PART,
    payload: part
});

const editPart = (part) => ({
    type: EDIT_PART,
    payload: part
});

const deletePart = (part) => ({
    type: DELETE_PART,
    payload: part
});

//Thunks
export const getAllPartsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/parts');
    const parts = await res.json();
    dispatch(getAllParts(parts));
};

export const getPartThunk = (partId) => async (dispatch) => {
    const res = await csrfFetch(`/api/parts/${partId}`);
    const part = await res.json();
    dispatch(getPart(part));
};

export const addPartThunk = (part) => async (dispatch) => {
    const res = await csrfFetch('/api/parts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(part)
    });
    const newPart = await res.json();
    dispatch(addPart(newPart));
}

export const editPartThunk = (part) => async (dispatch) => {
    const res = await csrfFetch(`/api/parts/${part.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(part)
    });
    const updatedPart = await res.json();
    dispatch(editPart(updatedPart));
}

export const deletePartThunk = (partId) => async (dispatch) => {
    const res = await csrfFetch(`/api/parts/${partId}`, {
        method: 'DELETE'
    });
    const deletedPart = await res.json();
    dispatch(deletePart(deletedPart));
}

//Reducer
const initialState = {
    allParts: [],
    part: {}
};

const partsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PARTS: {
            return { ...state, allParts: action.payload };
        }
        case GET_PART: {
            return { ...state, part: action.payload };
        }
        case ADD_PART: {
            return { ...state, allParts: [...state.allParts, action.payload] };
        }
        case EDIT_PART: {
            return {
                ...state,
                allParts: state.allParts.map(part => {
                    if (part.id === action.payload.id) {
                        return action.payload;
                    }
                    return part;
                })
            };
        }
        case DELETE_PART: {
            return {
                ...state,
                allParts: state.allParts.filter(part => part.id !== action.payload.id)
            };
        }
        default:
            return state;
    }
}

export default partsReducer;
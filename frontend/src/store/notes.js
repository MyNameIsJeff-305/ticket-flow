import { csrfFetch } from './csrf';

//Constants
const GET_ALL_NOTES = 'notes/getAllNotes';
const GET_NOTE = 'notes/getNote';
const EDIT_NOTE = 'notes/editNote';
const DELETE_NOTE = 'notes/deleteNote';

//Action Creators
const getAllNotes = (notes) => ({
    type: GET_ALL_NOTES,
    payload: notes
});

const getNote = (note) => ({
    type: GET_NOTE,
    payload: note
});

const editNote = (note) => ({
    type: EDIT_NOTE,
    payload: note
});

const deleteNote = (note) => ({
    type: DELETE_NOTE,
    payload: note
});

//Thunks
export const getAllNotesThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/notes');
    const notes = await res.json();
    dispatch(getAllNotes(notes));
};

export const getNoteThunk = (noteId) => async (dispatch) => {
    const res = await csrfFetch(`/api/notes/${noteId}`);
    const note = await res.json();
    dispatch(getNote(note));
};

export const editNoteThunk = (note) => async (dispatch) => {
    const res = await csrfFetch(`/api/notes/${note.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    });
    const updatedNote = await res.json();
    dispatch(editNote(updatedNote));
};

export const deleteNoteThunk = (noteId) => async (dispatch) => {
    const res = await csrfFetch(`/api/notes/${noteId}`, {
        method: 'DELETE'
    });
    const deletedNote = await res.json();
    dispatch(deleteNote(deletedNote));
};

//Reducer
const initialState = {
    allNotes: [],
    note: {}
};

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_NOTES: {
            return { ...state, allNotes: action.payload };
        }
        case GET_NOTE: {
            return { ...state, note: action.payload };
        }
        case EDIT_NOTE: {
            return {
                ...state,
                allNotes: state.allNotes.map(note => {
                    if (note.id === action.payload.id) {
                        return action.payload;
                    }
                    return note;
                })
            };
        }
        case DELETE_NOTE: {
            return {
                ...state,
                allNotes: state.allNotes.filter(note => note.id !== action.payload.id)
            };
        }
        default:
            return state;
    }
}

export default notesReducer;
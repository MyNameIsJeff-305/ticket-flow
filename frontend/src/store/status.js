//CONSTANTS
const GETALLSTATUS = 'status/getAllStatus';
const GETSTATUS = 'status/getStatus';
const ADDSTATUS = 'status/addStatus';
const EDITSTATUS = 'status/editStatus';
const DELETESTATUS = 'status/deleteStatus';

//ACTION CREATORS
const getAllStatus = (status) => ({
    type: GETALLSTATUS,
    payload: status
});

const getStatus = (status) => ({
    type: GETSTATUS,
    payload: status
});

const addStatus = (status) => ({
    type: ADDSTATUS,
    payload: status
});

const editStatus = (status) => ({
    type: EDITSTATUS,
    payload: status
});

const deleteStatus = (status) => ({
    type: DELETESTATUS,
    payload: status
});

//THUNKS
export const getAllStatusThunk = () => async (dispatch) => {
    const res = await fetch('/api/status');

    const data = await res.json();
    // console.log(data, "THIS IS DATA");
    if(data.message){
        return dispatch(getAllStatus([]));
    }
    dispatch(getAllStatus(data));
}

export const getStatusThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/status/${id}`);
    const data = await res.json();
    dispatch(getStatus(data));
}

export const addStatusThunk = (status) => async (dispatch) => {
    const res = await fetch('/api/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(status)
    });
    const data = await res.json();
    dispatch(addStatus(data));
}

export const editStatusThunk = (status) => async (dispatch) => {
    const res = await fetch(`/api/status/${status.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(status)
    });
    const data = await res.json();
    dispatch(editStatus(data));
}

export const deleteStatusThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/status/${id}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    dispatch(deleteStatus(data));
}

//REDUCER
const initialState = {
    allStatus: [],
    thisStatus: {}
};

const statusReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETALLSTATUS: {
            return { ...state, allStatus: action.payload }
        }
        case GETSTATUS: {
            return { ...state, thisStatus: action.payload }
        }
        case ADDSTATUS: {
            return { ...state, allStatus: [...state.status, action.payload] }
        }
        case EDITSTATUS: {
            return { ...state, allStatus: state.allStatus.map(status => status.id === action.payload.id ? action.payload : status) }
        }
        case DELETESTATUS: {
            return { ...state, allStatus: state.allStatus.filter(status => status.id !== action.payload.id) }
        }
        default:
            return state;
    }
}

export default statusReducer;
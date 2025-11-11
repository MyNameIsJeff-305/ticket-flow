import { csrfFetch } from "./csrf";

//Constants
const GET_ALL_STOCK_PER_LOCATION = 'stockLocations/getAllStockPerLocation';
// const GET_STOCK_MOVEMENTS = 'stockLocations/getStockMovements';
// const INCREASE_STOCK_MANUALLY = 'stockLocations/increaseStockManually';
// const ADJUST_INVENTORY = 'stockLocations/adjustInventory';

//Action Creators
const getAllStockPerLocation = (stockLocations) => ({
    type: GET_ALL_STOCK_PER_LOCATION,
    payload: stockLocations
});

//Thunks
export const getAllStockPerLocationThunk = (partId) => async (dispatch) => {
    const res = await csrfFetch(`/api/parts/${partId}/stock`);
    const stockLocations = await res.json();
    dispatch(getAllStockPerLocation(stockLocations));
}

//Reducer
const initialState = { 
    stockLocations: []
};

export default function stockLocationsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_STOCK_PER_LOCATION:
            newState = { ...state };
            newState.stockLocations = action.payload;
            return newState;
        default:
            return state;
    }
}
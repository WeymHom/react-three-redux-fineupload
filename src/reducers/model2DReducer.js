import { MODEL_2D_FETCHING_START,MODEL_2D_FETCHING_SUCCESS,MODEL_2D_FETCHING_FAILURE } from '../constants/actionsType';

const initialState = {
    data: [],
    isFetching: false,
    error: false
};

export default function model2DReducer (state = initialState, action) {
    switch (action.type) {
        case MODEL_2D_FETCHING_START:
            return {
                ...state,
                data: [],
                isFetching: false
            };
        case MODEL_2D_FETCHING_SUCCESS:
            return {
                ...state,
                isFetching: true,
                data: action.data
            };
        case MODEL_2D_FETCHING_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        default:
            return state
    }
}

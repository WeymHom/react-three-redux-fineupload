import { CAD_MTL_START,CAD_MTL_SUCCESS,CAD_MTL_FAILURE } from '../constants/actionsType';

const initialState = {
    data: [],
    isFetching: false,
    error: false
};

export default function mtlReducer (state = initialState, action) {
    switch (action.type) {
        case CAD_MTL_START:
            return {
                ...state,
                data: [],
                isFetching: false
            };
        case CAD_MTL_SUCCESS:
            return {
                ...state,
                isFetching: true,
                data: action.data
            };
        case CAD_MTL_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        default:
            return state
    }
}

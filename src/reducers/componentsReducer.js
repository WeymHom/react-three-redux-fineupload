import { COMPONENTS_FETCHING_START,COMPONENTS_FETCHING_SUCCESS,COMPONENTS_FETCHING_FAILURE } from '../constants/actionsType';

const initialState = {
    data: [],
    isFetching: false,
    error: false
};

export default function componentsReducer (state = initialState, action) {
    switch (action.type) {
        case COMPONENTS_FETCHING_START:
            return {
                ...state,
                data: [],
                isFetching: false
            };
        case COMPONENTS_FETCHING_SUCCESS:
            return {
                ...state,
                isFetching: true,
                data: action.data
            };
        case COMPONENTS_FETCHING_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        default:
            return state
    }
}

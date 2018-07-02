import { OUTLINE_FETCHING_START,OUTLINE_FETCHING_SUCCESS,OUTLINE_FETCHING_FAILURE } from '../constants/actionsType';

const initialState = {
    data: [],
    isFetching: false,
    error: false
};

export default function outlineReducer (state = initialState, action) {
    switch (action.type) {
        case OUTLINE_FETCHING_START:
            return {
                ...state,
                data: [],
                isFetching: false
            };
        case OUTLINE_FETCHING_SUCCESS:
            return {
                ...state,
                isFetching: true,
                data: action.data
            };
        case OUTLINE_FETCHING_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        default:
            return state
    }
}

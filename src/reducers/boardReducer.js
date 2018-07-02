import { BOARD_FETCHING_START,BOARD_FETCHING_SUCCESS,BOARD_FETCHING_FAILURE } from '../constants/actionsType';

const initialState = {
    data: [],
    isFetching: false,
    error: false
};

export default function boardReducer (state = initialState, action) {
    switch (action.type) {
        case BOARD_FETCHING_START:
            return {
                ...state,
                data: [],
                isFetching: false
            };
        case BOARD_FETCHING_SUCCESS:
            return {
                ...state,
                isFetching: true,
                data: action.data
            };
        case BOARD_FETCHING_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        default:
            return state
    }
}

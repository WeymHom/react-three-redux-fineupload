import { CAD_IMAGES_START,CAD_IMAGES_SUCCESS,CAD_IMAGES_FAILURE } from '../constants/actionsType';

const initialState = {
    data: [],
    isFetching: false,
    error: false
};

export default function imagesReducer (state = initialState, action) {
    switch (action.type) {
        case CAD_IMAGES_START:
            return {
                ...state,
                data: [],
                isFetching: false
            };
        case CAD_IMAGES_SUCCESS:
            return {
                ...state,
                isFetching: true,
                data: action.data
            };
        case CAD_IMAGES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        default:
            return state
    }
}

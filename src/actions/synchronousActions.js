import {SHOW_OR_HIDE} from '../constants/actionsType';

export function isShow(typeShow) {
    return {
        type: SHOW_OR_HIDE,
        typeShow
    }
}


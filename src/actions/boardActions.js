import * as types from '../constants/actionsType';
import axios from "axios";

//开始获取数据
function boardFetchStart() {
    return {
        type:types.BOARD_FETCHING_START
    }
}

//获取数据成功的action
function boardFetchSuccess(data) {
    return {
        type: types.BOARD_FETCHING_SUCCESS,
        data
    }
}

//获取数据失败
function boardFetchFailure(err) {
    return {
        type:types.BOARD_FETCHING_FAILURE,
        err
    }
}

export function boardFetchPosts(cad_id) {

    return function (dispatch) {
        dispatch(boardFetchStart());
        return (
            axios.get(`api/v2.0/cad/board?cad_id=${cad_id}`)
                .then(res => {
                    dispatch(boardFetchSuccess(res))
                })
                .catch(dispatch(boardFetchFailure()))
        )
    }
}



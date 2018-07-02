import * as types from '../constants/actionsType';
import axios from "axios";

//开始获取数据
function outlineFetchStart(req) {
    return {
        type:types.OUTLINE_FETCHING_START,
        req
    }
}

//获取数据成功的action
function outlineFetchSuccess(data) {
    return {
        type: types.OUTLINE_FETCHING_SUCCESS,
        data
    }
}
//获取数据失败
function outlineFetchFailure(err) {
    return {
        type:types.OUTLINE_FETCHING_FAILURE,
        err
    }
}
//
export function outlineFetchPosts(cadID) {

    return function (dispatch) {
        dispatch(outlineFetchStart());
        return (
            axios.get(`/api/v2.0/cad/outline?cad_id=${cadID}`)
            .then(res => {
                dispatch(outlineFetchSuccess(res))
            })
            .catch(dispatch(outlineFetchFailure()))
        )
    }
}

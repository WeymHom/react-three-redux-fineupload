import {CAD_MTL_START,CAD_MTL_SUCCESS,CAD_MTL_FAILURE} from '../constants/actionsType';
import axios from "axios";

//开始获取数据
function mtlFetchStart(req) {
    return {
        type:CAD_MTL_START,
        req
    }
}

//获取数据成功的action
function mtlFetchSuccess(data) {
    return {
        type: CAD_MTL_SUCCESS,
        data
    }
}
//获取数据失败
function mtlFetchFailure(err) {
    return {
        type:CAD_MTL_FAILURE,
        err
    }
}
//
export function mtlFetchPosts(cadID) {

    return function (dispatch) {
        dispatch(mtlFetchStart());
        return (
            axios.get(`/api/v2.0/cad/outline/mtl?cad_id=${cadID}`)
            .then(res => {
                dispatch(mtlFetchSuccess(res))
            })
            .catch(dispatch(mtlFetchFailure()))
        )
    }
}

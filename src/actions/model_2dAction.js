import {MODEL_2D_FETCHING_START,MODEL_2D_FETCHING_SUCCESS,MODEL_2D_FETCHING_FAILURE} from '../constants/actionsType';
import axios from "axios";

//开始获取数据
function modelFetchStart() {
    return {
        type:MODEL_2D_FETCHING_START
    }
}

//获取数据成功的action
function modelFetchSuccess(data) {
    return {
        type: MODEL_2D_FETCHING_SUCCESS,
        data
    }
}
//获取数据失败
function modelFetchFailure(err) {
    return {
        type:MODEL_2D_FETCHING_FAILURE,
        err
    }
}
//
export function modelFetchPosts(refdes,cadID) {

    return function (dispatch) {
        dispatch(modelFetchStart());
        return (
            axios.get(`/api/v2.0/cad/2d_model/${refdes}?cad_id=${cadID}`)
                .then(res => {
                    dispatch(modelFetchSuccess(res))
                })
                .catch(error =>{dispatch(modelFetchFailure(error))})
        )
    }
}

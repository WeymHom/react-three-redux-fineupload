import {CAD_IMAGES_START,CAD_IMAGES_SUCCESS,CAD_IMAGES_FAILURE} from '../constants/actionsType';
import axios from 'axios';

//开始获取数据
function imagesFetchStart(req) {
    return {
        type:CAD_IMAGES_START,
        req
    }
}

//获取数据成功的action
function imagesFetchSuccess(data) {
    return {
        type: CAD_IMAGES_SUCCESS,
        data
    }
}
//获取数据失败
function imagesFetchFailure(err) {
    return {
        type:CAD_IMAGES_FAILURE,
        err
    }
}
//
export function imagesFetchPosts(cadID) {

    return function (dispatch) {
        dispatch(imagesFetchStart());
        return (
            axios.get(`/api/v2.0/cad/outline/uvmap?cad_id=${cadID}`)
            .then(res => {
                dispatch(imagesFetchSuccess(res))
            })
            .catch(dispatch(imagesFetchFailure()))
        )
}
}

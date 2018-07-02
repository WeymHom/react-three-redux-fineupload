import * as types from '../constants/actionsType';
import axios from 'axios';

//开始获取数据
function componentsFetchStart() {
    return {
        type:types.COMPONENTS_FETCHING_START

    }
}

//获取数据成功的action
function componentsFetchSuccess(data) {
    return {
        type: types.COMPONENTS_FETCHING_SUCCESS,
        data
    }
}
//获取数据失败
function componentsFetchFailure(err) {
    return {
        type:types.COMPONENTS_FETCHING_FAILURE,
        err
    }
}
//
export function componentsFetchPosts(cadID) {

    return function (dispatch) {
        dispatch(componentsFetchStart());
        return (
            axios.get(`/api/v2.0/cad/components?cad_id=${cadID}`)
                .then(res => {
                    dispatch(componentsFetchSuccess(res))
                })
                .catch(dispatch(componentsFetchFailure()))
        )
    }
}

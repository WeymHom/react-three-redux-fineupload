import { combineReducers } from 'redux';
import doShowReducer from './show_or_hide';
import boardReducer from './boardReducer';
import componentsReducer from './componentsReducer';
import model2DReducer from './model2DReducer';
import outlineReducer from './outlineReducer';
import imagesReducer from './imagesReducer';
import mtlReducer from './mtlReducer';

const reducers = combineReducers({
    doShowReducer,
    boardReducer,
    componentsReducer,
    model2DReducer,
    outlineReducer,
    imagesReducer,
    mtlReducer
});
export default reducers
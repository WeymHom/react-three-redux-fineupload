import {SHOW_OR_HIDE} from '../constants/actionsType';

const doShowReducer = function (state = {typeShow:true}, action) {
  switch (action.type){
      case SHOW_OR_HIDE:
          return {
              ...state,
              typeShow:action.typeShow
          };
      default:
          return state;
  }
};

export default doShowReducer;
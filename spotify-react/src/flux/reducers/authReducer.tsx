import {
    AUTHORIZE,
    USER_LOADED,
    CHECK_AUTHORIZE
  } from '../actions/types';
  
  const initialState = {
    isAuthenticated: false
  };
  
  export default function(state = initialState, action: any) {
    switch (action.type) {
      case CHECK_AUTHORIZE:
        return {
          ...state,
          isAuthenticated: action.payload,
          loading: false
        };
      default:
        return state;
    }
  }
  

  
  
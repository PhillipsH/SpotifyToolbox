import {
    AUTHORIZE,
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
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
  

  
  
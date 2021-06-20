import {
    AUTHORIZE,
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR
  } from '../actions/types';
  
  const initialState = {
    isAuthenticated: false
  };
  
  export default function(state = initialState, action: any) {
    switch (action.type) {
      case AUTHORIZE:
        console.log("ALALALAL")
        return {
          ...state,
          details: action.payload,
          loading: false
        };
      default:
        return state;
    }
  }
  
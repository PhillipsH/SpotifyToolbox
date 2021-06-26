import axios from 'axios';
import {AUTHORIZE, USER_LOADING, USER_LOADED, AUTH_ERROR} from './types';
import cookie, { Cookies } from 'react-cookie'

export const authorize = () => (dispatch: Function) => {
  let cookie = new Cookies();

  console.log("in authorize action ran")
  dispatch({
    type: authorize,
    payload: "yo"
  })
};
import axios from 'axios';
import {AUTHORIZE, USER_LOADING, USER_LOADED, AUTH_ERROR} from './types';
import Cookies from 'react-cookie';

export const authorize = () => (dispatch: Function) => {
  console.log(document.cookie)
  axios
  .get('http://localhost:5000/authenticate/checkAuth', {withCredentials: true})
  .then(res =>
    console.log(res)
);
};
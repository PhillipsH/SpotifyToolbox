import axios from 'axios';
import {AUTHORIZE, USER_LOADING, USER_LOADED, AUTH_ERROR} from './types';

  export const authorize = () => (dispatch: Function) => {
    console.log("blue")
    axios
      .get('/authenticate')
      .then(res =>
        console.log(res)
      );
  };
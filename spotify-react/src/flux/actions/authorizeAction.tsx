import axios from 'axios';
import {AUTHORIZE, CHECK_AUTHORIZE} from './types';
import Cookies from 'react-cookie';

export const checkAuthorize = () => (dispatch: Function) => {
  axios
  .get('http://localhost:5000/authenticate/checkAuth', {withCredentials: true})
  .then(res => {
    dispatch({
      type:CHECK_AUTHORIZE,
      payload:res.data
    })
    }
  );
};

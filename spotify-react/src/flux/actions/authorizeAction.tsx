import axios from 'axios';
import {CHECK_AUTHORIZE} from './types';

export const checkAuthorize = () => (dispatch: Function) => {
  const CHECK_AUTHORIZE_URL = 'http://localhost:5000/api/authenticate/checkAuth'
  axios
  .get(CHECK_AUTHORIZE_URL, {withCredentials: true})
  .then(res => {
    dispatch({
      type:CHECK_AUTHORIZE,
      payload:res.data
    })
    }
  );
};

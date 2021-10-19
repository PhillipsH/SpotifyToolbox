import axios from 'axios';
import {CHECK_AUTHORIZE} from './types';

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

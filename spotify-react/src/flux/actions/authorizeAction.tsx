import axios from 'axios';
import {CHECK_AUTHORIZE} from './types';

export const checkAuthorize = () => (dispatch: Function) => {
  const url = process.env.REACT_APP_API_IP
  console.log(url)
  const CHECK_AUTHORIZE_URL = `http://${process.env.REACT_APP_API_IP}/api/authenticate/checkAuth`
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

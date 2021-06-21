import axios from 'axios';
import {AUTHORIZE, USER_LOADING, USER_LOADED, AUTH_ERROR} from './types';

export const authorize = () => (dispatch: Function) => {
  axios
    .get('http://localhost:5000/spotify/getLikedSongs')
    .then(res =>
      console.log(res)
    );
};
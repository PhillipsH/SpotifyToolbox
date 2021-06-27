import axios from 'axios';
import {AUTHORIZE, USER_LOADING, USER_LOADED, AUTH_ERROR} from './types';

export const getLikedSongs = (code) => (dispatch: Function) => {
  console.log("getLikedSongs ran")
  console.log(code)
  axios
    .get('http://localhost:5000/spotify/getLikedSongs?code=' + code)
    .then(res =>
      console.log(res)
  );
};
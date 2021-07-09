import axios from 'axios';
import {GET_LIKED_SONGS, GET_PLAYLIST_SONGS} from './types';

export const getLikedSongs = () => (dispatch: Function) => {
  console.log("getting Liked songs Action")
  axios
    .get('http://localhost:5000/spotify/getLikedSongs', {withCredentials: true})
    .then(res =>
      dispatch({
        type:GET_LIKED_SONGS,
        payload:res.data
      })
  );
};
export const getPlaylistSongs = () => (dispatch: Function) => {
  console.log("getting playlist songs")
  axios
    .get('http://localhost:5000/spotify/getPlaylistSongs', {withCredentials: true})
    .then(res =>
      dispatch({
        type:GET_PLAYLIST_SONGS,
        payload:res.data
      })
  );
};
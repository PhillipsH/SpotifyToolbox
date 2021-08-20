import axios from 'axios';
import {GET_LIKED_SONGS, GET_PLAYLIST_SONGS, SET_CURRENT_LIST, ITEMS_LOADING, REMOVE_SONGS, SET_LIKED_SONGS, SET_PLAYLIST_SONGS, GET_PROFILE} from './types';

export const getLikedSongs = () => (dispatch: Function) => {
  dispatch(setItemsLoading());
  
  axios
    .get('http://localhost:5000/spotify/getLikedSongs', {withCredentials: true})
    .then(res =>{
      let currentSongs = {
        currentType: "LIKED_SONGS",
        currentList: res.data
      }
      dispatch({
        type:GET_LIKED_SONGS,
        payload:currentSongs
      })
    }  
  );
};
export const getPlaylistSongs = () => async(dispatch: Function) => {
  dispatch(setItemsLoading());
  let res = await axios.get('http://localhost:5000/spotify/getPlaylistSongs', {withCredentials: true});
  await dispatch({
    type:GET_PLAYLIST_SONGS,
    payload:res.data
  })
};

export const removeSongs = (songs) => async(dispatch: Function) => {
  dispatch(setItemsLoading());
  let res = await axios.post('http://localhost:5000/spotify/addToPlaylist', {withCredentials: true});
  await dispatch({
    type:REMOVE_SONGS,
    payload:res.data
  })
};

export const addToPlaylist = (songs) => async(dispatch: Function) => {
  dispatch(setItemsLoading());
  let res = await axios.get('http://localhost:5000/spotify/removeSongs', {withCredentials: true});
  await dispatch({
    type:REMOVE_SONGS,
    payload:res.data
  })
};

export const getProfile = (songs) => async(dispatch: Function) => {
  dispatch(setItemsLoading());
  let res = await axios.get('http://localhost:5000/spotify/getProfile', {withCredentials: true});
  await dispatch({
    type:GET_PROFILE,
    payload:res.data
  })
};

export const setCurrentSongList = (currentList, currentType, dispatch) => (dispatch: Function) => {
  dispatch(setItemsLoading());
  let currentSongs = {
    currentType: currentType,
    currentList: currentList
  }
  dispatch({
    type:SET_CURRENT_LIST,
    payload:currentSongs
  })
};

export const setLikedSongs = (likedSongsNew) => (dispatch: Function) => {
  dispatch(setItemsLoading());
  dispatch({
    type:SET_LIKED_SONGS,
    payload:likedSongsNew
  })
};

export const setPlaylistSongs = (playlistSongsNew) => (dispatch: Function) => {
  dispatch(setItemsLoading());
  dispatch({
    type:SET_PLAYLIST_SONGS,
    payload:playlistSongsNew
  })
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};

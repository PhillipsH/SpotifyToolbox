import axios from 'axios';
import {GET_LIKED_SONGS, GET_PLAYLIST_SONGS, SET_CURRENT_LIST, ITEMS_LOADING, REMOVE_SONGS, SET_LIKED_SONGS, SET_PLAYLIST_SONGS} from './types';
import store from '../store';

export const getLikedSongs = () => (dispatch: Function) => {
  console.log("GET LIKED SONGS")
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
  console.log("GET PLAYLIST SONGS")
  dispatch(setItemsLoading());
  let res = await axios.get('http://localhost:5000/spotify/getPlaylistSongs', {withCredentials: true});
  await dispatch({
    type:GET_PLAYLIST_SONGS,
    payload:res.data
  })
  console.log(store.getState())
};

export const removeSongs = (songs) => async(dispatch: Function) => {
  console.log("REMOVE SONGS")
  dispatch(setItemsLoading());
  let res = await axios.post('http://localhost:5000/spotify/addToPlaylist', {withCredentials: true});
  await dispatch({
    type:REMOVE_SONGS,
    payload:res.data
  })
  console.log(store.getState())
};

export const addToPlaylist = (songs) => async(dispatch: Function) => {
  console.log("ADD TO PLAYLIST")
  dispatch(setItemsLoading());
  let res = await axios.get('http://localhost:5000/spotify/removeSongs', {withCredentials: true});
  await dispatch({
    type:REMOVE_SONGS,
    payload:res.data
  })
  console.log(store.getState())
};

// export const getPlaylistDifferenceFromLiked = (currentList, currentType, dispatch) => (dispatch: Function) => {
//   dispatch(setItemsLoading());
//   console.log("SETTING LIST")
//   let currentSongs = {
//     currentType: currentType,
//     currentList: currentList
//   }
//   dispatch({
//     type:SET_CURRENT_LIST,
//     payload:currentSongs
//   })
//   console.log(store.getState())
// };

// export const getLikedSongsDifference = (currentList, currentType, dispatch) => (dispatch: Function) => {
//   dispatch(setItemsLoading());
//   console.log("SETTING LIST")
//   let currentSongs = {
//     currentType: currentType,
//     currentList: currentList
//   }
//   dispatch({
//     type:SET_CURRENT_LIST,
//     payload:currentSongs
//   })
//   console.log(store.getState())
// };

export const setCurrentSongList = (currentList, currentType, dispatch) => (dispatch: Function) => {
  dispatch(setItemsLoading());
  console.log("SETTING LIST")
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
  console.log(likedSongsNew)
  dispatch({
    type:SET_LIKED_SONGS,
    payload:likedSongsNew
  })
};

export const setPlaylistSongs = (playlistSongsNew) => (dispatch: Function) => {
  dispatch(setItemsLoading());
  console.log(playlistSongsNew)
  dispatch({
    type:SET_PLAYLIST_SONGS,
    payload:playlistSongsNew
  })
};

export const setItemsLoading = () => {
  console.log("LOADING")
  return {
    type: ITEMS_LOADING
  };
};

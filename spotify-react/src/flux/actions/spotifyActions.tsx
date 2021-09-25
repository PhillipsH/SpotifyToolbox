import axios from 'axios';
import {GET_LIKED_SONGS, GET_LIKED_ISONGS, GET_PLAYLIST_SONGS, SET_CURRENT_LIST, ITEMS_LOADING, REMOVE_SONGS, SET_LIKED_SONGS, SET_PLAYLIST_SONGS, GET_PROFILE, SET_ARTISTS} from './types';
import { ITrack, IAlbum, IArtist } from '../../types/interfaces';
export const getLikedSongs = () => (dispatch: Function) => {
  dispatch(setItemsLoading());
  
  axios
    .get('http://localhost:5000/spotify/getLikedSongs', {withCredentials: true})
    .then(res =>{
      let currentSongs = {
        currentType: "LIKED_SONGS",
        currentList: res.data
      }
      let trackList : ITrack[] = []
      for(let i in res.data){
        let currentArtist: IArtist = {
          artist_id : res.data[i].track.artists[0].id,
          artist_name : res.data[i].track.artists[0].name,
        }
        let currentAlbum: IAlbum = {
          album_id: res.data[i].track.album.id,
          album_name : res.data[i].track.album.name,
          artist : currentArtist,
        }
        let currentTrack: ITrack = {
          track_id: res.data[i].track.id,
          track_name: res.data[i].track.name,
          track_uri : res.data[i].track.uri,
          artist: currentArtist,
          album: currentAlbum,
          release_date: res.data[i].id,
          added_at: res.data[i].id,
          popularity: res.data[i].id,
          linked_from_id: res.data[i].track.linked_from != undefined ? res.data[i].track.linked_from.id : undefined,
        }
        trackList.push(currentTrack)

      }

      let currentISongs = {
        currentType: "LIKED_ISONGS",
        currentList: trackList
      }

      dispatch({
        type:GET_LIKED_SONGS,
        payload:currentSongs
      })
      dispatch({
        type:GET_LIKED_ISONGS,
        payload:currentISongs
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

export const setArtists = (artists) => (dispatch: Function) => {
  dispatch(setItemsLoading());
  dispatch({
    type:SET_ARTISTS,
    payload: artists
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

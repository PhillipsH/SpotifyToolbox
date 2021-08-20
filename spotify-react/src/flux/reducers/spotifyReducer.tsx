import {
    GET_LIKED_SONGS,GET_PLAYLIST_SONGS,SET_CURRENT_LIST, ITEMS_LOADING, REMOVE_SONGS, SET_LIKED_SONGS, SET_PLAYLIST_SONGS, GET_PROFILE
  } from '../actions/types';
  
  const initialState = {
    likedSongs: [],
    playlistSongs : [],
    currentSongs : {currentType : "LIKED_SONGS", currentList:[]},
    profile:{},
    loading: false
  };
  export default function(state = initialState, action: any) {
    switch (action.type) {
      case GET_PROFILE:
        return {
          ...state,
          profile: action.payload,
          loading: false
      };
      case GET_LIKED_SONGS:
        return {
          ...state,
          likedSongs: action.payload.currentList,
          currentSongs: action.payload,
          loading: false
      };
      case GET_PLAYLIST_SONGS:
        return {
          ...state,
          playlistSongs: action.payload,
          loading: false
        };
      case REMOVE_SONGS:
        return{
          ...state,
          loading: false
        };
      case ITEMS_LOADING:
        return{
          ...state,
          loading: true,
          currentSongs : {currentType : "LOADING", currentList:[]}
        };
      case SET_LIKED_SONGS:
        return{
          ...state,
          likedSongs:action.payload,
          loading:false
        }
      case SET_PLAYLIST_SONGS:
        return{
          ...state,
          playlistSongs:action.payload,
          loading:false
        }
      case SET_CURRENT_LIST:
        return {
          ...state,
          currentSongs: action.payload,
          loading: false
        };
      default:
        return state;
    }
  }
  
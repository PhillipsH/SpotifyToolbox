import {
    GET_LIKED_SONGS,GET_PLAYLIST_SONGS,SET_CURRENT_LIST, ITEMS_LOADING
  } from '../actions/types';
  
  const initialState = {
    likedSongs: [],
    playlistSongs : [],
    currentSongs : {currentType : "LIKED_SONGS", currentList:[]},
    loading: false
  };
  export default function(state = initialState, action: any) {
    switch (action.type) {
      case GET_LIKED_SONGS:
        console.log(action.payload)
        return {
          ...state,
          likedSongs: action.payload.currentList,
          currentSongs: action.payload,
          loading: false
      };
      case GET_PLAYLIST_SONGS:
        console.log(action.payload)
        return {
          ...state,
          playlistSongs: action.payload,
          loading: false
      };
      
      case SET_CURRENT_LIST:
        return {
          ...state,
          currentSongs: action.payload,
          loading: false
      };
      case ITEMS_LOADING:
        return{
          ...state,
          loading: true,
          currentSongs : {currentType : "LOADING", currentList:[]}
        }
      default:
        return state;
    }
  }
  
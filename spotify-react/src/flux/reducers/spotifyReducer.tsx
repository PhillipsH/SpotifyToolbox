import { ITrack } from '../../types/interfaces';
import {
    GET_LIKED_SONGS,GET_LIKED_ISONGS, GET_PLAYLIST_SONGS,SET_CURRENT_LIST, ITEMS_LOADING, REMOVE_SONGS, SET_LIKED_SONGS, SET_PLAYLIST_SONGS, GET_PROFILE, SET_ARTISTS, COMPLETE_SETUP, START_SETUP
  } from '../actions/types';
  
  const initialState = {
    likedSongs: {
      list : [],
      initialized : false
    },
    playlistSongs : {
      list: [],
      initialized: false
    },
    artists: {
      list:[],
      initialized:false
    },
    profile:{
      initialized:false
    },
  };
  export default function(state = initialState, action: any) {
    switch (action.type) {
      case START_SETUP:
        return {
          ...state,
          likedSongs:{
            list: action.payload.likedSongs,
            initialized: true
          },
          artists:{
            list: action.payload.artists,
            initialized: true
          },
      };
      case GET_PROFILE:
        return {
          ...state,
          profile: {
            ...action.payload,
            initialized: true}
      };
      case GET_LIKED_SONGS:
        return {
          ...state,
          likedSongs: action.payload.currentList,
          currentSongs: action.payload
      };
      case GET_LIKED_ISONGS:
        return {
          ...state,
          likedSongsList: action.payload.currentList,
          currentSongs: action.payload,
          loading: false
      };
      case GET_PLAYLIST_SONGS:
        return {
          ...state,
          playlistSongs: {
            list: action.payload,
            initialized: true
          },
        };
      case REMOVE_SONGS:
        console.log("IN REDUCER")
        let likedSongsList:ITrack = JSON.parse(JSON.stringify(state.likedSongs.list)) 
        let likedSongsDict:any = {}

        for(let songIndex in likedSongsList){
          const id = likedSongsList[songIndex].linked_from_id ?? likedSongsList[songIndex].track_id
          likedSongsDict[id] = likedSongsList[songIndex]
        }
        console.log(likedSongsDict)
        console.log(action.payload)
        for(let dupeId in action.payload){
          console.log(dupeId)
          if(likedSongsDict[action.payload[dupeId]] !== undefined){
            console.log(likedSongsDict[action.payload[dupeId]])
            delete likedSongsDict[action.payload[dupeId]]
          }
          console.log(likedSongsDict[action.payload[dupeId]])
        }

        let currentSongsNew:ITrack[] = Object.values(likedSongsDict);
        console.log(currentSongsNew.length)
        return{
          ...state,
          likedSongs:{
            ...state.likedSongs,
            list : currentSongsNew
          }
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
      case SET_ARTISTS:
        return {
          ...state,
          artists: action.payload,
          loading: false
        };
      default:
        return state;
    }
  }
  
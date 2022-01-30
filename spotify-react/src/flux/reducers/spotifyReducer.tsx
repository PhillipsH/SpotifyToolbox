import { ITrack } from "../../types/interfaces";
import {
  GET_LIKED_SONGS,
  GET_LIKED_ISONGS,
  GET_PLAYLIST_SONGS,
  SET_CURRENT_LIST,
  ITEMS_LOADING,
  REMOVE_SONGS,
  SET_LIKED_SONGS,
  SET_PLAYLIST_SONGS,
  GET_PROFILE,
  SET_ARTISTS,
  COMPLETE_SETUP,
  START_SETUP,
  ADD_TO_PLAYLIST,
  ADD_SONGS,
  GET_TOP
} from "../actions/types";

const topRanking = {
  artists: {
    short_term:{
      initialized:false,
      list: []
    },
    medium_term:{
      initialized:false,
      list: []
    },    
    long_term:{
      initialized:false,
      list: []
    },
  },
  tracks:{
    short_term:{
      initialized:false,
      list: []
    },
    medium_term:{
      initialized:false,
      list: []
    },    
    long_term:{
      initialized:false,
      list: []
    },
  }
}

const initialState = {
  likedSongs: {
    list: [],
    initialized: false,
  },
  playlistSongs: {
    list: [],
    initialized: false,
  },
  artists: {
    list: [],
    initialized: false,
  },
  profile: {
    initialized: false,
  },
  topRanking: topRanking
  
};
export default function (state = initialState, action: any) {
  switch (action.type) {
    case START_SETUP:
      return {
        ...state,
        likedSongs: {
          list: action.payload.likedSongs,
          initialized: true,
        },
        artists: {
          list: action.payload.artists,
          initialized: true,
        },
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: {
          ...action.payload,
          initialized: true,
        },
      };
    case GET_LIKED_SONGS:
      return {
        ...state,
        likedSongs: action.payload.currentList,
        currentSongs: action.payload,
      };
    case GET_PLAYLIST_SONGS:
      return {
        ...state,
        playlistSongs: {
          list: action.payload,
          initialized: true,
        },
      };
    case ADD_TO_PLAYLIST:
      let newPlaylistSongs = JSON.parse(
        JSON.stringify(state.playlistSongs.list)
      );
      let playlistDict = {};

      for (let i in newPlaylistSongs) {
        const currentId =
          newPlaylistSongs[i].linked_from_id ?? newPlaylistSongs[i].track_id;
        playlistDict[currentId] = newPlaylistSongs[i];
      }
      for (let i in action.payload.playlistSongs) {
        const currentId =
          action.payload.playlistSongs[i].linked_from_id ??
          action.payload.playlistSongs[i].track_id;
        if (!(currentId in playlistDict)) {
          newPlaylistSongs.push(action.payload.playlistSongs[i]);
        }
      }
      return {
        ...state,
        playlistSongs: {
          ...state.playlistSongs,
          list: newPlaylistSongs,
        },
      };
    case REMOVE_SONGS:
      let likedSongsList: ITrack = JSON.parse(
        JSON.stringify(state.likedSongs.list)
      );
      let likedSongsDict: any = {};

      for (let songIndex in likedSongsList) {
        const id =
          likedSongsList[songIndex].linked_from_id ??
          likedSongsList[songIndex].track_id;
        likedSongsDict[id] = likedSongsList[songIndex];
      }
      for (let dupeId in action.payload) {
        if (likedSongsDict[action.payload[dupeId]] !== undefined) {
          delete likedSongsDict[action.payload[dupeId]];
        }
      }

      let currentSongsNew: ITrack[] = Object.values(likedSongsDict);
      return {
        ...state,
        likedSongs: {
          ...state.likedSongs,
          list: currentSongsNew,
        },
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
        currentSongs: { currentType: "LOADING", currentList: [] },
      };
    case SET_LIKED_SONGS:
      return {
        ...state,
        likedSongs: action.payload,
        loading: false,
      };
    case SET_PLAYLIST_SONGS:
      return {
        ...state,
        playlistSongs: action.payload,
        loading: false,
      };
    case SET_CURRENT_LIST:
      return {
        ...state,
        currentSongs: action.payload,
        loading: false,
      };
    case SET_ARTISTS:
      return {
        ...state,
        artists: action.payload,
        loading: false,
      };
    case GET_TOP:
      const rankType = action.payload.rankType
      const rankTime = action.payload.rankTime
      return{
        ...state,
        topRanking: {
          ...topRanking,
          [rankType]: {
            ...state.topRanking[rankType],
            [rankTime] : {
              list: action.payload.data,
              initialized: true
            }
          }
        }
      }
    default:
      return state;
  }
}

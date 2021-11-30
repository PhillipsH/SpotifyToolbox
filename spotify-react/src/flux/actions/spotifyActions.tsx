import axios from "axios";
import {
  GET_LIKED_SONGS,
  GET_PLAYLIST_SONGS,
  SET_CURRENT_LIST,
  REMOVE_SONGS,
  SET_LIKED_SONGS,
  GET_PROFILE,
  SET_ARTISTS,
  START_SETUP,
  ADD_TO_PLAYLIST,
  ADD_SONGS,
  GET_TOP,
} from "./types";
import {
  ITrack,
  IAlbum,
  IPlaylistTrack,
  IArtist,
  IArtistHash,
} from "../../types/interfaces";
import { addLoading, removeLoading } from "./uiAction";
import { LoadingTypes } from "./types";

async function getSavedTracks() {
  const LIKED_SONGS_URI = "http://localhost:5000/spotify/getLikedSongs";
  let res = await axios.get(LIKED_SONGS_URI, { withCredentials: true });
  let trackList: ITrack[] = [];

  for (let i in res.data) {
    if (res.data[i] == undefined) {
      console.log(res.data);
    }
    let currentArtist: IArtist = {
      artist_id: res.data[i].track.artists[0].id,
      artist_name: res.data[i].track.artists[0].name,
      counter: 0,
    };
    let currentAlbum: IAlbum = {
      album_id: res.data[i].track.album.id,
      album_name: res.data[i].track.album.name,
      album_images: res.data[i].track.album.images,
      artist: currentArtist,
    };
    let currentTrack: ITrack = {
      track_id: res.data[i].track.id,
      track_name: res.data[i].track.name,
      track_uri: res.data[i].track.uri,
      artist: currentArtist,
      album: currentAlbum,
      release_date: res.data[i].track.album.release_date,
      added_at: res.data[i].added_at,
      popularity: res.data[i].track.popularity,
      linked_from_id:
        res.data[i].track.linked_from !== undefined
          ? res.data[i].track.linked_from.id
          : undefined,
    };
    trackList.push(currentTrack);
  }
  return trackList;
}

export const getPlaylistsTracks = async () => {
  let res = await axios.get("http://localhost:5000/spotify/getPlaylistSongs", {
    withCredentials: true,
  });

  let trackList: IPlaylistTrack[] = [];

  for (let i in res.data) {
    let currentArtist: IArtist = {
      artist_id: res.data[i].track.artists[0].id,
      artist_name: res.data[i].track.artists[0].name,
      counter: 0,
    };
    let currentAlbum: IAlbum = {
      album_id: res.data[i].track.album.id,
      album_name: res.data[i].track.album.name,
      album_images: res.data[i].track.album.images,
      artist: currentArtist,
    };
    let currentTrack: IPlaylistTrack = {
      track_id: res.data[i].track.id,
      track_name: res.data[i].track.name,
      track_uri: res.data[i].track.uri,
      artist: currentArtist,
      album: currentAlbum,
      release_date: res.data[i].id,
      added_at: res.data[i].id,
      popularity: res.data[i].id,
      linked_from_id:
        res.data[i].track.linked_from !== undefined
          ? res.data[i].track.linked_from.id
          : undefined,
      playlist_name: res.data[i].playlist_name,
      playlist_id: res.data[i].playlist_id,
    };
    trackList.push(currentTrack);
  }

  return trackList;
};

async function getArtists(trackList) {
  const GET_GENRE_URI = "http://localhost:5000/spotify/getGenre";

  let uniqueArtists: IArtistHash = {};
  let artistArr: string[] = [];
  let promiseArr: any = [];

  for (let i in trackList) {
    if (!(trackList[i].artist.artist_id in uniqueArtists)) {
      let currentArtist: IArtist = {
        artist_id: trackList[i].artist.artist_id,
        artist_name: trackList[i].artist.artist_name,
        counter: 1,
      };
      uniqueArtists[trackList[i].artist.artist_id] = currentArtist;
      artistArr.push(trackList[i].artist.artist_id);
    } else {
      let count = uniqueArtists[trackList[i].artist.artist_id].counter ?? 1;
      uniqueArtists[trackList[i].artist.artist_id].counter = count + 1;
    }
  }

  while (artistArr.length > 0) {
    promiseArr.push(
      await axios.get(GET_GENRE_URI, {
        withCredentials: true,
        params: {
          artists: artistArr.splice(0, 50),
        },
      })
    );
  }

  let artistArrays: any = await Promise.all(promiseArr);

  for (let arrIndex in artistArrays) {
    for (let artistIndex in artistArrays[arrIndex].data.artists) {
      if (
        artistArrays[arrIndex].data.artists[artistIndex].id in uniqueArtists
      ) {
        uniqueArtists[
          artistArrays[arrIndex].data.artists[artistIndex].id
        ].genres = artistArrays[arrIndex].data.artists[artistIndex].genres;
        uniqueArtists[
          artistArrays[arrIndex].data.artists[artistIndex].id
        ].popularity =
          artistArrays[arrIndex].data.artists[artistIndex].popularity;
        uniqueArtists[
          artistArrays[arrIndex].data.artists[artistIndex].id
        ].followers =
          artistArrays[arrIndex].data.artists[artistIndex].followers.total;
        uniqueArtists[
          artistArrays[arrIndex].data.artists[artistIndex].id
        ].images = artistArrays[arrIndex].data.artists[artistIndex].images;
      } else {
        console.log(artistArrays[arrIndex].data.artists[artistIndex].id);
      }
    }
  }

  for (let i in trackList) {
    try {
      if (trackList[i].artist.artist_id in uniqueArtists) {
        trackList[i].artist = uniqueArtists[trackList[i].artist.artist_id];
        trackList[i].genres =
          uniqueArtists[trackList[i].artist.artist_id].genres;
      }
    } catch {}
  }
  let uniqueArtistsArr: IArtist[] = [];
  uniqueArtistsArr = Object.values(uniqueArtists);
  // uniqueArtistsArr.sort((a,b) => b.counter - a.counter)
  return uniqueArtistsArr;
}

export const startSetup = () => async (dispatch: Function) => {
  // dispatch(setItemsLoading());
  dispatch(addLoading([LoadingTypes.LikedSongs, LoadingTypes.Artists]));

  let trackList = await getSavedTracks();
  let uniqueArtists = await getArtists(trackList);
  dispatch({
    type: START_SETUP,
    payload: {
      artists: uniqueArtists,
      likedSongs: trackList,
    },
  });

  dispatch(removeLoading([LoadingTypes.LikedSongs, LoadingTypes.Artists]));
};

export const getLikedSongs = () => (dispatch: Function) => {
  // dispatch(setItemsLoading());
  dispatch(addLoading(LoadingTypes.LikedSongs));

  axios
    .get("http://localhost:5000/spotify/getLikedSongs", {
      withCredentials: true,
    })
    .then((res) => {
      let currentSongs = {
        currentType: "LIKED_SONGS",
        currentList: res.data,
      };
      let trackList: ITrack[] = [];
      for (let i in res.data) {
        let currentArtist: IArtist = {
          artist_id: res.data[i].track.artists[0].id,
          artist_name: res.data[i].track.artists[0].name,
          counter: 0,
        };
        let currentAlbum: IAlbum = {
          album_id: res.data[i].track.album.id,
          album_name: res.data[i].track.album.name,
          album_images: res.data[i].track.album.images,
          artist: currentArtist,
        };
        let currentTrack: ITrack = {
          track_id: res.data[i].track.id,
          track_name: res.data[i].track.name,
          track_uri: res.data[i].track.uri,
          artist: currentArtist,
          album: currentAlbum,
          release_date: res.data[i].id,
          added_at: res.data[i].id,
          popularity: res.data[i].id,
          linked_from_id:
            res.data[i].track.linked_from !== undefined
              ? res.data[i].track.linked_from.id
              : undefined,
        };
        trackList.push(currentTrack);
      }

      dispatch({
        type: GET_LIKED_SONGS,
        payload: currentSongs,
      });

      dispatch(removeLoading([LoadingTypes.LikedSongs]));
    });
};

export const getPlaylistSongs = () => async (dispatch: Function) => {
  let res = await axios.get("http://localhost:5000/spotify/getPlaylistSongs", {
    withCredentials: true,
  });

  let trackList: IPlaylistTrack[] = [];

  for (let i in res.data) {
    let currentArtist: IArtist = {
      artist_id: res.data[i].track.artists[0].id,
      artist_name: res.data[i].track.artists[0].name,
      counter: 0,
    };
    let currentAlbum: IAlbum = {
      album_id: res.data[i].track.album.id,
      album_name: res.data[i].track.album.name,
      album_images: res.data[i].track.album.images,
      artist: currentArtist,
    };
    let currentTrack: IPlaylistTrack = {
      track_id: res.data[i].track.id,
      track_name: res.data[i].track.name,
      track_uri: res.data[i].track.uri,
      artist: currentArtist,
      album: currentAlbum,
      release_date: res.data[i].id,
      added_at: res.data[i].id,
      popularity: res.data[i].id,
      linked_from_id:
        res.data[i].track.linked_from !== undefined
          ? res.data[i].track.linked_from.id
          : undefined,
      playlist_name: res.data[i].playlist_name,
      playlist_id: res.data[i].playlist_id,
    };
    trackList.push(currentTrack);
  }

  dispatch({
    type: GET_PLAYLIST_SONGS,
    payload: trackList,
  });
  dispatch(removeLoading([LoadingTypes.PlaylistSongs]));
};

export const getProfile = () => async (dispatch: Function) => {
  dispatch(addLoading([LoadingTypes.Profile]));
  let res = await axios.get("http://localhost:5000/spotify/getProfile", {
    withCredentials: true,
  });
  await dispatch({
    type: GET_PROFILE,
    payload: res.data,
  });
  dispatch(removeLoading([LoadingTypes.Profile]));
};

export const removeSongs = (dupeIds) => async (dispatch: Function) => {
  // axios
  // .delete('http://localhost:5000/spotify/removeLikedSongs',
  // {withCredentials: true,
  // data : {
  //   songIds : dupeIds
  // }})
  console.log(dupeIds);
  dispatch({
    type: REMOVE_SONGS,
    payload: dupeIds,
  });
};

export const addLikedSongs = (songs) => async (dispatch: Function) => {
  let songIds: string[] = [];
  for (let i in songs) {
    const uri = songs[i].linked_from_uri ?? songs[i].track_id;
    songIds.push(uri);
  }

  axios.put("http://localhost:5000/spotify/addLikedSongs", {
    withCredentials: true,
    data: {
      songIds: songIds,
    },
  });

  dispatch({
    type: ADD_SONGS,
    payload: songs,
  });
};
// export function addToPlaylist(playlistSongs){
//   let songUris:string []= []
//   //getting all songs
//   for(let songIndex in playlistSongs){
//     songUris.push(playlistSongs[songIndex].track.uri)
//   }
//   let playlistData = {
//     songUris : songUris
//   }
//   // delete song from spotify through server api
//   console.log(playlistData)
//   axios
//   .post('http://localhost:5000/spotify/addToPlaylist', playlistData,
//   {withCredentials: true,})
//   .then(res =>{
//     console.log(res)
//   });
// }

export const addToPlaylist =
  (playlistSongs, playlistDetails) => async (dispatch: Function) => {
    console.log("ADD TO PLAYLIST ACTION");
    let songUris: string[] = [];
    for (let i in playlistSongs) {
      const uri =
        playlistSongs[i].track_uri ?? playlistSongs[i].linked_from_uri;
      songUris.push(uri);
    }

    const res = await axios.post(
      "http://localhost:5000/spotify/createPlaylist",
      { playlistDetails: playlistDetails },
      { withCredentials: true }
    );
    console.log(res.data);
    const playlistId = res.data;
    while (songUris.length > 0) {
      const playlistData = {
        playlistId: playlistId,
        songUris: songUris.splice(0, 100),
      };

      axios.post(
        "http://localhost:5000/spotify/addSongsToPlaylist",
        playlistData,
        {
          withCredentials: true,
        }
      );
    }
    // axios
    //   .post("http://localhost:5000/spotify/addSongsToPlaylist", playlistData, {
    //     withCredentials: true,
    //   })
    dispatch({
      type: ADD_TO_PLAYLIST,
      payload: playlistSongs,
    });
  };

export const setCurrentSongList =
  (currentList, currentType, dispatch) => (dispatch: Function) => {
    let currentSongs = {
      currentType: currentType,
      currentList: currentList,
    };
    dispatch({
      type: SET_CURRENT_LIST,
      payload: currentSongs,
    });
  };

export const setLikedSongs = (likedSongsNew) => (dispatch: Function) => {
  dispatch(addLoading(LoadingTypes.LikedSongs));
  dispatch({
    type: SET_LIKED_SONGS,
    payload: likedSongsNew,
  });
  dispatch(removeLoading(LoadingTypes.LikedSongs));
};

export const setArtists = (artists) => (dispatch: Function) => {
  // dispatch(setItemsLoading());
  dispatch({
    type: SET_ARTISTS,
    payload: artists,
  });
};

export const getTop = (rankType, rankTime) => async (dispatch: Function) => {
  // dispatch(setItemsLoading());
  const GET_TOP_URI = "http://localhost:5000/spotify/top";
  // let res = await axios.get(LIKED_SONGS_URI, { withCredentials: true });

  let res = await axios.get(GET_TOP_URI, {
    withCredentials: true,
    params: {
      rankType: rankType,
      rankTime: rankTime,
    },
  });
  let topArr:any = []
  console.log(rankType)
  if(rankType =="tracks"){
    for (let i in res.data) {
      console.log("pushing")
      if (res.data[i] == undefined) {
        console.log(res.data);
      }
      let currentArtist: IArtist = {
        artist_id: res.data[i].artists[0].id,
        artist_name: res.data[i].artists[0].name,
        counter: 0,
      };
      let currentAlbum: IAlbum = {
        album_id: res.data[i].album.id,
        album_name: res.data[i].album.name,
        album_images: res.data[i].album.images,
        artist: currentArtist,
      };
      let currentTrack: ITrack = {
        track_id: res.data[i].id,
        track_name: res.data[i].name,
        track_uri: res.data[i].uri,
        artist: currentArtist,
        album: currentAlbum,
        release_date: res.data[i].album.release_date,
        added_at: res.data[i].added_at,
        popularity: res.data[i].popularity,
      };
      topArr.push(currentTrack);
    }
  }else{
    console.log("other")
    topArr = res.data
  }
  dispatch({
    type: GET_TOP,
    payload: {
      data: topArr,
      rankType: rankType,
      rankTime: rankTime,
    },
  });
};

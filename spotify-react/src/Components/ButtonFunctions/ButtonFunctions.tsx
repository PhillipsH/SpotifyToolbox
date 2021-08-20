import React from "react";
import axios from "axios";
// import DuplicateSongs from './DuplicateSongs'
import { Button} from "reactstrap";
import { connect } from "react-redux";
import {
  getLikedSongs,
  getPlaylistSongs,
  setCurrentSongList,
  setItemsLoading,
  setPlaylistSongs,
} from "../../flux/actions/spotifyActions";
import duplicateImg from "../../Icons/copy-link.png";
import decadeImg from "../../Icons/age.png";
import arrowImg from "../../Icons/transfer-arrows.png";
import artistImg from "../../Icons/users.png";

//props.year, props

const ButtonFunctions = (props) => {
  let buttonStyle = "button-container";
  if (props.currentSongs.currentType === "LOADING") {
    buttonStyle = "button-container-hidden";
  }
  async function comparePlaylistToLiked() {
    props.setItemsLoading();
    let likedSongsObj: any = {};
    let likedSongsObjName: any = {}
    let likedSongsObjId: any = {}
    let playlistUniqueSongs: any = [];

    let playlistSongs = {};

    if (props.playlistSongs.length === 0) {
      let res = await axios.get(
        "http://localhost:5000/spotify/getPlaylistSongs",
        { withCredentials: true }
      );
      playlistSongs = res.data;
    } else {
      playlistSongs = props.playlistSongs;
    }

    // Create an object of props of all liked songs with the key being the isrc
    for (let index in props.likedSongs) {
      likedSongsObj[props.likedSongs[index].track.external_ids.isrc] =
        props.likedSongs[index];
        
      likedSongsObjName[props.likedSongs[index].track.name + props.likedSongs[index].track.artists[0].name] =
        props.likedSongs[index];
      
      if(props.likedSongs[index].track.linked_from !== undefined){
        likedSongsObjId[props.likedSongs[index].track.linked_from.id] = props.likedSongs[index]
      }else{
        likedSongsObjId[props.likedSongs[index].track.id] = props.likedSongs[index]
      }
    }

    for (let index in playlistSongs) {
      let id:string

      if(playlistSongs[index].track.linked_from !== undefined){
        id = playlistSongs[index].track.linked_from.id
      }else{
        id = playlistSongs[index].track.id
      }
      
      if(
        likedSongsObjName[playlistSongs[index].track.name + playlistSongs[index].track.artists[0].name] === undefined 
        && likedSongsObjId[id] === undefined
        && likedSongsObj[playlistSongs[index].track.external_ids.isrc] === undefined
        ){
        playlistUniqueSongs.push(playlistSongs[index]);
      }
    }

    props.setPlaylistSongs(playlistSongs);
    props.setCurrentSongList(playlistUniqueSongs, "PLAYLIST_UNIQUES_SONGS");
  }

  async function compareLikedSongs() {
    props.setItemsLoading();
    let playlistSongsObj: any = {};
    let uniqueLikedSongs: any = [];

    let playlistSongs = {};

    if (props.playlistSongs.length === 0) {
      let res = await axios.get(
        "http://localhost:5000/spotify/getPlaylistSongs",
        { withCredentials: true }
      );
      playlistSongs = res.data;
    } else {
      playlistSongs = props.playlistSongs;
    }

    //Create an object of props of all liked songs
    for (let index in playlistSongs) {
      playlistSongsObj[playlistSongs[index].track.external_ids.isrc] =
        playlistSongs[index];
    }
    // for every song in your playlists, checks if that song is in liked songs
    for (let index in props.likedSongs) {
      if (
        playlistSongsObj[props.likedSongs[index].track.external_ids.isrc] ===
        undefined
      ) {
        uniqueLikedSongs.push(props.likedSongs[index]);
      }
    }
    props.setPlaylistSongs(playlistSongs);
    props.setCurrentSongList(uniqueLikedSongs, "LIKED_UNIQUE_SONGS");
  }

  async function findDuplicates() {
    let likedSongsObj: any = {};
    let duplicateObj: any = {};

    //Create an object of props of all liked songs
    for (let index in props.likedSongs) {
      if (
        likedSongsObj[
          "" +
            props.likedSongs[index].track.name +
            props.likedSongs[index].track.artists[0].name
        ] === undefined
      ) {
        likedSongsObj[
          "" +
            props.likedSongs[index].track.name +
            props.likedSongs[index].track.artists[0].name
        ] = props.likedSongs[index];
      } else {
        if (
          duplicateObj[
            "" +
              props.likedSongs[index].track.name +
              props.likedSongs[index].track.artists[0].name
          ] === undefined
        ) {
          duplicateObj[
            "" +
              props.likedSongs[index].track.name +
              props.likedSongs[index].track.artists[0].name
          ] = [
            likedSongsObj[
              "" +
                props.likedSongs[index].track.name +
                props.likedSongs[index].track.artists[0].name
            ],
          ];
        }
        duplicateObj[
          "" +
            props.likedSongs[index].track.name +
            props.likedSongs[index].track.artists[0].name
        ].push(props.likedSongs[index]);
        // let bothSongs = [likedSongsObj["" + props.likedSongs[index].track.name + props.likedSongs[index].track.artists[0].name], props.likedSongs[index]]
        // duplicateSongs.push(bothSongs)
      }
    }
    let duplicateSongs: any = Object.values(duplicateObj);

    props.setCurrentSongList(duplicateSongs, "DUPLICATE_SONGS");
  }
  async function getDecadeSongs() {
    let decadeObj = {
      currentDecades: [],
      currentSongList: [],
      songDecadeList: {},
    };
    for (let index in props.likedSongs) {
      let date = new Date(props.likedSongs[index].track.album.release_date);
      let year = date.getFullYear();
      year = Math.floor(year / 10) * 10;
      if (decadeObj["songDecadeList"][year] === undefined) {
        decadeObj["songDecadeList"][year] = [props.likedSongs[index]];
      } else {
        decadeObj["songDecadeList"][year].push(props.likedSongs[index]);
      }
    }
    props.setCurrentSongList(decadeObj, "DECADE_SONGS");
  }

  async function getArtists() {
    let artistsRanking = {};
    for (let songIndex in props.likedSongs) {
      if (
        artistsRanking[props.likedSongs[songIndex].track.artists[0].name] ===
        undefined
      ) {
        artistsRanking[props.likedSongs[songIndex].track.artists[0].name] = 1;
      } else {
        artistsRanking[props.likedSongs[songIndex].track.artists[0].name]++;
      }
    }

    let sortedArtistRank: any = [];
    for (let artist in artistsRanking) {
      let artistObj = {
        artistName: artist,
        artistCounter: artistsRanking[artist],
      };
      sortedArtistRank.push(artistObj);
    }

    sortedArtistRank.sort(function (a: any, b: any) {
      return a.artistCounter - b.artistCounter;
    });

    let artistObj = {
      sortedArtistRank: sortedArtistRank,
      currentArtistList: sortedArtistRank,
    };
    props.setCurrentSongList(artistObj, "ARTIST_RANK");
  }

  return (
    <div id={buttonStyle}>
      <div className="button-board">
        <Button
          className="function-button"
          onClick={comparePlaylistToLiked}
          color="primary"
        >
          <img src={arrowImg} alt="arrow" className="button-img"></img>
          <h6>Find Songs in Playlist not in Liked</h6>
        </Button>
        <br></br>
        <Button
          className="function-button"
          onClick={compareLikedSongs}
          color="warning"
        >
          <img src={arrowImg} alt="arrow" className="button-img"></img>
          <h6>Find Songs in Liked not in Playlist</h6>
        </Button>
        <br></br>
        <Button
          className="function-button"
          onClick={findDuplicates}
          color="success"
        >
          <img src={duplicateImg} alt="duplicate" className="button-img"></img>
          <h6>Find Duplicates</h6>
        </Button>
        <br></br>
      </div>
      <div className="button-board">
        <Button
          className="function-button"
          onClick={getDecadeSongs}
          color="info"
        >
          <img src={decadeImg} alt="age" className="button-img"></img>
          <h6>Decade</h6>
        </Button>
        <br></br>
        <Button
          className="function-button"
          onClick={getArtists}
          color="danger"
        >
          <img src={artistImg} alt="artist" className="button-img"></img>
          <h6>Get Artist</h6>
        </Button>
        <br></br>
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  likedSongs: state.spotify.likedSongs,
  playlistSongs: state.spotify.playlistSongs,
  currentSongs: state.spotify.currentSongs,
  loading: state.spotify.loading,
});

export default connect(mapStateToProps, {
  getLikedSongs,
  getPlaylistSongs,
  setCurrentSongList,
  setItemsLoading,
  setPlaylistSongs,
})(ButtonFunctions);

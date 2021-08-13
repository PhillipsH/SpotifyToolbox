import React, { useState, useEffect } from "react";
import { Button, Spinner, Container} from "reactstrap";
import { connect } from "react-redux";

import {
  getLikedSongs,
  getPlaylistSongs,
  setCurrentSongList,
  setItemsLoading,
  setPlaylistSongs
} from "../flux/actions/spotifyActions";

import "./Styles/functionButton.css";
import logo from "../Icons/copy-link.png";

import Song from "./LikedSongs/LikedSong";
import DuplicateSongsBoard from "./DuplicateSongs/DuplicateSongsBoard";
import PlaylistSongsBoard from "./PlaylistSongs/PlaylistSongsBoard";
import DecadeSongsBoard from "./DecadeSongs/DecadeSongsBoard";
import LikedSongsBoard from "./LikedSongs/LikedSongsBoard";

import axios from 'axios'

export const SpotifyFunctions = (props) => {
  useEffect(() => {
    if (props.likedSongs.length == 0) {
      props.getLikedSongs();
    }
  }, []);

  let songList = <div></div>;
  let buttonStyle = "button-container"

  if(props.currentSongs.currentType == "LOADING"){
    buttonStyle = "button-container-hidden"
    songList = (
      <div>
        <Spinner color="success" />
        <h2>Currently Loading Songs</h2>
      </div>
    );
  }else{
    switch (props.currentSongs.currentType) {
      case "LIKED_SONGS":
        songList = props.currentSongs.currentList.map((val, key) => (
          <Song
            key={key}
            id={val.track.id}
            title={val.track.name}
            artist={val.track.artists[0].name}
            album={val.track.album.name}
            date={val.added_at}
          />
        ));
        break;
  
      case "PLAYLIST_UNIQUES_SONGS":
        songList = <PlaylistSongsBoard></PlaylistSongsBoard>
        break;
  
      case "LIKED_UNIQUE_SONGS":
        songList = <LikedSongsBoard></LikedSongsBoard>
        console.log("LIKEDSONGS");
        break;
  
      case "DUPLICATE_SONGS":
        songList = <DuplicateSongsBoard></DuplicateSongsBoard>;
        console.log("DUPLICATE SONGS")
        break;

      case "DECADE_SONGS":
        songList = <DecadeSongsBoard></DecadeSongsBoard>;
        break;
    }
    buttonStyle = "button-container"
  }

  async function comparePlaylistToLiked() {
    props.setItemsLoading();
    let likedSongsObj: any = {};
    let playlistUniqueSongs: any = [];

    let playlistSongs = {}

    if (props.playlistSongs.length == 0) {
      let res = await axios.get('http://localhost:5000/spotify/getPlaylistSongs', {withCredentials: true});
      playlistSongs = res.data
    }else{
      playlistSongs = props.playlistSongs
    }

    //Create an object of props of all liked songs
    for (let index in props.likedSongs) {
      likedSongsObj[props.likedSongs[index].track.external_ids.isrc] =
        props.likedSongs[index];
    }
    for (let index in playlistSongs) {
      if (
        likedSongsObj[playlistSongs[index].track.external_ids.isrc] ==
        undefined
      ) {
        playlistUniqueSongs.push(playlistSongs[index]);
      }
    }

    props.setPlaylistSongs(playlistSongs)
    props.setCurrentSongList(playlistUniqueSongs, "PLAYLIST_UNIQUES_SONGS");
  }

  async function compareLikedSongs() {
    props.setItemsLoading();
    let playlistSongsObj: any = {};
    let uniqueLikedSongs: any = [];

    let playlistSongs = {}

    if (props.playlistSongs.length == 0) {
      let res = await axios.get('http://localhost:5000/spotify/getPlaylistSongs', {withCredentials: true});
      playlistSongs = res.data
    }else{
      playlistSongs = props.playlistSongs
    }

    //Create an object of props of all liked songs
    for (let index in playlistSongs) {
      playlistSongsObj[playlistSongs[index].track.external_ids.isrc] =
      playlistSongs[index];
    }
    // for every song in your playlists, checks if that song is in liked songs
    for (let index in props.likedSongs) {
      if (
        playlistSongsObj[props.likedSongs[index].track.external_ids.isrc] ==
        undefined
      ) {
        uniqueLikedSongs.push(props.likedSongs[index]);
      }
    }
    props.setPlaylistSongs(playlistSongs)
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
        ] == undefined
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
          ] == undefined
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
    console.log(duplicateSongs.length);

    props.setCurrentSongList(duplicateSongs, "DUPLICATE_SONGS");
  }
  async function getDecadeSongs (){
    let decadeObj = {
      currentDecades:[],
      currentSongList:[],
      songDecadeList :{},
    }
    for(let index in props.likedSongs){
        let date = new Date(props.likedSongs[index].track.album.release_date)
        let year = date.getFullYear();
        year = Math.floor(year / 10) * 10
        if(decadeObj["songDecadeList"][year] == undefined){
          decadeObj["songDecadeList"][year] = [props.likedSongs[index]]
        }else{
          decadeObj["songDecadeList"][year].push(props.likedSongs[index])
        }

    }
    props.setCurrentSongList(decadeObj, "DECADE_SONGS");
    console.log(decadeObj)
  }

  async function getUnknownArtists (){
    let artistsRanking = {}
    for(let songIndex in props.likedSongs){
      if(artistsRanking[props.likedSongs[songIndex].artists.name] == undefined){
        let artistObj={

        }
        artistsRanking[props.likedSongs[songIndex].artists.name]
      }
    }
  }

  function addToPlaylist(){
    console.log("trying to remove")
    let songUris:string []= []
    console.log(props.currentSongs)
    //getting all songs
    for(let songIndex in props.currentSongs.currentList){
      songUris.push(props.currentSongs.currentList[songIndex].track.uri)
    }
    
    // delete song from spotify through server api
    // axios
    // .post('http://localhost:5000/spotify/addToPlaylist', 
    // {withCredentials: true,
    // data : {
    // }})
    // .then(res =>{
    //   console.log(res)
    // });
    axios
    .get('http://localhost:5000/spotify/addToPlaylist', 
    {withCredentials: true,
    data : {
    }})
    .then(res =>{
      console.log(res)
    });
  }

  return (
    <div>
      <Container id={buttonStyle}>
        <div className="button-board">
          <Button
            className="function-button"
            onClick={comparePlaylistToLiked}
            color="success"
          >
            <img src={logo} className="button-img"></img>
            Find Songs in Playlist not in Liked
          </Button>
          <br></br>
          <Button
            className="function-button"
            onClick={compareLikedSongs}
            color="success"
          >
            <img src={logo} className="button-img"></img>
            Find Songs in Liked not in Playlist
          </Button>
          <br></br>
          <Button
            className="function-button"
            onClick={findDuplicates}
            color="success"
          >
            <img src={logo} className="button-img"></img>
            Find Duplicates
          </Button>
          <br></br>
        </div>

        <div className="button-board">
          <Button
            className="function-button"
            onClick={getDecadeSongs}
            color="success"
          >
            <img src={logo} className="button-img"></img>
            GET DECADE
          </Button>
          <br></br>
          <Button
            className="function-button"
            onClick={compareLikedSongs}
            color="success"
          >
            <img src={logo} className="button-img"></img>
            Get Artist
          </Button>
          <br></br>
        </div>
      </Container>

      {songList}

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
})(SpotifyFunctions);

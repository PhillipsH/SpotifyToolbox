import React, { useState, useEffect } from "react";
import { Button, Spinner, Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import {
  getLikedSongs,
  getPlaylistSongs,
  setCurrentSongList,
} from "../flux/actions/spotifyActions";
import Song from "./LikedSongs/LikedSong";
import PlaylistSong from "./PlaylistSongs/PlaylistSong";
import DuplicateSongs from "./DuplicateSongs/DuplicateSongs";
import "./Styles/functionButton.css";
import DuplicateSongsBoard from "./DuplicateSongs/DuplicateSongsBoard";

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
        // songList = props.currentSongs.currentList.map((val, key) => (
        //   <PlaylistSong
        //     key={key}
        //     id={val.track.id}
        //     playlistName={val.playlist_name}
        //     title={val.track.name}
        //     artist={val.track.artists[0].name}
        //     album={val.track.album.name}
        //     date={val.added_at}
        //   />
        // ));
        songList = <PlaylistSongBoard></PlaylistSongBoard>
        break;
  
      case "LIKED_UNIQUE_SONGS":
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
        console.log("LIKEDSONGS");
        break;
  
      case "DUPLICATE_SONGS":
        console.log("LIKEDSONGS");
        // songList = props.currentSongs.currentList.map((val, key) => (
        //   <DuplicateSongs key={key} songs={val} />
        // ));
        songList = <DuplicateSongsBoard></DuplicateSongsBoard>;
        break;
    }
    buttonStyle = "button-container"
  }

  async function comparePlaylistToLiked() {
    let likedSongsObj: any = {};
    let playlistUniqueSongs: any = [];

    if (props.playlistSongs.length == 0) {
      await props.getPlaylistSongs();
    }

    console.log(props.playlistSongs);

    //Create an object of props of all liked songs
    for (let index in props.likedSongs) {
      likedSongsObj[props.likedSongs[index].track.external_ids.isrc] =
        props.likedSongs[index];
    }
    for (let index in props.playlistSongs) {
      if (
        likedSongsObj[props.playlistSongs[index].track.external_ids.isrc] ==
        undefined
      ) {
        playlistUniqueSongs.push(props.playlistSongs[index]);
      }
    }
    console.log(playlistUniqueSongs.length);

    props.setCurrentSongList(playlistUniqueSongs, "PLAYLIST_UNIQUES_SONGS");
  }

  async function compareLikedSongs() {
    let playlistSongsObj: any = {};
    let uniqueLikedSongs: any = [];

    if (props.playlistSongs.length == 0) {
      await props.getPlaylistSongs();
    }

    console.log(props.playlistSongs);
    //Create an object of props of all liked songs
    for (let index in props.playlistSongs) {
      playlistSongsObj[props.playlistSongs[index].track.external_ids.isrc] =
        props.playlistSongs[index];
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

  return (
    <div>
      <Container id={buttonStyle}>
        <div className="button-board">
          <Button
            className="function-button"
            onClick={comparePlaylistToLiked}
            color="success"
          >
            Find Songs in Playlist not in Liked
          </Button>
          <br></br>
          <Button
            className="function-button"
            onClick={compareLikedSongs}
            color="success"
          >
            Find Songs in Liked not in Playlist
          </Button>
          <br></br>
          <Button
            className="function-button"
            onClick={findDuplicates}
            color="success"
          >
            Find Duplicates
          </Button>
          <br></br>
        </div>

        <div className="button-board">
          <Button
            className="function-button"
            onClick={comparePlaylistToLiked}
            color="success"
          >
            Find Songs in Playlist not in Liked
          </Button>
          <br></br>
          <Button
            className="function-button"
            onClick={compareLikedSongs}
            color="success"
          >
            Find Songs in Liked not in Playlist
          </Button>
          <br></br>
          <Button
            className="function-button"
            onClick={findDuplicates}
            color="success"
          >
            Find Duplicates
          </Button>
          <br></br>
        </div>
      </Container>
      <div id="song-container">
        {songList}
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
})(SpotifyFunctions);

import React, { useEffect, useState } from "react";
import { Spinner} from "reactstrap";
import { connect } from "react-redux";

import {
  getLikedSongs,
  getPlaylistSongs,
  getProfile,
  startSetup
} from "../flux/actions/spotifyActions";

// import Song from "./LikedSongs/LikedSong";
import DuplicateSongsBoard from "./DuplicateSongs/DuplicateSongsBoard";
import PlaylistSongsBoard from "./PlaylistSongs/PlaylistSongsBoard";
import DecadeSongsBoard from "./DecadeSongs/DecadeSongsBoard";
import SavedUniqueBoard from "./SavedUnique/SavedUniqueBoard";
import ArtistBoard from "./Artists/ArtistBoard"
import GenreBoard from "./Genre/GenreBoard"
import ButtonFunctions from "./ButtonFunctions/ButtonFunctions"
import Sidenav  from "./Sidenav";
import SongBoard from "./Saved/SavedBoard"
import { BoardTypes, LoadingTypes } from "../flux/actions/types";



export const Dashboard = (props) => {
  useEffect(() => {
    async function fetchData(){
      props.startSetup()
      console.log("yo")
      await props.getProfile()
      props.getPlaylistSongs()
    }
    if (props.boardType == 'uninitialized') {
      fetchData()
    }
  }, []);

  let songList = <></>;
  let mainContent = <></>;
  console.log(props.loading)
  if(props.loading.includes(LoadingTypes.LikedSongs)){
    mainContent = (
      <div className="loading">
        <Spinner color="success"/>
        <h2>Currently Loading Songs... May take a minute.</h2>
      </div>
    );
  }else if(props.loading.includes(LoadingTypes.PlaylistSongs)){
    mainContent = (
      <div className="loading">
        <Spinner color="success"/>
        <h2>Current Loading your Playlist Songs</h2>
      </div>
    );
  }else{
    switch (props.boardType) {
      case BoardTypes.Saved:
        songList = <SongBoard></SongBoard>
        break;
      case BoardTypes.PlaylistUnique:
        songList = <PlaylistSongsBoard></PlaylistSongsBoard>
        break;
      case BoardTypes.SavedUnique:
        songList = <SavedUniqueBoard></SavedUniqueBoard>
        break;
  
      case BoardTypes.Duplicates:
        songList = <DuplicateSongsBoard></DuplicateSongsBoard>;
        break;

      case BoardTypes.Decade:
        songList = <DecadeSongsBoard></DecadeSongsBoard>;
        break;

      case BoardTypes.Artist:
        songList = <ArtistBoard></ArtistBoard>;
        break;
      case BoardTypes.Genre:
        songList = <GenreBoard></GenreBoard>;
        break;
    }
    mainContent = (
      <>
        <h3>Song Functions</h3>
        <ButtonFunctions></ButtonFunctions>
        <h3>Current Songs</h3>
        {songList}
      </>
    )
  }


  return (
    <div>
      <Sidenav></Sidenav>
      <div id="dashboard-div">
        <header className="App-header">
          <h1>Spotify Dashboard</h1>
        </header>
        {mainContent}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  currentSongs: state.spotify.currentSongs,
  loading: state.ui.loading,
  setup: state.spotify.setup,
  boardType: state.ui.boardType,
});

export default connect(mapStateToProps, {
  getLikedSongs,
  getPlaylistSongs,
  getProfile,
  startSetup
})(Dashboard);

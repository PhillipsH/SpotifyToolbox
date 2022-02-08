import React, { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import {
  getLikedSongs,
  getPlaylistSongs,
  getProfile,
  startSetup,
} from "../flux/actions/spotifyActions";

import DecadeSongsBoard from "./Boards/DecadeSongsBoard";
import DuplicateSongsBoard from "./Boards/DuplicateSongsBoard";
import PlaylistSongsBoard from "./Boards/PlaylistSongsBoard";
import SavedUniqueBoard from "./Boards/SavedUniqueBoard";
import TopArtistsBoard from "./Boards/TopArtistsBoard";
import TopSongsBoard from "./Boards/TopSongsBoard";
import GenreBoard from "./Boards/GenreBoard";
import Sidebar from "./Sidebar";
import Sidenav from "./Sidenav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars} from "@fortawesome/free-solid-svg-icons";
import { LoadingTypes } from "../flux/actions/types";
import SavedBoard from "./Boards/SavedBoard";
import MainStyle from "./Styles/Components/Main.module.scss";

export const Dashboard = (props) => {
  const [sidenavTheme, setSidenavTheme]: any = useState(false);

  useEffect(() => {
    async function fetchData() {
      props.startSetup();
      await props.getProfile();
      props.getPlaylistSongs();
    }
    if (props.boardType == "uninitialized") {
      fetchData();
    }
  }, []);
  
  let mainContent = <></>;
  if (props.loading.includes(LoadingTypes.LikedSongs)) {
    mainContent = (
      <div>
        <Spinner color="success" />
        <h2>Currently Loading Songs... May take a minute.</h2>
      </div>
    );
  } else if (props.loading.includes(LoadingTypes.PlaylistSongs)) {
    mainContent = (
      <div>
        <Spinner color="success" />
        <h2>Current Loading your Playlist Songs</h2>
      </div>
    );
  } else {
    mainContent = (
      <Switch>
        <Route exact path="/">
          <SavedBoard></SavedBoard>
        </Route>
        <Route exact path="/duplicates">
          <DuplicateSongsBoard></DuplicateSongsBoard>
        </Route>
        <Route exact path="/decade">
          <DecadeSongsBoard></DecadeSongsBoard>
        </Route>
        <Route exact path="/genre">
          <GenreBoard></GenreBoard>
        </Route>
        <Route path="/top/songs">
          <TopSongsBoard></TopSongsBoard>
        </Route>
        <Route path="/top/artists">
          <TopArtistsBoard></TopArtistsBoard>
        </Route>
        <Route exact path="/uniqueSaved">
          <SavedUniqueBoard></SavedUniqueBoard>
        </Route>
        <Route exact path="/uniquePlaylist">
          <PlaylistSongsBoard></PlaylistSongsBoard>
        </Route>
        <Route exact path="/playlists">
        </Route>
      </Switch>
    );
  }

  return (
    <>
      <BrowserRouter>
        <div
          className={`${MainStyle.dashboardDiv} ${
            sidenavTheme ? MainStyle.largeDashboard : ""
          }`}
        >
          <h1 className={MainStyle.dashboardTitle}>Spotify Dashboard</h1>
          {mainContent}
        </div>
        {sidenavTheme ? (
          <div className={`${MainStyle.fixedToggle}`}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                setSidenavTheme(!sidenavTheme);
              }}
            >
              <FontAwesomeIcon icon={faBars} className={MainStyle.toggleIcon} />
            </a>
          </div>
        ) : (
          <></>
        )}
        <Sidenav
          sidenavTheme={sidenavTheme}
          setSidenavTheme={setSidenavTheme}
        ></Sidenav>
        <Sidebar></Sidebar>
      </BrowserRouter>
    </>
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
  startSetup,
})(Dashboard);

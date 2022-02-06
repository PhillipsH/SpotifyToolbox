import React, { useState } from "react";
import { connect } from "react-redux";
import { addToPlaylist, addToSaved } from "../../flux/actions/spotifyActions";
import HelperStyles from '../Styles/Components/Helper/Helper.module.scss'

import {
  Input,
} from "reactstrap";
const Toolbox = ({
  masterSongs,
  currentSongs,
  setCurrentSongs,
  selectedSongs,
  setSelectedSongs,
  addToSaved
}) => {

  function saveSongs(event) {
    addToSaved(selectedSongs)
    setSelectedSongs({})
  }

  function filterList(event) {
    const searchQuery = event.target.value;
    setCurrentSongs(
      masterSongs.filter((song) => {
        const songName = song.track_name.toLowerCase();
        const artistName = song.artist.artist_name.toLowerCase();
        if (
          songName.includes(searchQuery.toLowerCase()) ||
          artistName.includes(searchQuery.toLowerCase())
        ) {
          return true;
        }
        return false;
      })
    );
  }

  return (
    <div className={HelperStyles.toolbox}>

      <h4>Current Songs</h4>
      <button className={HelperStyles.toolboxButton + " " + HelperStyles.bluerColor} onClick={saveSongs}>
        Save Songs
      </button>
      <div></div>
      <div></div>
      <Input
        className={HelperStyles.searchBox}
        type="text"
        placeholder="Search"
        onInput={filterList}
      ></Input>
    </div>
  );
};

export default connect(null, { addToSaved })(Toolbox);

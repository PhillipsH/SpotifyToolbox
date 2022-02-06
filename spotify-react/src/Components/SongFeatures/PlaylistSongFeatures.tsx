import React, { useState } from "react";
import HelperStyles from '../Styles/Components/Helper/Helper.module.scss'

const SongFeatures = ({ setCurrentSongs, currentSongs, setSelectedSongs }) => {
  const [feature, setFeature]: any = useState({
    type: null,
    asc: false,
  });
  function sortByTitle() {
    const currentList = JSON.parse(JSON.stringify(currentSongs));
    if (feature.type == "title" && !feature.asc) {
      currentList.sort((a, b) => {
        return ("" + b.track_name).localeCompare(a.track_name);
      });
      setFeature({
        type: "title",
        asc: true,
      });
    } else {
      currentList.sort((a, b) => {
        return ("" + a.track_name).localeCompare(b.track_name);
      });
      setFeature({
        type: "title",
        asc: false,
      });
    }
    setCurrentSongs(currentList);
  }
  function sortByArtist() {
    const currentList = JSON.parse(JSON.stringify(currentSongs));
    if (feature.type == "album" && !feature.asc) {
      currentList.sort((a, b) => {
        return ("" + b.album.album_name).localeCompare(a.album.album_name);
      });
      setFeature({
        type: "album",
        asc: true,
      });
    } else {
      currentList.sort((a, b) => {
        return ("" + a.album.album_name).localeCompare(b.album.album_name);
      });
      setFeature({
        type: "album",
        asc: false,
      });
    }
    setCurrentSongs(currentList);
  }
  function sortByPlaylist() {
    const currentList = JSON.parse(JSON.stringify(currentSongs));
    if (feature.type == "playlist" && !feature.asc) {
      currentList.sort((a, b) => {
        return ("" + b.playlist_name).localeCompare(a.playlist_name);
      });
      setFeature({
        type: "playlist",
        asc: true,
      });
    } else {
      currentList.sort((a, b) => {
        return ("" + a.playlist_name).localeCompare(b.playlist_name);
      });
      setFeature({
        type: "playlist",
        asc: false,
      });
    }
    setCurrentSongs(currentList);
  }

  function selectSongs(event) {
    if (event.target.checked) {
      const newSelectedSongs = {};
      for (let index in currentSongs) {
        const id =
          currentSongs[index].linked_from_id ?? currentSongs[index].track_id;
        newSelectedSongs[id] = currentSongs[index];
      }
      setSelectedSongs(newSelectedSongs);
    } else {
      setSelectedSongs({});
    }
  }

  return (
    <div className={HelperStyles.songFeatures}>
      <span className={HelperStyles.sortFeature} onClick={sortByTitle}>Title</span>
      <span className={HelperStyles.sortFeature} onClick={sortByArtist}>Album</span>
      <span className={HelperStyles.sortFeature} onClick={sortByPlaylist}>Playlist</span>
      <input
        type="checkbox"
        id="scales"
        name="scales"
        onChange={selectSongs}
      ></input>
    </div>
  );
};

export default SongFeatures;

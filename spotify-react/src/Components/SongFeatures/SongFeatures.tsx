import React, { useState } from "react";
import HelperStyles from '../Styles/Components/Helper/Helper.module.scss'

const SongFeatures = ({ setCurrentSongs, currentSongs, setSelectedSongs }) => {
  const [feature, setFeature]: any = useState({
    type: null,
    asc: false,
  });
  function sortByTitle() {
    console.log("title");
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
    console.log("title");
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
  function sortByDate() {
    const currentList = JSON.parse(JSON.stringify(currentSongs));
    if (feature.type == "date" && !feature.asc) {
      currentList.sort((a, b) => {
        return new Date(b.added_at).valueOf() - new Date(a.added_at).valueOf();
      });
      setFeature({
        type: "date",
        asc: true,
      });
    } else {
      currentList.sort((a, b) => {
        return new Date(a.added_at).valueOf() - new Date(b.added_at).valueOf();
      });
      setFeature({
        type: "date",
        asc: false,
      });
    }
    setCurrentSongs(currentList);
  }

  function selectSongs(event) {
    console.log(event.target.checked);
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
      <span className={HelperStyles.sortFeature} onClick={sortByDate}>Date Added</span>
      <input
        type="checkbox"
        id="scales"
        name="scales"
        onChange={selectSongs}
      ></input>
    </div>
  );
};

// export default Toolbox;
export default SongFeatures;

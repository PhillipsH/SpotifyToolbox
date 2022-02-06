import React, { useState, useEffect } from "react";
import PlaylistSong from "../Items/PlaylistSong";
import { connect } from "react-redux";
import { getPlaylistSongs } from "../../flux/actions/spotifyActions";
import { addLoading } from "../../flux/actions/uiAction";
import { LoadingTypes } from "../../flux/actions/types";
import InfoCards from "../InfoCards/InfoCards";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List} from 'react-window'
import UniquePlaylistToolbox from "../Toolbox/UniquePlaylistToolbox";
import BoardStyle from "../Styles/Components/Boards/Board.module.scss";
import PlaylistSongFeatures from "../SongFeatures/PlaylistSongFeatures"
import {
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";

const PlaylistSongsBoard = (props) => {
  const [masterSongs, setMasterSongs]: any = useState([]);
  const [currentSongs, setCurrentSongs]: any = useState([]);
  const [selectedSongs, setSelectedSongs]: any = useState({});

  useEffect(() => {
    if (props.playlistSongs.initialized == false) {
      addLoading([LoadingTypes.PlaylistSongs]);
    }
  }, []);

  function selectSong(index) {
    const newSelectedSongs = JSON.parse(JSON.stringify(selectedSongs));
    const id =
      currentSongs[index].linked_from_id ?? currentSongs[index].track_id;
    if (id in newSelectedSongs) {
      delete newSelectedSongs[id];
    } else {
      newSelectedSongs[id] = currentSongs[index];
    }
    setSelectedSongs(newSelectedSongs);
  }

  useEffect(() => {
    console.log("rerun")
    let likedSongsObjName: any = {};
    let likedSongsObjId: any = {};
    let playlistUniqueSongs: any = [];

    for (let index in props.likedSongs.list) {

      likedSongsObjName[
        props.likedSongs.list[index].track_name +
          props.likedSongs.list[index].artist.artist_name
      ] = props.likedSongs.list[index];

      let id: string =
        props.likedSongs.list[index].linked_from_id ??
        props.likedSongs.list[index].track_id;
      likedSongsObjId[id] = props.likedSongs.list[index];

    }
    for (let index in props.playlistSongs.list) {
      let id: string =
        props.playlistSongs.list[index].linked_from_id ??
        props.playlistSongs.list[index].track_id;

      if (
        likedSongsObjName[
          props.playlistSongs.list[index].track_name +
            props.playlistSongs.list[index].artist.artist_name
        ] === undefined &&
        likedSongsObjId[id] === undefined
      ) {
        playlistUniqueSongs.push(props.playlistSongs.list[index]);
      }
    }

    setCurrentSongs(playlistUniqueSongs);
    setMasterSongs(playlistUniqueSongs);
  }, [props.likedSongs, props.playlistSongs]);

  const renderRow = ({ index, key, style }) => {
    let currentId =
      currentSongs[index].linked_from_id ?? currentSongs[index].track_id;
    let album_image = currentSongs[index].album.album_images[2] ?? "";

    return (
      <PlaylistSong
        key={key}
        index={index}
        id={currentSongs[index].track_id}
        title={currentSongs[index].track_name}
        artist={currentSongs[index].artist.artist_name}
        album={currentSongs[index].album.album_name}
        image={album_image.url}
        playlistName={currentSongs[index].playlist_name}
        selectSong={selectSong}
        isSelected={currentId in selectedSongs}
        style={style}
      />
    );
  };
  return (
    <div className={BoardStyle.functionBoard}>
      <InfoCards
        selectedSongsLength={Object.keys(selectedSongs).length}
        currentSongsLength={currentSongs.length}
        currentBoard={"Unique Playlist"}
        currentIcon={faListAlt}
      />
      <UniquePlaylistToolbox
        masterSongs={masterSongs}
        currentSongs={currentSongs}
        setCurrentSongs={setCurrentSongs}
        selectedSongs={selectedSongs}
        setSelectedSongs={setSelectedSongs}
      />
      <PlaylistSongFeatures setCurrentSongs={setCurrentSongs} currentSongs={currentSongs} setSelectedSongs={setSelectedSongs}></PlaylistSongFeatures>
      <div className={BoardStyle.songContainer}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={currentSongs.length}
              itemSize={80}
              width={width}
            >
              {renderRow}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  likedSongs: state.spotify.likedSongs,
  playlistSongs: state.spotify.playlistSongs,
});

export default connect(mapStateToProps, { getPlaylistSongs, addLoading })(
  PlaylistSongsBoard
);

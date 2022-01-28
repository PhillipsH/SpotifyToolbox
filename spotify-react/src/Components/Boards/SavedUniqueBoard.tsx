import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPlaylistSongs } from "../../flux/actions/spotifyActions";
import { addLoading } from "../../flux/actions/uiAction";
import { LoadingTypes } from "../../flux/actions/types";
import InfoCards from "../InfoCards/InfoCards";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List} from 'react-window'
import Toolbox from "../Toolbox/Toolbox";
import SavedSong from "../Items/SavedSong";
import SongFeatures from "../SongFeatures/SongFeatures";
import BoardStyle from "../Styles/Components/Boards/Board.module.scss";

const SavedUniqueBoard = (props) => {
  const [masterSongs, setMasterSongs]: any = useState([]);
  const [currentSongs, setCurrentSongs]: any = useState([]);
  const [selectedSongs, setSelectedSongs]: any = useState({});

  useEffect(() => {
    if (props.playlistSongs.initialized == false) {
      addLoading([LoadingTypes.PlaylistSongs]);
    }
  }, []);

  useEffect(() => {
    let playlistDictName: any = {};
    let playlistDictId: any = {};
    let currentList: any = [];

    //Create a dictionary of props of all liked songs
    for (let index in props.playlistSongs.list) {
      let id: string =
        props.playlistSongs.list[index].linked_from_id ??
        props.playlistSongs.list[index].track_id;

      playlistDictId[id] = props.playlistSongs.list[index];

      playlistDictName[
        props.playlistSongs.list[index].track_name +
          props.playlistSongs.list[index].artist.artist_name
      ] = props.playlistSongs.list[index];
      // playlistSongsObj[props.playlistSongs.list[index].track_id] =
      //   props.playlistSongs.list[index];
    }
    // for every song in your playlists, checks if that song is in liked songs
    for (let index in props.likedSongs.list) {
      let id: string =
        props.likedSongs.list[index].linked_from_id ??
        props.likedSongs.list[index].track_id;

      if (
        playlistDictName[
          props.likedSongs.list[index].track_name +
            props.likedSongs.list[index].artist.artist_name
        ] === undefined &&
        playlistDictId[id] === undefined
        // && likedSongsObj[props.playlistSongs.list[index].track.external_ids.isrc] === undefined
      ) {
        currentList.push(props.likedSongs.list[index]);
      }
    }
    console.log(currentList);
    setCurrentSongs(currentList);
    setMasterSongs(currentList);
  }, [props.likedSongs, props.playlistSongs]);

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

  let renderRow = ({ index, key, style }) => {
    let currentId =
      currentSongs[index].linked_from_id ?? currentSongs[index].track_id;
    let album_image = currentSongs[index].album.album_images[2] ?? "";

    return (
      <SavedSong
        key={key}
        id={currentSongs[index].track_id}
        title={currentSongs[index].track_name}
        artist={currentSongs[index].artist.artist_name}
        album={currentSongs[index].album.album_name}
        image={album_image.url}
        date={currentSongs[index].added_at}
        style={style}
        index={index}
        selectSong={selectSong}
        isSelected={currentId in selectedSongs}
      />
    );
  };

  return (
    <div className={BoardStyle.functionBoard}>
      <InfoCards
        selectedSongsLength={Object.keys(selectedSongs).length}
        currentSongsLength={currentSongs.length}
        currentBoard={"Unique Saved"}
      />

      <Toolbox
        masterSongs={masterSongs}
        currentSongs={currentSongs}
        setCurrentSongs={setCurrentSongs}
        selectedSongs={selectedSongs}
        setSelectedSongs={setSelectedSongs}
      />
      <SongFeatures
        setCurrentSongs={setCurrentSongs}
        currentSongs={currentSongs}
        setSelectedSongs={setSelectedSongs}
      />

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
  playlistSongs: state.spotify.playlistSongs,
  likedSongs: state.spotify.likedSongs,
});

export default connect(mapStateToProps, { getPlaylistSongs })(SavedUniqueBoard);

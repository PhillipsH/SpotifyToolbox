import React, { useState, useEffect } from "react";
import PlaylistSong from "../Items/PlaylistSong";
import { connect } from "react-redux";
import { getPlaylistSongs } from "../../flux/actions/spotifyActions";
import { addLoading } from "../../flux/actions/uiAction";
import { LoadingTypes } from "../../flux/actions/types";
import InfoCards from "../InfoCards/InfoCards";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List} from 'react-window'
import Toolbox from "../Toolbox/Toolbox";
import BoardStyle from "../Styles/Components/Boards/Board.module.scss";

const PlaylistSongsBoard = (props) => {
  const [masterSongs, setMasterSongs]: any = useState([]);
  const [currentSongs, setCurrentSongs]: any = useState([]);
  const [selectedSongs, setSelectedSongs]: any = useState([]);

  useEffect(() => {
    if (props.playlistSongs.initialized == false) {
      addLoading([LoadingTypes.PlaylistSongs]);
    }
  }, []);
  useEffect(() => {
    let likedSongsObjName: any = {};
    let likedSongsObjId: any = {};
    let playlistUniqueSongs: any = [];

    for (let index in props.likedSongs.list) {
      // likedSongsObj[props.likedSongs.list[index].track.external_ids.isrc] =
      //   props.likedSongs.list[index];

      likedSongsObjName[
        props.likedSongs.list[index].track_name +
          props.likedSongs.list[index].artist.artist_name
      ] = props.likedSongs.list[index];

      // let id: string =
      //   props.playlistSongs.list[index].linked_from_id ??
      //   props.playlistSongs.list[index].track_id;
      // likedSongsObjId[id] = props.likedSongs.list[index]

      let id: string =
        props.likedSongs.list[index].linked_from_id ??
        props.likedSongs.list[index].track_id;
      likedSongsObjId[id] = props.likedSongs.list[index];

      // if (props.likedSongs.list[index].linked_from_id !== undefined) {
      //   likedSongsObjId[props.likedSongs.list[index].linked_from_id] =
      //     props.likedSongs.list[index];
      // } else {
      //   likedSongsObjId[props.likedSongs.list[index].track_id] =
      //     props.likedSongs.list[index];
      // }
    }
    console.log(likedSongsObjId);
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
        // && likedSongsObj[props.playlistSongs.list[index].track.external_ids.isrc] === undefined
      ) {
        playlistUniqueSongs.push(props.playlistSongs.list[index]);
      }
    }

    setCurrentSongs(playlistUniqueSongs);
    setMasterSongs(playlistUniqueSongs);
    // props.setCurrentSongList(playlistUniqueSongs, "PLAYLIST_UNIQUES_SONGS");
  }, [props.likedSongs, props.playlistSongs]);

  const renderRow = ({ index, key, style }) => {
    let album_image = currentSongs[index].album.album_images[2] ?? "";
    return (
      <PlaylistSong
        key={key}
        id={currentSongs[index].track_id}
        title={currentSongs[index].track_name}
        artist={currentSongs[index].artist.artist_name}
        album={currentSongs[index].album.album_name}
        image={album_image.url}
        playlistName={currentSongs[index].playlist_name}
        style={style}
      />
    );
  };
  return (
    <div className={BoardStyle.functionBoard}>
      <InfoCards
        selectedSongsLength={currentSongs.length}
        currentSongsLength={currentSongs.length}
        currentBoard={"Unique Playlist"}
      />
      <Toolbox
        masterSongs={masterSongs}
        currentSongs={currentSongs}
        setCurrentSongs={setCurrentSongs}
        selectedSongs={selectedSongs}
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
  likedSongs: state.spotify.likedSongs,
  playlistSongs: state.spotify.playlistSongs,
});

export default connect(mapStateToProps, { getPlaylistSongs, addLoading })(
  PlaylistSongsBoard
);

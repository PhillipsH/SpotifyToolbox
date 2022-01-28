import React, { useState, useEffect } from "react";
import SavedSong from "../Items/SavedSong";
import InfoCards from "../InfoCards/InfoCards";
import { connect } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List} from 'react-window'
import Toolbox from "../Toolbox/Toolbox";
import SongFeatures from "../SongFeatures/SongFeatures";
import BoardStyle from "../Styles/Components/Boards/Board.module.scss";

const LikedSongsBoard = (props) => {
  useEffect(() => {}, []);
  const [masterSongs, setMasterSongs]: any = useState(props.likedSongs.list);
  const [currentSongs, setCurrentSongs]: any = useState(props.likedSongs.list);
  const [selectedSongs, setSelectedSongs]: any = useState({});

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

  let renderRow = ({ index, style }) => {
    let currentId =
      currentSongs[index].linked_from_id ?? currentSongs[index].track_id;
    let album_image = currentSongs[index].album.album_images[2] ?? "";


    return (
      <SavedSong
        key={index}
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
  const Column = ({ index, style }) => (
    <div style={style}>Column {index}</div>
  );

  return (
    <div className={BoardStyle.functionBoard}>
      <InfoCards
        selectedSongsLength={Object.keys(selectedSongs).length}
        currentSongsLength={currentSongs.length}
        currentBoard={"Liked Songs"}
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
              className="List"
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
});

export default connect(mapStateToProps, {})(LikedSongsBoard);

import React, { useEffect, useState } from "react";
import { Label } from "reactstrap";
import { connect } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List} from 'react-window'
import SavedSong from "../Items/SavedSong";
import { ITrack } from "../../types/interfaces";
import InfoCards from "../InfoCards/InfoCards";
import Toolbox from "../Toolbox/Toolbox";
import SongFeatures from "../SongFeatures/SongFeatures";
import BoardStyle from "../Styles/Components/Boards/Board.module.scss";
import DecadeBoardStyle from "../Styles/Components/Boards/DecadeBoard.module.scss";

const DecadeSongBoard = (props) => {
  const [masterSongs, setMasterSongs]: any = useState([]);
  const [currentSongs, setCurrentSongs]: any = useState([]);
  const [selectedSongs, setSelectedSongs]: any = useState({});
  const [decades, setDecades]: any = useState([]);
  const [decadeDict, setDecadeDict]: any = useState({});

  useEffect(() => {
    let decadeList = {};
    for (let index in props.likedSongs.list) {
      let date = new Date(props.likedSongs.list[index].release_date);
      let year = date.getFullYear();
      year = Math.floor(year / 10) * 10;
      if (decadeList[year] === undefined) {
        decadeList[year] = [props.likedSongs.list[index]];
      } else {
        decadeList[year].push(props.likedSongs.list[index]);
      }
    }
    setDecadeDict(decadeList);
  }, []);

  useEffect(() => {
    let currentList: ITrack[] = [];
    for (let decadeIndex in decades) {
      for (let songIndex in decadeDict[decades[decadeIndex]]) {
        currentList.push(decadeDict[decades[decadeIndex]][songIndex]);
      }
    }
    setCurrentSongs(currentList);
    setMasterSongs(currentList);
  }, [decades]);

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

  function assessChecked(event) {
    if (event.target.checked) {
      setDecades([...decades, event.target.value]);
    } else {
      setDecades(decades.filter((decade) => decade != event.target.value));
    }
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
        currentBoard={"Decade"}
      />
      <Toolbox
        masterSongs={masterSongs}
        currentSongs={currentSongs}
        setCurrentSongs={setCurrentSongs}
        selectedSongs={selectedSongs}
        setSelectedSongs={setSelectedSongs}
      />
      <div id={DecadeBoardStyle.decadeSelector}>
        {Object.keys(decadeDict).map((key, index) => (
          <div className={DecadeBoardStyle.decade} onChange={assessChecked}>
            <Label check>
              <input type="checkbox" name={key} value={key} />
              <h5>{key}</h5>
            </Label>
          </div>
        ))}
      </div>
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
  likedSongs: state.spotify.likedSongs,
});

export default connect(mapStateToProps, {})(DecadeSongBoard);

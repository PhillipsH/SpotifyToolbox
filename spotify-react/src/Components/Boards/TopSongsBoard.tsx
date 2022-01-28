import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { List, AutoSizer } from "react-virtualized";
import Toolbox from "../Toolbox/Toolbox";
import { getTop } from "../../flux/actions/spotifyActions";
import InfoCards from "../InfoCards/InfoCards";
import TopSong from "../Items/TopSong";
import BoardStyles from "../Styles/Components/Boards/Board.module.scss";
import TopBoardStyles from "../Styles/Components/Boards/TopBoard.module.scss";
import SongFeatures from "../SongFeatures/SongFeatures"

const RankingBoard = (props) => {
  useEffect(() => {}, []);

  const [rankTime, setRankTime]: any = useState("short_term");
  const [masterSongs, setMasterSongs]: any = useState([]);
  const [currentSongs, setCurrentSongs]: any = useState([]);
  const [selectedSongs, setSelectedSongs]: any = useState({});

  useEffect(() => {
    if (props.topRanking["tracks"][rankTime].initialized) {
      setMasterSongs(props.topRanking["tracks"][rankTime].list);
      setCurrentSongs(props.topRanking["tracks"][rankTime].list);
    } else {
      props.getTop("tracks", rankTime);
    }
  }, [rankTime, props.topRanking]);

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
    console.log(currentSongs[index]);
    let album_image = currentSongs[index].album.album_images[2] ?? "";

    return (
      <TopSong
        key={key}
        id={currentSongs[index].track_id}
        title={currentSongs[index].track_name}
        artist={currentSongs[index].artist.artist_name}
        album={currentSongs[index].album.album_name}
        image={album_image.url}
        popularity={currentSongs[index].popularity}
        style={style}
        index={index}
        selectSong={selectSong}
        isSelected={currentId in selectedSongs}
      />
    );
  };

  return (
    <div className={BoardStyles.functionBoard}>
      <InfoCards
        selectedSongsLength={Object.keys(selectedSongs).length}
        currentSongsLength={currentSongs.length}
        currentBoard={"Top Songs"}
      />
      <div className={TopBoardStyles.timeSelectionContainer}>
        <div>
          <a
            className={`${TopBoardStyles.timeSelection} ${
              rankTime == "short_term"
                ? TopBoardStyles.timeSelectionSelected
                : ""
            }`}
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setRankTime("short_term");
            }}
          >
            <div>
              <div>
                <span>Month</span>
              </div>
            </div>
            {rankTime == "short_term" ? (
              <div className={TopBoardStyles.line}></div>
            ) : (
              <></>
            )}
          </a>
        </div>
        <a
          className={`${TopBoardStyles.timeSelection} ${
            rankTime == "medium_term"
              ? TopBoardStyles.timeSelectionSelected
              : ""
          }`}
          href="#"
          onClick={(event) => {
            event.preventDefault();
            setRankTime("medium_term");
          }}
        >
          <div>
            <div>
              <span>6 Months</span>
            </div>
          </div>
          {rankTime == "medium_term" ? (
            <div className={TopBoardStyles.line}></div>
          ) : (
            <></>
          )}
        </a>
        <a
          className={`${TopBoardStyles.timeSelection} ${
            rankTime == "long_term" ? TopBoardStyles.timeSelectionSelected : ""
          }`}
          href="#"
          onClick={(event) => {
            event.preventDefault();
            setRankTime("long_term");
          }}
        >
          <div>
            <div>
              <span>All Time</span>
            </div>
          </div>
          {rankTime == "long_term" ? (
            <div className={TopBoardStyles.line}></div>
          ) : (
            <></>
          )}
        </a>
      </div>
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

      <div className={BoardStyles.songContainer}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              rowCount={currentSongs.length}
              rowHeight={85}
              rowRenderer={renderRow}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  topRanking: state.spotify.topRanking,
});

export default connect(mapStateToProps, { getTop })(RankingBoard);

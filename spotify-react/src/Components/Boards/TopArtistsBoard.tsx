import React, { useState, useEffect } from "react";
import Artist from "../Items/Artist";
import { connect } from "react-redux";
import { List, AutoSizer } from "react-virtualized";
import { getTop } from "../../flux/actions/spotifyActions";
import BoardStyles from "../Styles/Components/Boards/Board.module.scss";
import TopBoardStyles from "../Styles/Components/Boards/TopBoard.module.scss";

const RankingBoard = (props) => {
  useEffect(() => {}, []);

  const [rankTime, setRankTime]: any = useState("short_term");
  const [masterArtists, setMasterArtists]: any = useState([]);
  const [currentArtists, setCurrentArtists]: any = useState([]);

  useEffect(() => {
    if (props.topRanking["artists"][rankTime].initialized) {
      setMasterArtists(props.topRanking["artists"][rankTime].list);
      setCurrentArtists(props.topRanking["artists"][rankTime].list);
    } else {
      props.getTop("artists", rankTime);
    }
  }, [rankTime, props.topRanking]);

  let renderRow = ({ index, key, style }) => {
    let artistImage = currentArtists[index].images[2].url ?? "";

    return (
      <Artist
        key={key}
        id={currentArtists[index].id}
        name={currentArtists[index].name}
        image={artistImage}
        style={style}
        index={index}
        genres={currentArtists[index].genres}
      />
    );
  };
  return (
    <div className={BoardStyles.functionBoard}>
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
            rankTime == "medium_term" ? TopBoardStyles.timeSelectionSelected : ""
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

      <div className={BoardStyles.songContainer}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              rowCount={currentArtists.length}
              rowHeight={150}
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

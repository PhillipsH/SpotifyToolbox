import React, { useState, useEffect } from "react";
import DuplicateSongs from "./DuplicateSongs";
import { connect } from "react-redux";
import {
  removeSongs,
} from "../../flux/actions/spotifyActions";
import InfoCards from "../InfoCards/InfoCards";
import DuplicateToolbox from "../Toolbox/DuplicateToolbox";
import BoardStyle from "../Styles/Components/Boards/Board.module.scss"
import DuplicateBoardStyle from "../Styles/Components/Boards/DuplicateBoard.module.scss"


const DuplicateSongsBoard = (props) => {
  const [masterSongs, setMasterSongs]: any = useState([]);
  const [currentSongs, setCurrentSongs]: any = useState([]);
  const [selectedSongs, setSelectedSongs]: any = useState([]);

  useEffect(() => {
    const likedSongsObj: any = {};
    const duplicateDict: any = {};

    for (let index in props.likedSongs.list) {
      if (
        likedSongsObj[
          "" +
            props.likedSongs.list[index].track_name +
            props.likedSongs.list[index].artist.artist_name
        ] === undefined
      ) {
        likedSongsObj[
          "" +
            props.likedSongs.list[index].track_name +
            props.likedSongs.list[index].artist.artist_name
        ] = props.likedSongs.list[index];
      } else {
        if (
          duplicateDict[
            "" +
              props.likedSongs.list[index].track_name +
              props.likedSongs.list[index].artist.artist_name
          ] === undefined
        ) {
          const duplicateObj = {
            track_name: props.likedSongs.list[index].track_name,
            artist: {
              artist_name: props.likedSongs.list[index].artist.artist_name,
            },
            image: props.likedSongs.list[index].album.album_images[2].url,
            list: [
              likedSongsObj[
                "" +
                  props.likedSongs.list[index].track_name +
                  props.likedSongs.list[index].artist.artist_name
              ],
            ],
          };
          duplicateDict[
            "" +
              props.likedSongs.list[index].track_name +
              props.likedSongs.list[index].artist.artist_name
          ] = duplicateObj;
        }
        duplicateDict[
          "" +
            props.likedSongs.list[index].track_name +
            props.likedSongs.list[index].artist.artist_name
        ].list.push(props.likedSongs.list[index]);
      }
    }
    setMasterSongs(Object.values(duplicateDict));
    setCurrentSongs(Object.values(duplicateDict));
  }, [props.likedSongs]);

  return (
    <div className={BoardStyle.functionBoard}>
      <InfoCards
        selectedSongsLength={currentSongs.length}
        currentSongsLength={currentSongs.length}
        currentBoard={"Liked Songs"}
      />
      <DuplicateToolbox
        masterSongs={masterSongs}
        currentSongs={currentSongs}
        setCurrentSongs={setCurrentSongs}
        selectedSongs={selectedSongs}
        setSelectedSongs={setSelectedSongs}
      />
      <div className={`${BoardStyle.songContainer} ${DuplicateBoardStyle.duplicateSongContainer}`}>
        {currentSongs.map((val, key) => (
          <DuplicateSongs key={key} currentSongIndex={key} dupeSongs={val} />
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  likedSongs: state.spotify.likedSongs,
});

export default connect(mapStateToProps, { removeSongs })(DuplicateSongsBoard);

import React from "react";
import { Button} from "reactstrap";
import { connect } from "react-redux";
// import {
//   getLikedSongs
// } from "../../flux/actions/spotifyActions";
import{
  setBoard
} from "../../flux/actions/uiAction"
import duplicateImg from "../../Icons/copy-link.png";
import decadeImg from "../../Icons/age.png";
import arrowImg from "../../Icons/transfer-arrows.png";
import artistImg from "../../Icons/users.png";

import { BoardTypes } from "../../flux/actions/types";

const ButtonFunctions = (props) => {
  let buttonStyle = "button-container";

  return (
    <div id={buttonStyle}>
      <div className="button-board">
        <Button
          className="function-button"
          onClick={() => props.setBoard(BoardTypes.PlaylistUnique)}
          color="primary"
        >
          <img src={arrowImg} alt="arrow" className="button-img"></img>
          <h6>Find Songs in Playlist not in Liked</h6>
        </Button>
        <br></br>
        <Button
          className="function-button"
          onClick={() => props.setBoard(BoardTypes.SavedUnique)}
          color="warning"
        >
          <img src={arrowImg} alt="arrow" className="button-img"></img>
          <h6>Find Songs in Liked not in Playlist</h6>
        </Button>
        <br></br>
        <Button
          className="function-button"
          onClick={() => props.setBoard(BoardTypes.Duplicates)}
          color="success"
        >
          <img src={duplicateImg} alt="duplicate" className="button-img"></img>
          <h6>Find Duplicates</h6>
        </Button>
        <br></br>
      </div>
      <div className="button-board">
        <Button
          className="function-button"
          onClick={() => props.setBoard(BoardTypes.Decade)}
          color="info"
        >
          <img src={decadeImg} alt="age" className="button-img"></img>
          <h6>Decade</h6>
        </Button>
        <br></br>

        <Button
          className="function-button"
          onClick={() => props.setBoard(BoardTypes.Artist)}
          color="danger"
        >
          <img src={artistImg} alt="artist" className="button-img"></img>
          <h6>Get Artist</h6>
        </Button>
        <br></br>

        <Button
          className="function-button"
          onClick={() => props.setBoard(BoardTypes.Genre)}
          color="danger"
        >
          <img src={artistImg} alt="artist" className="button-img"></img>
          <h6>Get Genre</h6>
        </Button>
        <br></br>

      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  likedSongs: state.spotify.likedSongs,
  likedSongsList: state.spotify.likedSongsList,
  playlistSongs: state.spotify.playlistSongs,
  currentSongs: state.spotify.currentSongs,
  loading: state.ui.loading,
  boardType : state.ui.boardType
});

export default connect(mapStateToProps, {setBoard})(ButtonFunctions);

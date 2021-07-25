import React from "react";
import DuplicateSongs from './DuplicateSongs'
import {Button} from "reactstrap";
import { connect } from "react-redux";
import {
  getLikedSongs,
  getPlaylistSongs,
  setCurrentSongList,
} from "../../flux/actions/spotifyActions";

const style = {
  cardBody: {
    width: "100%",
    color: "black",
  },
};

const DuplicateSongsBoard = (props) => {
  return (
    <div className ="song-board">
      <div>
        <p>Remove ALL</p>
        <Button color="danger">Remove All</Button>
      </div>
      {props.currentSongs.currentList.map((val, key) => (
          <DuplicateSongs key={key} songs={val} />
        ))
      }     
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  currentSongs: state.spotify.currentSongs,
});

export default connect(mapStateToProps, {})(DuplicateSongsBoard);


import React from "react";

import {Button} from "reactstrap";
import { connect } from "react-redux";
import Artist from "./Artist"
import axios from "axios"
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
const ArtistBoard = (props) => {

  return (
    <div className="function-board">
      <div className="toolbox">
        <Button color="success">Like All Songs</Button>
      </div>
      <div className="song-container">
        {props.currentSongs.currentList.map((val, key) => (
            <Artist
              key={key}
            //   id={val.track.id}
            //   title={val.track.name}
              artist={val.artistName}
              album={val.artistCounter}
            //   date={val.added_at}
            />
          ))
        } 
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  currentSongs: state.spotify.currentSongs,
});

export default connect(mapStateToProps, {})(ArtistBoard);


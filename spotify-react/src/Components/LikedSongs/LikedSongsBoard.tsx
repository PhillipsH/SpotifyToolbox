import React from "react";
import LikedSong from './LikedSong'
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

const LikedSongsBoard = (props) => {
  return (
    <div className ="song-board">
      <div>
        <p>Remove ALL</p>
        <Button color="danger">Remove All</Button>
      </div>
      {props.currentSongs.currentList.map((val, key) => (
          <LikedSong
            key={key}
            id={val.track.id}
            title={val.track.name}
            artist={val.track.artists[0].name}
            album={val.track.album.name}
            date={val.added_at}
          />
        ))
      }     
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  currentSongs: state.spotify.currentSongs,
});

export default connect(mapStateToProps, {})(LikedSongsBoard);


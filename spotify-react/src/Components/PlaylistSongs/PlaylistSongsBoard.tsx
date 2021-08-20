import React from "react";
import PlaylistSong from './PlaylistSong'
import {Button} from "reactstrap";
import { connect } from "react-redux";
import { addToPlaylist } from "../Utility";

const PlaylistSongsBoard = (props) => {
  function addSongsToPlaylist(){
    addToPlaylist(props.currentSongs.currentList)
  }
  return (
    <div className="function-board">
      <h5>Playlist Songs: {props.currentSongs.currentList.length}</h5>
      <div className="toolbox">
        <Button color="success" onClick={addSongsToPlaylist}>Add to Playlist</Button>
      </div>
      <div className="song-container">
        {props.currentSongs.currentList.map((val, key) => (
            <PlaylistSong
              key={key}
              id={val.track.id}
              playlistName={val.playlist_name}
              title={val.track.name}
              artist={val.track.artists[0].name}
              album={val.track.album.name}
              date={val.added_at}
            />
          ))}   
      </div>  
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  currentSongs: state.spotify.currentSongs,
});

export default connect(mapStateToProps, {})(PlaylistSongsBoard);


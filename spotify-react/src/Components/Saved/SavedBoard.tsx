import React, { useEffect } from "react";
import SavedSong from './SavedSong'
import {Button} from "reactstrap";
import { connect } from "react-redux";
import { addToPlaylist } from "../Utility";
import { ITrack } from "../../types/interfaces";

const LikedSongsBoard = (props) => {
  useEffect(() => {
  }, []);
  
  function addSongsToPlaylist(){
    addToPlaylist(props.currentSongs.currentList)
  }

  let currentList:ITrack[] = []
  currentList = props.likedSongs.list
  
  return (
    
    <div className="function-board">
      <h1>Liked Songs</h1>
      <h5>Number of Songs: {currentList.length}</h5>
      <div className="toolbox">
        <Button onClick={addSongsToPlaylist}color="success">Add to Playlist</Button>
      </div>
      <div className="song-container">
        {currentList.map((val, key) => (
            <SavedSong
              key={key}
              id={val.track_id}
              title={val.track_name}
              artist={val.artist.artist_name}
              album={val.album.album_name}
              date={val.added_at}
            />
          ))
        } 
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  likedSongs: state.spotify.likedSongs,
});

export default connect(mapStateToProps, {})(LikedSongsBoard);


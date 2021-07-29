import React from "react";

import {Button} from "reactstrap";
import { connect } from "react-redux";

const style = {
  cardBody: {
    width: "100%",
    color: "black",
  },
};

const DuplicateSongSingle = ({ songs, currentSongIndex, currentPlacement, currentSongs, likedSongs}) => {

  function removeSong(){
    console.log(currentSongs[currentSongIndex][currentPlacement])
    currentSongs[currentSongIndex][currentPlacement].track.id
    let index = 0;
    let found = false
    while(index <= likedSongs.length || found){
      if (likedSongs[index].track.id == currentSongs[currentSongIndex][currentPlacement].track.id){
        found = true;
        likedSongs.splice(index, 1)
      }
    }
    currentSongs[currentSongIndex].splice(currentPlacement, 1)
    
  }
  
  return (
      songs.map((val, index) => {
        var readable_date = new Date(val.added_at).toDateString();
        return (
          <div className="card-body duplicate-song-container" key={index}>
            <div className="duplicate-song-left">
              <h5 className="song_title">{val.track.name}</h5>
              <h5>KEY = {currentSongIndex}</h5>
              <h5>INDEX = {index}</h5>
              <h6 className="artist">Album: {val.track.album.name}</h6>
              <h6 className="artist">Date: {readable_date}</h6>
            </div>
            <div className="duplicate-song-right">
              <Button onClick={removeSong} color="danger">Remove</Button>
            </div>
          </div>
        );
      })
  );
};
const mapStateToProps = (state: any) => ({
  currentSongs: state.spotify.currentSongs,
  likedSongs: state.spotify.likedSongs,
  loading: state.spotify.loading,
});

export default connect(mapStateToProps, {})(DuplicateSongSingle);

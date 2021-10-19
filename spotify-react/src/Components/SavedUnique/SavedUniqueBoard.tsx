import React, { useState, useEffect } from 'react';
import SavedUniqueSong from './SavedUniqueSong'
import {Button} from "reactstrap";
import { connect } from "react-redux";
import { getPlaylistSongs } from "../../flux/actions/spotifyActions";
import { addToPlaylist } from "../Utility";

const SavedUniqueBoard = (props) => {
  useEffect(() => {
    if(props.playlistSongs.initialized == false){
      props.getPlaylistSongs()
    }
  }, []);

  let playlistSongsObj: any = {};
  let uniqueLikedSongs: any = [];

  //Create a dictionary of props of all liked songs
  for (let index in props.playlistSongs.list) {
    playlistSongsObj[props.playlistSongs.list[index].track_id] =
      props.playlistSongs.list[index];
  }
  // for every song in your playlists, checks if that song is in liked songs
  for (let index in props.likedSongs.list) {
    if (
      playlistSongsObj[props.likedSongs.list[index].track_id] === undefined
    ) {
      uniqueLikedSongs.push(props.likedSongs.list[index]);
    }
  }
  
  function addSongsToPlaylist(){
    addToPlaylist(props.currentSongs.currentList)
  }
  return (
    <div className="function-board">
      <h1>Liked Songs</h1>
      <h5>Number of Songs: {uniqueLikedSongs.length}</h5>
      <div className="toolbox">
        <Button onClick={addSongsToPlaylist}color="success">Add to Playlist</Button>
      </div>
      <div className="song-container">
        {uniqueLikedSongs.map((val, key) => (
            <SavedUniqueSong
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
  playlistSongs: state.spotify.playlistSongs,
  likedSongs: state.spotify.likedSongs
});

export default connect(mapStateToProps, {getPlaylistSongs})(SavedUniqueBoard);


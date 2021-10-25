import React, { useState, useEffect } from 'react';
import SavedUniqueSong from './SavedUniqueSong'
import {Button} from "reactstrap";
import { connect } from "react-redux";
import { getPlaylistSongs } from "../../flux/actions/spotifyActions";
import { addToPlaylist } from "../Utility";
import { addLoading } from '../../flux/actions/uiAction';
import { LoadingTypes } from '../../flux/actions/types';

const SavedUniqueBoard = (props) => {
  useEffect(() => {
    if(props.playlistSongs.initialized == false){
      addLoading([LoadingTypes.PlaylistSongs])
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
      <div className="cards-container">
        <div className="card-info">

        </div>
        <div className="card-info">
          <h1>Liked Songs</h1>
        </div>
        <div className="card-info">

        </div>
      </div>
      <h5>Number of Songs: {uniqueLikedSongs.length}</h5>
      <div className="toolbox">
        <Button onClick={addSongsToPlaylist}color="success">Add to Playlist</Button>
      </div>
      <div className="song-container">
        <div className="song-features">
          <span>Title</span>
          <span>Album</span>
          <span>Date Added</span>
        </div>
        {uniqueLikedSongs.map((val, key) => {
        let album_image = val.album.album_images[2] ?? "" 

        return(
            <SavedUniqueSong
              key={key}
              id={val.track_id}
              title={val.track_name}
              artist={val.artist.artist_name}
              album={val.album.album_name}
              image={album_image.url}
              date={val.added_at}
            />
          )})
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


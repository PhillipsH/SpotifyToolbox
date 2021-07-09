import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import {IAuthProps} from '../types/interfaces';
import {getLikedSongs, getPlaylistSongs} from '../flux/actions/spotifyActions'
import Song from './Song';

export const SpotifyFunctions = (props)  => {
  function checkState(){
    console.log(props.likedSongs)
  }

return (
  <div>
    <h1>CONGRATS YOU ARE LOGGED IN</h1>
    <Button onClick={props.getLikedSongs} color="success">Getting Liked Songs</Button><br></br>
    <Button onClick={checkState} color="success">Check State</Button><br></br>
    <Button onClick={props.getPlaylistSongs} color="success">getting playlist</Button><br></br>

    {props.likedSongs.map((val, key) => 
      <Song
        key={key} 
        id={val.track.id}
        title={val.track.name} 
        artist={val.track.artists[0].name} 
        album={val.track.album.name} 
        date={val.added_at}
      />
    )}
  </div>
);

}

const mapStateToProps = (state:any) => ({
  likedSongs: state.spotify.likedSongs,
});

export default connect(mapStateToProps, {getLikedSongs, getPlaylistSongs})(SpotifyFunctions);
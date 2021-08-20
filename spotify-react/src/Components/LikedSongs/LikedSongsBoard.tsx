import React from "react";
import LikedSong from './LikedSong'
import {Button} from "reactstrap";
import { connect } from "react-redux";
import axios from "axios"
import { addToPlaylist } from "../Utility";

const LikedSongsBoard = (props) => {
  // function addToPlaylist(){
  //   console.log("trying to remove")
  //   let songUris:string []= []
  //   console.log(props.currentSongs)
  //   //getting all songs
  //   for(let songIndex in props.currentSongs.currentList){
  //     songUris.push(props.currentSongs.currentList[songIndex].track.uri)
  //   }
  //   let playlistData = {
  //     songUris : songUris
  //   }
  //   // delete song from spotify through server api
  //   console.log(playlistData)
  //   axios
  //   .post('http://localhost:5000/spotify/addToPlaylist', playlistData,
  //   {withCredentials: true,})
  //   .then(res =>{
  //     console.log(res)
  //   });

  // }
  function addSongsToPlaylist(){
    addToPlaylist(props.currentSongs.currentList)
  }
  return (
    <div className="function-board">
      <h1>Liked Songs</h1>
      <h5>Number of Songs: {props.currentSongs.currentList.length}</h5>
      <div className="toolbox">
        <Button onClick={addSongsToPlaylist}color="success">Add to Playlist</Button>
      </div>
      <div className="song-container">
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
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  currentSongs: state.spotify.currentSongs,
});

export default connect(mapStateToProps, {})(LikedSongsBoard);


import React from "react";
import axios from "axios";
import {Button} from "reactstrap";
import { connect } from "react-redux";
import DecadeCheckBox from "./DecadeCheckBox";
import DecadeSong from "./DecadeSong";

import { addToPlaylist } from "../Utility";

const DecadeSongBoard = (props) => {
  
  // function addToPlaylist(){
  //   console.log("trying to remove")
  //   let songUris:string []= []
  //   console.log(props.currentSongs)
  //   //getting all songs
  //   for(let songIndex in props.currentSongs.currentList.currentSongList){
  //     songUris.push(props.currentSongs.currentList.currentSongList[songIndex].track.uri)
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
    addToPlaylist(props.currentSongs.currentList.currentSongList)
  }

  // changeCurrentList()
  return (
    <div className="function-board">
      <h1>Decades</h1>
      <h5>Number of Current Songs: {props.currentSongs.currentList.currentSongList.length}</h5>
      <div className="toolbox">
        <Button onClick={addSongsToPlaylist} color="success">Add to Playlist</Button>
      </div>
      <div id="decade-selector">
        {Object.keys(props.currentSongs.currentList.songDecadeList).map((key, i) => (
          <DecadeCheckBox key={key} year={key}></DecadeCheckBox>
        ))}
      </div>
      <div className="song-container">
        {props.currentSongs.currentList.currentSongList.map((val, key) => (
            <DecadeSong
              key={key}
              id={val.track.id}
              title={val.track.name}
              artist={val.track.artists[0].name}
              album={val.track.album.name}
              date={val.track.album.release_date}
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

export default connect(mapStateToProps, {})(DecadeSongBoard);


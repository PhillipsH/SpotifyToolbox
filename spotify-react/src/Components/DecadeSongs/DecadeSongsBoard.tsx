import React from "react";
import axios from "axios";
// import DuplicateSongs from './DuplicateSongs'
import {Button, Input, Form, FormGroup, Label} from "reactstrap";
import { connect } from "react-redux";
import {
  getLikedSongs,
  getPlaylistSongs,
  setCurrentSongList,
} from "../../flux/actions/spotifyActions";
import DecadeCheckBox from "./DecadeCheckBox";
import DecadeSong from "./DecadeSong";
// import LikedSong from "../LikedSongs/LikedSong";

const style = {
  cardBody: {
    width: "100%",
    color: "black",
  },
};



const DecadeSongBoard = (props) => {
  function checkProps(event){
    // console.log(event)
  }
  
  // function changeCurrentList(){
  //   let currentSongsList = []
  //   for(let yearIndex in props.currentSongs.currentList.currentDecades){
  //     currentSongsList = currentSongsList.concat(props.currentSongs.currentList.songDecadeList[props.currentSongs.currentList.currentDecades[yearIndex]])
  //     console.log(props.currentSongs.currentList.songDecadeList[props.currentSongs.currentList.currentDecades[yearIndex]])
  //   }
  //   let currSongs = JSON.parse(JSON.stringify(props.currentSongs))
  //   currSongs.currentList.currentSongList = currSongs;
  //   props.setCurrentSongList(currSongs, "DECADE_SONGS");
  // }
  function addToPlaylist(){
    console.log("trying to remove")
    let songUris:string []= []
    console.log(props.currentSongs)
    //getting all songs
    for(let songIndex in props.currentSongs.currentList){
      songUris.push(props.currentSongs.currentList[songIndex].track.uri)
    }
    let playlistData = {
      songUris : songUris
    }
    // delete song from spotify through server api
    console.log(playlistData)
    axios
    .post('http://localhost:5000/spotify/addToPlaylist', playlistData,
    {withCredentials: true,})
    .then(res =>{
      console.log(res)
    });
  }

  // changeCurrentList()
  return (
    <div className="function-board">
       <div className="toolbox">
        <Button onClick={addToPlaylist} color="success">Add to Playlist</Button>
        <Button onClick={checkProps} color="success">Like All Songs</Button>
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


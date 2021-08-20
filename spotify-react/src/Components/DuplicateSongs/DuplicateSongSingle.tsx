import React from "react";
import axios from 'axios'

import {Button} from "reactstrap";
import { connect } from "react-redux";
import {
  removeSongs,
  setCurrentSongList,
  setLikedSongs,
} from "../../flux/actions/spotifyActions";

const DuplicateSongSingle = (props) => {
  let button = <div></div>
  if(props.currentSongs.currentList[props.currentSongIndex].length > 1){
    button = <Button onClick={removeSingle} color="danger">Remove</Button>
  }else{
    button = <></>
  }

  function removeSingle(){
    let id:string [] = [];
    if(props.currentSongs.currentList[props.currentSongIndex][props.currentPlacement].track.linked_from != undefined){
      id.push(props.currentSongs.currentList[props.currentSongIndex][props.currentPlacement].track.linked_from.id)
    }else{
      id.push(props.currentSongs.currentList[props.currentSongIndex][props.currentPlacement].track.id)
    }
    //delete song from spotify through server api
    axios
    .delete('http://localhost:5000/spotify/removeLikedSongs', 
    {withCredentials: true,
    data : {
      songIds : id
    }})
    .then(res =>{
      console.log(res)
    });


    let likedSongsNew = props.likedSongs.slice()
    console.log(likedSongsNew)
    
    //Find likedSong in state with the same id user deleted
    let index = 0;
    let found = false

    while(index < likedSongsNew.length && found == false){
      if (likedSongsNew[index].track.id == props.currentSongs.currentList[props.currentSongIndex][props.currentPlacement].track.id){
        found = true;
        likedSongsNew.splice(index, 1)
        console.log("found")
      }
      index++
    }

    //Set the liked Songs
    console.log(likedSongsNew.length)
    props.setLikedSongs(likedSongsNew)

    //Set current songs with deleted song
    let currentSongsNew = props.currentSongs.currentList.slice()

    currentSongsNew[props.currentSongIndex].splice(props.currentPlacement, 1)
    props.setCurrentSongList(currentSongsNew, "DUPLICATE_SONGS" )


  }
  
  return (
    <div className="card-body duplicate-song-container" key={props.index}>
      <div className="duplicate-song-left">
        <h5 className="song_title">{props.trackName}</h5>
        <h6 className="artist">Album: {props.albumName}</h6>
        <h6 className="artist">Date: {props.date}</h6>
      </div>
      <div className="duplicate-song-right">
        {button}
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  currentSongs: state.spotify.currentSongs,
  likedSongs: state.spotify.likedSongs,
  loading: state.spotify.loading,
});

export default connect(mapStateToProps, {removeSongs, setCurrentSongList, setLikedSongs})(DuplicateSongSingle);


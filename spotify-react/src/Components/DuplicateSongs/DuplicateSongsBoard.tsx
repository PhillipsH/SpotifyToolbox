import React from "react";
import DuplicateSongs from './DuplicateSongs'
import {Button} from "reactstrap";
import { connect } from "react-redux";
import {
  removeSongs,
  setLikedSongs,
  setCurrentSongList
} from "../../flux/actions/spotifyActions";
import axios from "axios"

const DuplicateSongsBoard = (props) => {
  function removeAllSongs(){
    console.log("trying to remove")
    let dupeIds:string []= []
    for(let songIndex in props.currentSongs.currentList){
      for(let dupeSongsIndex=0; dupeSongsIndex<props.currentSongs.currentList[songIndex].length - 1; dupeSongsIndex++){
        if(props.currentSongs.currentList[songIndex][dupeSongsIndex].track.linked_from != undefined){
          dupeIds.push(props.currentSongs.currentList[songIndex][dupeSongsIndex].track.linked_from.id)
        }else{
          dupeIds.push(props.currentSongs.currentList[songIndex][dupeSongsIndex].track.id)
        }
        dupeIds.push(props.currentSongs.currentList[songIndex][dupeSongsIndex].track.id)
      }
    }
    
    axios
    .delete('http://localhost:5000/spotify/removeLikedSongs', 
    {withCredentials: true,
    data : {
      songIds : dupeIds
    }})
    .then(res =>{
      console.log(res)
    });

    let likedSongsNew = props.likedSongs.slice()
    console.log(likedSongsNew)

    //Find likedSong in state with the same id user deleted
    
    for(let idIndex in dupeIds){
      console.log(dupeIds[idIndex])
      let index = 0;
      let found = false;
      while(index < likedSongsNew.length && found == false){
        if (likedSongsNew[index].track.id == dupeIds[idIndex]){
          found = true;
          likedSongsNew.splice(index, 1)
        }
        index++
      }
    }

    //Set the liked Songs
    console.log(likedSongsNew.length)
    props.setLikedSongs(likedSongsNew)

    //Set current songs with deleted song
    let currentSongsNew = []

    props.setCurrentSongList(currentSongsNew, "DUPLICATE_SONGS" )


  }
  return (
    <div className="function-board">
      <h5>Number of Duplicate Songs: {props.currentSongs.currentList.length}</h5>
      <div className="toolbox">
        <Button onClick={removeAllSongs} color="danger">Remove All</Button>
      </div>
      <div className="song-container">
        {props.currentSongs.currentList.map((val, key) => {
          return(
            <DuplicateSongs key={key} currentSongIndex={key} dupeSongs={val} />
          )})
        }
      </div>   
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  currentSongs: state.spotify.currentSongs,
  likedSongs: state.spotify.likedSongs,
});

export default connect(mapStateToProps, {removeSongs, setLikedSongs, setCurrentSongList})(DuplicateSongsBoard);


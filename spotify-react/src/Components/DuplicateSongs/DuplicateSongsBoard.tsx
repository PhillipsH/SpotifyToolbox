import React from "react";
import DuplicateSongs from './DuplicateSongs'
import axios from 'axios'
import {Button} from "reactstrap";
import { connect } from "react-redux";
import {
  removeSongs,
  setLikedSongs,
  setCurrentSongList
} from "../../flux/actions/spotifyActions";
const style = {
  cardBody: {
    width: "100%",
    color: "black",
  },
};
const DuplicateSongsBoard = (props) => {
  function removeAllSongs(){
    let removeSongs: string[] = []
    for(let songIndex in props.currentSongs){
      removeSongs.push(props.currentSongs[songIndex][0].track.id);
    }
    let likedSongsArr = props.likedSongs.slice()
    for(let idIndex in removeSongs){
      let songIndex = 0;
      let found = false;
      while(songIndex < likedSongsArr.length || found){
        if(likedSongsArr[songIndex].track.id == removeSongs[idIndex]){
          likedSongsArr.splice(songIndex, 1)
          found = true;
        }
      }
      // for(let songIndex in likedSongsArr){
      //   if(likedSongsArr[songIndex].track.id == removeSongs[idIndex]){
      //     likedSongsArr.splice(songIndex, 1)
      //     break;
      //   }
      // }
    }
    let likedSongsObj = {}
    let removeIds :string[] = []
    for(let index in props.likedSongs){
      if(likedSongsObj["" + props.likedSongs[index].track.id] == undefined){
        likedSongsObj["" + props.likedSongs[index].track.id] = [props.likedSongs[index]]
      }else{
        likedSongsObj["" + props.likedSongs[index].track.id].push([props.likedSongs[index]])
      }
    }
    for(let idIndex in removeSongs){
      if(likedSongsObj[idIndex] != undefined){
        likedSongsObj[idIndex].splice(0, 1)
      }
    }
    let likedSongs: any = Object.values(likedSongsObj);
  }
  
  function removeSingle(){
    console.log("trying to remove")
    let dupeIds:string []= []
    for(let songIndex in props.currentSongs.currentList){
      for(let dupeSongsIndex=0; dupeSongsIndex<props.currentSongs.currentList[songIndex].length - 1; dupeSongsIndex++){
        dupeIds.push(props.currentSongs.currentList[songIndex][dupeSongsIndex].track.id)
      }
    }
    
    //delete song from spotify through server api
    // axios
    // .delete('http://localhost:5000/spotify/removeLikedSongs', 
    // {withCredentials: true,
    // data : {
    //   songIds : dupeIds
    // }})
    // .then(res =>{
    //   console.log(res)
    // });


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
          console.log("found")
        }
        index++
      }
    }

    // while(index < likedSongsNew.length && found == false){
    //   if (likedSongsNew[index].track.id == props.currentSongs.currentList[props.currentSongIndex][props.currentPlacement].track.id){
    //     found = true;
    //     likedSongsNew.splice(index, 1)
    //     console.log("found")
    //   }
    //   index++
    // }

    //Set the liked Songs
    console.log(likedSongsNew.length)
    props.setLikedSongs(likedSongsNew)

    //Set current songs with deleted song
    let currentSongsNew = []

    props.setCurrentSongList(currentSongsNew, "DUPLICATE_SONGS" )


  }
  return (
    <div className="function-board">
      <div className="toolbox">
        <p>Remove ALL</p>
        <Button onClick={removeSingle} color="danger">Remove All</Button>
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


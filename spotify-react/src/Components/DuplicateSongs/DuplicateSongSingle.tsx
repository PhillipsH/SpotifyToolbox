import React from "react";
import axios from 'axios'

import {Button} from "reactstrap";
import { connect } from "react-redux";
import {
  removeSongs,
  setCurrentSongList,
  setLikedSongs,
} from "../../flux/actions/spotifyActions";

const style = {
  cardBody: {
    width: "100%",
    color: "black",
  },
};

// const DuplicateSongSingle = ({trackName, date, currentSongIndex, currentPlacement, currentSongs, likedSongs}) => {

//   function removeSingle(){
//     console.log(currentSongs[currentSongIndex][currentPlacement])
//     console.log("trying to remove")
//     let index = 0;
//     let found = false
//     let likedSongsNew = likedSongs.slice()
    
//     removeSongs(currentSongs[currentSongIndex][currentPlacement].track.id)

//     while(index < likedSongs.length || found){
//       if (likedSongsNew[index].track.id == currentSongs[currentSongIndex][currentPlacement].track.id){
//         found = true;
//         likedSongsNew.splice(index, 1)
//       }
//     }
    
//     let currentSongsNew = currentSongs.slice()
//     currentSongsNew[currentSongIndex].splice(currentPlacement, 1)
//     setCurrentSongList("DUPLICATE_SONGS", currentSongsNew)


//   }
  
//   return (
//     <div className="card-body duplicate-song-container" key={index}>
//       <div className="duplicate-song-left">
//         <h5 className="song_title">{trackName}</h5>
//         <h5>KEY = {currentSongIndex}</h5>
//         <h6 className="artist">Album: {albumName}</h6>
//         <h6 className="artist">Date: {readable_date}</h6>
//       </div>
//       <div className="duplicate-song-right">
//         <Button onClick={removeSingle} color="danger">Remove</Button>
//       </div>
//     </div>
//   );
// };
// const mapStateToProps = (state: any) => ({
//   currentSongs: state.spotify.currentSongs,
//   likedSongs: state.spotify.likedSongs,
//   loading: state.spotify.loading,
// });

// export default connect(mapStateToProps, {removeSongs, setCurrentSongList})(DuplicateSongSingle);

const DuplicateSongSingle = (props) => {
  let button = <div></div>
  if(props.currentSongs.currentList[props.currentSongIndex].length > 1){
    button = <Button onClick={removeSingle} color="danger">Remove</Button>
  }else{
    button = <></>
  }

  function removeSingle(){
    console.log(props.currentSongs.currentList[props.currentSongIndex][props.currentPlacement])
    console.log("trying to remove")
    
    //delete song from spotify through server api
    axios
    .delete('http://localhost:5000/spotify/removeLikedSongs', 
    {withCredentials: true,
    data : {
      songIds : [props.currentSongs.currentList[props.currentSongIndex][props.currentPlacement].track.id]
    }})
    .then(res =>{
      console.log(res)
    });


    let likedSongsNew = props.likedSongs.slice()
    console.log(likedSongsNew)
    
    // removeSongs(props.currentSongs.currentList[props.currentSongIndex][props.currentPlacement].track.id)

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


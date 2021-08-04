import React from "react";
import LikedSong from './LikedSong'
import {Button} from "reactstrap";
import { connect } from "react-redux";
import axios from "axios"
import {
  getLikedSongs,
  getPlaylistSongs,
  setCurrentSongList,
} from "../../flux/actions/spotifyActions";

const style = {
  cardBody: {
    width: "100%",
    color: "black",
  },
};
const LikedSongsBoard = (props) => {
  function addToPlaylist(){
    console.log("trying to remove")
    let songUris:string []= []
    console.log(props.currentSongs)
    //getting all songs
    for(let songIndex in props.currentSongs.currentList){
      songUris.push(props.currentSongs.currentList[songIndex].track.uri)
    }
    
    // delete song from spotify through server api
    // axios
    // .post('http://localhost:5000/spotify/addToPlaylist', 
    // {withCredentials: true,
    // data : {
    //   songUris : songUris
    // }})
    // .then(res =>{
    //   console.log(res)
    // });

    axios.get('http://localhost:5000/spotify/addToPlaylist', {withCredentials: true})


    // let likedSongsNew = props.likedSongs.slice()
    // console.log(likedSongsNew)

    //Find likedSong in state with the same id user deleted
    // let index = 0;
    // let found = false
    
    // for(let idIndex in removeSongs){
    //   let index = 0;
    //   let found = false;
    //   while(index < likedSongsNew.length && found == false){
    //     if (likedSongsNew[index].track.id == idIndex){
    //       found = true;
    //       likedSongsNew.splice(index, 1)
    //       console.log("found")
    //     }
    //     index++
    //   }
    // }

    // while(index < likedSongsNew.length && found == false){
    //   if (likedSongsNew[index].track.id == props.currentSongs.currentList[props.currentSongIndex][props.currentPlacement].track.id){
    //     found = true;
    //     likedSongsNew.splice(index, 1)
    //     console.log("found")
    //   }
    //   index++
    // }

    //Set the liked Songs
    // console.log(likedSongsNew.length)
    // props.setLikedSongs(likedSongsNew)

    //Set current songs with deleted song
    // let currentSongsNew = []

    // props.setCurrentSongList(currentSongsNew, "DUPLICATE_SONGS" )


  }
  return (
    <div className ="song-board">
      <div>
        <Button onClick={addToPlaylist}color="success">Add to Playlist</Button>
        <Button color="success">Like All Songs</Button>
      </div>
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
  );
};
const mapStateToProps = (state: any) => ({
  currentSongs: state.spotify.currentSongs,
});

export default connect(mapStateToProps, {})(LikedSongsBoard);


import React from "react";
import DuplicateSongs from './DuplicateSongs'
import {Button} from "reactstrap";
import { connect } from "react-redux";
import {
  removeSongs
} from "../../flux/actions/spotifyActions";
import { ITrack, ITrackArtistHash, ITrackArtistHashArr } from "../../types/interfaces";

const DuplicateSongsBoard = (props) => {
  let likedSongsObj:ITrackArtistHash = {};
  let duplicateDict:ITrackArtistHashArr = {};

  //Create an object of props of all liked songs
  for (let index in props.likedSongs.list) {
    if (
      likedSongsObj[
        "" +
          props.likedSongs.list[index].track_name +
          props.likedSongs.list[index].artist.artist_name
      ] === undefined
    ) {
      likedSongsObj[
        "" +
          props.likedSongs.list[index].track_name +
          props.likedSongs.list[index].artist.artist_name
      ] = props.likedSongs.list[index];
    } else {
      if (
        duplicateDict[
          "" +
            props.likedSongs.list[index].track_name +
            props.likedSongs.list[index].artist.artist_name
        ] === undefined
      ) {
        duplicateDict[
          "" +
            props.likedSongs.list[index].track_name +
            props.likedSongs.list[index].artist.artist_name
        ] = [
          likedSongsObj[
            "" +
              props.likedSongs.list[index].track_name +
              props.likedSongs.list[index].artist.artist_name
          ],
        ];
      }
      duplicateDict[
        "" +
          props.likedSongs.list[index].track_name +
          props.likedSongs.list[index].artist.artist_name
      ].push(props.likedSongs.list[index]);
    }
  }

  let currentSongs = Object.values(duplicateDict)


  function removeAllSongs(){
    console.log("trying to remove")
    let dupeIds:string [] = []
    for(let songKey in duplicateDict){
      for(let dupeSongsIndex=0; dupeSongsIndex < duplicateDict[songKey].length - 1; dupeSongsIndex++){
        const id = duplicateDict[songKey][dupeSongsIndex].linked_from_id ?? duplicateDict[songKey][dupeSongsIndex].track_id 
        dupeIds.push(id)
      }
    }
    
    props.removeSongs(dupeIds)
  }

  return (
    <div className="function-board">
      <h5>Number of Duplicate Songs: {currentSongs.length}</h5>
      <div className="toolbox">
        <Button onClick={removeAllSongs} color="danger">Remove All</Button>
      </div>
      <div className="song-container">
        {
          currentSongs.map((val, key) => (
            <DuplicateSongs key={key} currentSongIndex={key} dupeSongs={val}/>
          ))
        }
        {/* {
          Object.keys(duplicateDict).map((item, i) => (
            <DuplicateSongs key={i} currentSongIndex={i} dupeSongs={duplicateDict[item]}/>
          ))
        } */}

      </div>   
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  currentSongs: state.spotify.currentSongs,
  likedSongs: state.spotify.likedSongs,
});

export default connect(mapStateToProps, {removeSongs})(DuplicateSongsBoard);


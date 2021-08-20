import React from "react";

import {Button} from "reactstrap";
import { connect } from "react-redux";
import Artist from "./Artist"
import {
  setCurrentSongList,
} from "../../flux/actions/spotifyActions";

const ArtistBoard = (props) => {

  function sortByLeastLiked(){
    let artistRank = JSON.parse(JSON.stringify(props.currentSongs.currentList))
    let artistArrayCopy = artistRank.sortedArtistRank.slice()
    artistArrayCopy.sort(function(a:any, b:any){
      return a.artistCounter - b.artistCounter
    })
    artistRank.currentArtistList = artistArrayCopy
    props.setCurrentSongList(artistRank, "ARTIST_RANK")
  }

  function sortByMostLiked(){
    let artistRank = JSON.parse(JSON.stringify(props.currentSongs.currentList))
    let artistArrayCopy = artistRank.sortedArtistRank.slice()
    artistArrayCopy.sort(function(a:any, b:any){
      return b.artistCounter - a.artistCounter
    })
    artistRank.currentArtistList = artistArrayCopy
    props.setCurrentSongList(artistRank, "ARTIST_RANK")
  }
  
  return (
    <div className="function-board">
      <h1>Artist</h1>
      <h5>Number of Unique Artists: {props.currentSongs.currentList.currentArtistList.length}</h5>
      <div className="toolbox">
        <Button onClick={sortByLeastLiked} color="success">Sort By Least Amount of Likes</Button>
        <Button onClick={sortByMostLiked} color="success">Sort By Most Amount of Likes</Button>
      </div>
      <div className="song-container">
        {props.currentSongs.currentList.currentArtistList.map((val, key) => (
            <Artist
              key={key}
            //   id={val.track.id}
            //   title={val.track.name}
              artist={val.artistName}
              counter={val.artistCounter}
            //   date={val.added_at}
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

export default connect(mapStateToProps, {setCurrentSongList})(ArtistBoard);


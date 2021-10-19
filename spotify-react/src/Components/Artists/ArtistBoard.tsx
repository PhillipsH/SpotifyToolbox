import React,{useState, useEffect} from "react";

import {Button} from "reactstrap";
import { connect } from "react-redux";
import Artist from "./Artist"
import {
  setCurrentSongList,
} from "../../flux/actions/spotifyActions";

const ArtistBoard = (props) => {
  const [artists, setArtists]:any = useState([]);

  useEffect(() => {
    console.log("THIS IS STARTING")
    let artistsRanking = {};
    for (let songIndex in props.likedSongs.list) {
      if (
        artistsRanking[props.likedSongs.list[songIndex].artist.artist_name] ===
        undefined
      ) {
        artistsRanking[props.likedSongs.list[songIndex].artist.artist_name] = 1;
      } else {
        artistsRanking[props.likedSongs.list[songIndex].artist.artist_name]++;
      }
    }
    console.log(artistsRanking)
    let sortedArtistRank: any = [];
    for (let artist in artistsRanking) {
      let artistObj = {
        artistName: artist,
        artistCounter: artistsRanking[artist],
      };
      sortedArtistRank.push(artistObj);
    }

    sortedArtistRank.sort(function (a: any, b: any) {
      return  b.artistCounter - a.artistCounter;
    });

    setArtists(sortedArtistRank)
  }, []);
  console.log(artists)
  function sortByLeastLiked(){
    let artistRank = JSON.parse(JSON.stringify(artists))
    let artistArrayCopy = artistRank.slice()
    artistArrayCopy.sort(function(a:any, b:any){
      return a.artistCounter - b.artistCounter
    })
    artistRank.currentArtistList = artistArrayCopy
    setArtists(artistRank)
  }

  function sortByMostLiked(){
    let artistRank = JSON.parse(JSON.stringify(artists))
    let artistArrayCopy = artistRank.slice()
    artistArrayCopy.sort(function(a:any, b:any){
      return b.artistCounter - a.artistCounter
    })
    artistRank.currentArtistList = artistArrayCopy
    setArtists(artistRank)
  }
  
  return (
    <div className="function-board">
      <h1>Artist</h1>
      <h5>Number of Unique Artists: {artists.length}</h5>
      <div className="toolbox">
        <Button onClick={sortByLeastLiked} color="success">Sort By Least Amount of Likes</Button>
        <Button onClick={sortByMostLiked} color="success">Sort By Most Amount of Likes</Button>
      </div>
      <div className="song-container">
        {artists.map((val, key) => (
            <Artist
              key={key}
              artist={val.artistName}
              counter={val.artistCounter}
            />
          ))
        } 
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  likedSongs: state.spotify.likedSongs,
});

export default connect(mapStateToProps, {setCurrentSongList})(ArtistBoard);


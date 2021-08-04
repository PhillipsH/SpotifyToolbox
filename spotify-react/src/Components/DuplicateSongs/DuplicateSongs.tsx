import React from "react";

import DuplicateSongSingle from "./DuplicateSongSingle";

const style = {
  cardBody: {
    width: "100%",
    color: "black",
  },
};

const DuplicateSongs = ({ dupeSongs, currentSongIndex }) => {
  function removeSong(){
    console.log(currentSongIndex)
  }
  return (
    <div className="card" style={style.cardBody}>
      <div className="card-body">
        <h5 className="song_title">{dupeSongs[0].track.name}</h5>
        <h6 className="artist">Artist: {dupeSongs[0].track.artists[0].name}</h6>
      </div>
      {/* <hr></hr> */}
      {dupeSongs.map((val, index) => {
        var date = new Date(val.added_at).toDateString();
        return (
          <DuplicateSongSingle 
            trackName={val.track.name}
            albumName={val.track.album.name} 
            date={date}
            currentSongIndex={currentSongIndex} 
            key={index} 
            currentPlacement={index}
            >

          </DuplicateSongSingle>
          // <div className="card-body duplicate-song-container" key={index}>
          //   <div className="duplicate-song-left">
          //     <h5 className="song_title">{val.track.name}</h5>
          //     <h5>KEY = {currentSongIndex}</h5>
          //     <h5>INDEX = {index}</h5>
          //     <h6 className="artist">Album: {val.track.album.name}</h6>
          //     <h6 className="artist">Date: {readable_date}</h6>
          //   </div>
          //   <div className="duplicate-song-right">
          //     <Button onClick={removeSong} color="danger">Remove</Button>
          //   </div>
          // </div>
        );
      })}
    </div>
  );
};

export default DuplicateSongs;
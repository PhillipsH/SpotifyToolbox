import React from "react";

import DuplicateSongSingle from "./DuplicateSongSingle";

const DuplicateSongs = ({ dupeSongs, currentSongIndex }) => {

  return (
    <div className="card card-container">
      <div className="card-body">
        <h5 className="song_title">{dupeSongs[0].track.name}</h5>
        <h6 className="artist">Artist: {dupeSongs[0].track.artists[0].name}</h6>
      </div>
      
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
        );
      })}
    </div>
  );
};

export default DuplicateSongs;
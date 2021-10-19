import React from "react";

import DuplicateSongSingle from "./DuplicateSongSingle";

const DuplicateSongs = ({ dupeSongs, currentSongIndex}) => {

  return (
    <div className="card card-container">
      <div className="card-body">
        <h5 className="song_title">{dupeSongs[0].track_name}</h5>
        <h6 className="artist">Artist: {dupeSongs[0].artist.artist_name}</h6>
      </div>
      
      {dupeSongs.map((val, index) => {
        var date = new Date(val.added_at).toDateString();
        return (
          <DuplicateSongSingle 
            trackName={val.track_name}
            albumName={val.album.album_name} 
            date={date}
            currentSongIndex={currentSongIndex} 
            key={index} 
            currentPlacement={index}
            currentSong = {val}
            > 
          </DuplicateSongSingle>

        );
      })}
    </div>
  );
};

export default DuplicateSongs;
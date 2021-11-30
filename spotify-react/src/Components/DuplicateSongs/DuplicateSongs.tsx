import React from "react";
import DuplicateSongSingle from "./DuplicateSongSingle";
import ItemStyles from '../Styles/Components/Items/Items.module.scss'

const DuplicateSongs = ({ dupeSongs, currentSongIndex}) => {

  return (
    <div className={ItemStyles.duplicateSongsContainer}>
      <div className={ItemStyles.cardBody}>
        <div className="title-body">
          <div className="image-div">
            <img className={ItemStyles.songImg} src={dupeSongs.image} alt="Album Image"></img>
          </div>
          <div>
            <h5 className="song_title">{dupeSongs.track_name}</h5>
            <h6 className="artist">{dupeSongs.artist.artist_name}</h6>
          </div>
        </div>
      </div>
      
      {dupeSongs.list.map((val, index) => {
        var date = new Date(val.added_at).toDateString();
        // console.log(val.track_id + val.linked_from_id)
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
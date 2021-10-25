import React, { useState, useEffect } from "react";
import SavedSong from "./SavedSong";
import { Button, Input } from "reactstrap";
import { connect } from "react-redux";
import { addToPlaylist } from "../Utility";
import { ITrack } from "../../types/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const LikedSongsBoard = (props) => {
  function addSongsToPlaylist() {
    // addToPlaylist(props.currentSongs.currentList)
  }
  async function filterList(event){
    const searchQuery = event.target.value
    console.log(searchQuery)
    setCurrentList(masterList.filter((song) =>{
      const songName = song.track_name.toLowerCase();
      return songName.includes(searchQuery.toLowerCase());
    }))
    console.log(currentList)
  }

  useEffect(() => {}, []);

  const { search } = window.location;
  const masterList: ITrack[] = props.likedSongs.list
  const query = new URLSearchParams(search).get('s');
  // const [searchQuery, setSearchQuery] = useState(query || '');
  const [currentList, setCurrentList]:any = useState(props.likedSongs.list)
  // let currentList = props.likedSongs.list
  

  return (
    <div className="function-board">
      <div className="cards-container">
        <div className="card-info" style={{ backgroundColor: "#ebfdef" }}>
          <FontAwesomeIcon
            className="card-icon"
            icon={faCalendarAlt}
            size={"3x"}
          />
          <h5 className="card-title">Total Number of Liked Songs</h5>
          <h2 className="card-data">{currentList.length}</h2>
        </div>
        <div className="card-info" style={{ backgroundColor: "#e8eff9" }}>
          <FontAwesomeIcon
            className="card-icon"
            icon={faCalendarAlt}
            size={"3x"}
          />
          <h5 className="card-title">Current Selected Board</h5>
          <h2 className="card-data">Liked Songs</h2>
        </div>
        <div className="card-info" style={{ backgroundColor: "#ffefe7" }}>
          <FontAwesomeIcon
            className="card-icon"
            icon={faCalendarAlt}
            size={"3x"}
          />
          <h5 className="card-title">Total Number of Selected Songs</h5>
          <h2 className="card-data">0</h2>
        </div>
      </div>
      <div className="toolbox">
          <h4>Current Songs</h4>
          <button className="toolbox-button" onClick={addSongsToPlaylist}>
            Add to Playlist
          </button>
          <div></div>
          <div></div>
          <Input className="search-box" type="text" placeholder="Search" onInput={filterList}></Input>
        </div>
        <div className="song-features">
          <span>Title</span>
          <span>Album</span>
          <span>Date Added</span>
        </div>
      <div className="song-container">
        {currentList.map((val, key) => {
          let album_image = val.album.album_images[2] ?? "";

          return (
            <SavedSong
              key={key}
              id={val.track_id}
              title={val.track_name}
              artist={val.artist.artist_name}
              album={val.album.album_name}
              image={album_image.url}
              date={val.added_at}
            />
          );
        })}
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  likedSongs: state.spotify.likedSongs,
});

export default connect(mapStateToProps, {})(LikedSongsBoard);

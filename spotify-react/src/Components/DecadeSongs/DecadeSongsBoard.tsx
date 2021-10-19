import React, { useEffect, useState } from 'react';
import {Button, Label} from "reactstrap";
import { connect } from "react-redux";
import DecadeCheckBox from "./DecadeCheckBox";
import DecadeSong from "./DecadeSong";

import { addToPlaylist } from "../Utility";
import { ITrack } from '../../types/interfaces';

const DecadeSongBoard = (props) => {
  const [decades, setDecades]:any = useState([]);
  const [decadeDict, setDecadeDict]:any = useState({})
  useEffect(() => {
    let decadeList = {}
    for (let index in props.likedSongs.list) {
      let date = new Date(props.likedSongs.list[index].release_date);
      let year = date.getFullYear();
      year = Math.floor(year / 10) * 10;
      if (decadeList[year] === undefined) {
        decadeList[year] = [props.likedSongs.list[index]];
      } else {
        decadeList[year].push(props.likedSongs.list[index]);
      }
    }    
    setDecadeDict(decadeList)
    console.log("initialize")
  }, []);

  function assessChecked(event){
    if(event.target.checked){
      setDecades([...decades, event.target.value])
    }else{
      setDecades(decades.filter(decade => decade != event.target.value))
    }

  }
  let currentSongs:ITrack[] = []
  for(let decadeIndex in decades){
    console.log(decades[decadeIndex])
    for(let songIndex in decadeDict[decades[decadeIndex]]){
      currentSongs.push(decadeDict[decades[decadeIndex]][songIndex])
    }
  }

  function addSongsToPlaylist(){
    addToPlaylist(props.currentSongs.currentList.currentSongList)
  }

  return (
    <div className="function-board">
      <h1>Decades</h1>
      <h5>Number of Current Songs: {currentSongs.length}</h5>
      <div className="toolbox">
        <Button onClick={addSongsToPlaylist} color="success">Add to Playlist</Button>
      </div>
      <div id="decade-selector">
        
        {Object.keys(decadeDict).map((key, index) => (
          <div className="decade" onChange={assessChecked}>
            <Label check >
                  <input type="checkbox" name={key} value={key}/>
                  <h5>{key}</h5>
            </Label>
          </div>
        ))}
      </div>
      <div className="song-container">
        {currentSongs.map((val, key) => (
            <DecadeSong
              key={key}
              id={val.track_id}
              title={val.track_name}
              artist={val.artist.artist_name}
              album={val.album.album_name}
              date={val.release_date}
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

export default connect(mapStateToProps, {})(DecadeSongBoard);


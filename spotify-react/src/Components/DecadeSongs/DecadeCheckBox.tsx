import React from "react";
import {Label} from "reactstrap";
import { connect } from "react-redux";
import {
  setCurrentSongList,
  
} from "../../flux/actions/spotifyActions";

const DecadeCheckBox = (props) => {

  async function assessChecked(event){
    console.log(event.target.value);
    console.log(event.target.checked);

    let currentSongsClone = JSON.parse(JSON.stringify(props.currentSongs))

    if(event.target.checked){
      currentSongsClone.currentList["currentDecades"].push(props.year)
    }else{
      for(let decadeIndex in currentSongsClone.currentList["currentDecades"]){
        if(currentSongsClone.currentList["currentDecades"][decadeIndex] == props.year){
          currentSongsClone.currentList["currentDecades"].splice(decadeIndex, 1)
        }
      }
    }

    currentSongsClone.currentList.currentSongList = []
    for(let yearIndex in currentSongsClone.currentList.currentDecades){
      currentSongsClone.currentList.currentSongList = currentSongsClone.currentList.currentSongList.concat(currentSongsClone.currentList.songDecadeList[currentSongsClone.currentList.currentDecades[yearIndex]])
      console.log(currentSongsClone.currentList.songDecadeList[props.currentSongs.currentList.currentDecades[yearIndex]])
    }

    console.log(currentSongsClone)
    props.setCurrentSongList(currentSongsClone.currentList, "DECADE_SONGS");
  }

  return (
        <div className="decade" onChange={assessChecked}>
            <Label check>
                <input type="checkbox" name={props.year} value={props.year}/>
                <h5>{props.year}</h5>
            </Label>
        </div>
  )
};
const mapStateToProps = (state: any) => ({
  currentSongs: state.spotify.currentSongs,
});

export default connect(mapStateToProps, {setCurrentSongList})(DecadeCheckBox);


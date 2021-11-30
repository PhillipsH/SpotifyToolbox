import React from "react";
import ItemsStyle from '../Styles/Components/Items/Items.module.scss'
import {Button} from "reactstrap";
import { connect } from "react-redux";
import {
  removeSongs,
} from "../../flux/actions/spotifyActions";

const DuplicateSongSingle = (props) => {

  function removeSingle(){
    let id:string [] = props.currentSong.linked_from_id ?? props.currentSong.track_id
    console.log(id)
    props.removeSongs([id])
  }
  return (
    <div className={ItemsStyle.duplicateSong} key={props.index}>
      <div className="duplicate-song-left">
        <h5 className="song_title">{props.currentSong.track_name}</h5>
        <h6 className="artist">Album: {props.currentSong.album.album_name}</h6>
        <h6 className="date">Date: {props.date}</h6>
      </div>
      <div className="duplicate-song-right">
        <Button onClick={removeSingle} color="danger">Remove</Button>
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
});

export default connect(mapStateToProps, {removeSongs})(DuplicateSongSingle);


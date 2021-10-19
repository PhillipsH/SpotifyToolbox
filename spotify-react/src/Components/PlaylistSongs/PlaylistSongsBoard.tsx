import React, {useEffect} from "react";
import PlaylistSong from './PlaylistSong'
import {Button} from "reactstrap";
import { connect } from "react-redux";
import { addToPlaylist } from "../Utility";
import { IPlaylistTrack } from "../../types/interfaces";
import { getPlaylistSongs } from "../../flux/actions/spotifyActions";
import { addLoading } from "../../flux/actions/uiAction";
import { LoadingTypes } from "../../flux/actions/types";

const PlaylistSongsBoard = (props) => {

useEffect(() => {
  if(props.playlistSongs.initialized == false){
    addLoading([LoadingTypes.PlaylistSongs])
  }
}, []);

    let currentSongs:IPlaylistTrack[] = []
    let likedSongsObj: any = {};
    let likedSongsObjName: any = {}
    let likedSongsObjId: any = {}
    let playlistUniqueSongs: any = [];

    // let playlistSongs = {};

    // Create an object of props of all liked songs with the key being the isrc
    for (let index in props.likedSongs.list) {
      // likedSongsObj[props.likedSongs.list[index].track.external_ids.isrc] =
      //   props.likedSongs.list[index];
        
      likedSongsObjName[props.likedSongs.list[index].track_name + props.likedSongs.list[index].artists_name] =
        props.likedSongs.list[index];
      
      if(props.likedSongs.list[index].linked_from_id !== undefined){
        likedSongsObjId[props.likedSongs.list[index].linked_from_id] = props.likedSongs.list[index]
      }else{
        likedSongsObjId[props.likedSongs.list[index].track_id] = props.likedSongs.list[index]
      }
    }

    for (let index in props.playlistSongs.list) {
      // let id:string = (props.playlistSongs.list[index].track.linked_from_id !== undefined) ? props.playlistSongs.list[index].track.linked_from_id : props.playlistSongs.list[index].track.id

      let id:string
      if(props.playlistSongs.list[index].linked_from_id !== undefined){
        id = props.playlistSongs.list[index].linked_from_id
      }else{
        id = props.playlistSongs.list[index].track_id
      }
      
      if(
        likedSongsObjName[props.playlistSongs.list[index].track_name + props.playlistSongs.list[index].artist.artist_name] === undefined 
        && likedSongsObjId[id] === undefined
        // && likedSongsObj[props.playlistSongs.list[index].track.external_ids.isrc] === undefined
        ){
        playlistUniqueSongs.push(props.playlistSongs.list[index]);
      }
    }

    currentSongs = playlistUniqueSongs
    // props.setCurrentSongList(playlistUniqueSongs, "PLAYLIST_UNIQUES_SONGS");

  function addSongsToPlaylist(){
    addToPlaylist(props.currentSongs.currentList)
  }
  return (
    <div className="function-board">
      <h5>Playlist Songs: {currentSongs.length}</h5>
      <div className="toolbox">
        <Button color="success" onClick={addSongsToPlaylist}>Add to Playlist</Button>
      </div>
      <div className="song-container">
        {currentSongs.map((val, key) => (
            <PlaylistSong
              key={key}
              id={val.track_id}
              playlistName={val.playlist_name}
              title={val.track_name}
              artist={val.artist.artist_name}
              album={val.album.album_name}
              date={val.added_at}
            />
          ))}   
      </div>  
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  likedSongs: state.spotify.likedSongs,
  playlistSongs: state.spotify.playlistSongs
});

export default connect(mapStateToProps, {getPlaylistSongs,addLoading})(PlaylistSongsBoard);


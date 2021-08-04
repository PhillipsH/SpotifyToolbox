import React from "react";
import PlaylistSong from './PlaylistSong'
import {Button} from "reactstrap";
import { connect } from "react-redux";
import {
  getLikedSongs,
  getPlaylistSongs,
  setCurrentSongList,
} from "../../flux/actions/spotifyActions";

const style = {
  cardBody: {
    width: "100%",
    color: "black",
  },
};

const PlaylistSongsBoard = (props) => {
  function addToPlaylist(){
    let spotifyUris:string []= []
    for(let songIndex in props.currentSongs){
      spotifyUris.push(props.currentSongs[songIndex].track.uri)
    }
  }
  return (
    <div className ="song-board">
      <div>
        <p>Remove ALL</p>
        <Button color="success">Add to Playlist</Button>
      </div>
      {props.currentSongs.currentList.map((val, key) => (
          <PlaylistSong
            key={key}
            id={val.track.id}
            playlistName={val.playlist_name}
            title={val.track.name}
            artist={val.track.artists[0].name}
            album={val.track.album.name}
            date={val.added_at}
          />
        ))}     
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  currentSongs: state.spotify.currentSongs,
});

export default connect(mapStateToProps, {})(PlaylistSongsBoard);


import React, { useEffect } from "react";
import { Spinner} from "reactstrap";
import { connect } from "react-redux";

import {
  getLikedSongs,
  getPlaylistSongs,
  setCurrentSongList,
  setItemsLoading,
  setPlaylistSongs,
  getProfile,
} from "../flux/actions/spotifyActions";

import Song from "./LikedSongs/LikedSong";
import DuplicateSongsBoard from "./DuplicateSongs/DuplicateSongsBoard";
import PlaylistSongsBoard from "./PlaylistSongs/PlaylistSongsBoard";
import DecadeSongsBoard from "./DecadeSongs/DecadeSongsBoard";
import LikedSongsBoard from "./LikedSongs/LikedSongsBoard";
import ArtistBoard from "./Artists/ArtistBoard"
import ButtonFunctions from "./ButtonFunctions/ButtonFunctions"
import Sidenav  from "./Sidenav";


export const Dashboard = (props) => {
  useEffect(() => {
    if (props.likedSongs.length === 0) {
      props.getLikedSongs();
      props.getProfile();
    }
  }, []);
  let displayName = 'user'
  let profilePic = 'user'
  let followerCount = '3'
  let profileUrl = 'https://www.spotify.com'

  if(props.profile.display_name != undefined){
    displayName = props.profile.display_name
    profilePic = props.profile.images[0].url
    followerCount = props.profile.followers.total
    profileUrl = props.profile.external_urls.spotify
  }

  let songList = <div></div>;
  if(props.currentSongs.currentType == "LOADING"){
    songList = (
      <div>
        <Spinner color="success" />
        <h2>Currently Loading Songs</h2>
      </div>
    );
  }else{
    switch (props.currentSongs.currentType) {
      case "LIKED_SONGS":
        songList = 
        <div className='function-board'>
          <div className='song-container'>
            {props.currentSongs.currentList.map((val, key) => (
              <Song
                key={key}
                id={val.track.id}
                title={val.track.name}
                artist={val.track.artists[0].name}
                album={val.track.album.name}
                date={val.added_at}
              />
            ))}
          </div>
        </div>
        break;
  
      case "PLAYLIST_UNIQUES_SONGS":
        songList = <PlaylistSongsBoard></PlaylistSongsBoard>
        break;
  
      case "LIKED_UNIQUE_SONGS":
        songList = <LikedSongsBoard></LikedSongsBoard>
        break;
  
      case "DUPLICATE_SONGS":
        songList = <DuplicateSongsBoard></DuplicateSongsBoard>;
        break;

      case "DECADE_SONGS":
        songList = <DecadeSongsBoard></DecadeSongsBoard>;
        break;

      case "ARTIST_RANK":
        songList = <ArtistBoard></ArtistBoard>;
        break;
    }
  }


  return (
    <div>
      <Sidenav></Sidenav>
      {/* <Siding></Siding> */}
      <div id="dashboard-div">
        <header className="App-header">
          <h1>Spotify Dashboard</h1>
        </header>
        <h3>Song Functions</h3>
        <ButtonFunctions></ButtonFunctions>
        <h3>Current Songs</h3>
        {songList}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  likedSongs: state.spotify.likedSongs,
  playlistSongs: state.spotify.playlistSongs,
  currentSongs: state.spotify.currentSongs,
  profile: state.spotify.profile,
  loading: state.spotify.loading,
});

export default connect(mapStateToProps, {
  getLikedSongs,
  getPlaylistSongs,
  setCurrentSongList,
  setItemsLoading,
  setPlaylistSongs,
  getProfile
})(Dashboard);

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListAlt,
  faMicrophone,
  faMusic,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { ITrack } from "../types/interfaces";
import MainStyle from "./Styles/Components/Main.module.scss";

export const Sidebar = (props) => {
  let displayName = "user";
  let profilePic = "user";
  let followerCount = "-";
  let profileUrl = "https://www.spotify.com";
  let topFiveArtists: any = [];
  let topFivePopular: any = [];

  if (props.profile.display_name != undefined) {
    displayName = props.profile.display_name;
    profilePic = props.profile.images[0].url;
    followerCount = props.profile.followers.total;
    profileUrl = props.profile.external_urls.spotify;
  }
  function getTopFiveArtists() {
    const numArtist = 5;
    let topFiveArtist: any = [];

    if (props.artists.initialized) {
      if (props.artists.list.length > 5) {
        for (let i = 0; i < 5; i++) {
          topFiveArtist.push(props.artists.list[i]);
        }
        topFiveArtist.sort((a, b) => b.counter - a.counter);
        for (let i = 5; i < props.artists.list.length; i++) {
          let index = topFiveArtist.length;
          while (
            index > 0 &&
            props.artists.list[i].counter > topFiveArtist[index - 1].counter
          ) {
            index--;
          }
          if (index < 5) {
            topFiveArtist.splice(index, 0, props.artists.list[i]);
            topFiveArtist.splice(topFiveArtist.length - 1, 1);
          }
        }
        for (let i = 0; i < 5; i++) {
          topFiveArtists.push(
            <div className={MainStyle.likedArtist}>
              <span>0{i + 1}</span>
              <img src={topFiveArtist[i].images[2].url}></img>

              <div className={MainStyle.likedArtistText}>
                <span>{topFiveArtist[i].artist_name}</span>
                <br></br>
                <span>{topFiveArtist[i].counter} Saved Songs</span>
              </div>
            </div>
          );
        }
      }
    }
  }

  function getPopularSixSongs() {
    let popularFiveSongs: ITrack[] = [];
    if (props.likedSongs.initialized) {
      if (props.likedSongs.list.length > 5) {
        for (let i = 0; i < 6; i++) {
          popularFiveSongs.push(props.likedSongs.list[i]);
        }
        popularFiveSongs.sort((a, b) => b.popularity - a.popularity);

        for (let i = 6; i < props.likedSongs.list.length; i++) {
          let index = popularFiveSongs.length;
          while (
            index > 0 &&
            props.likedSongs.list[i].popularity >
              popularFiveSongs[index - 1].popularity
          ) {
            index--;
          }
          if (index < 6) {
            popularFiveSongs.splice(index, 0, props.likedSongs.list[i]);
            popularFiveSongs.splice(popularFiveSongs.length - 1, 1);
          }
        }

        for (let i = 0; i < 6; i++) {
          topFivePopular.push(
            <div className={MainStyle.popularSong}>
              <div>
                <img src={popularFiveSongs[i].album.album_images[2].url}></img>
              </div>
              <span>{popularFiveSongs[i].track_name}</span>
            </div>
          );
        }
      }
    }
  }

  getTopFiveArtists();
  getPopularSixSongs();

  return (
    <div className={MainStyle.sidebar}>
      <div className={MainStyle.userContainer}>
        <img className={MainStyle.userImg} src={profilePic}></img>
        <h5 className={MainStyle.userName}>{displayName}</h5>
      </div>

      <h5>Stats</h5>
      <div className={MainStyle.statContainer}>
        <div className={MainStyle.stat}>
          <div
            className={`${MainStyle.sidebarIcon} ${MainStyle.greenColor}`}
          >
            <FontAwesomeIcon
              className={MainStyle.statIcon}
              icon={faMusic}
              size={"2x"}
            />
          </div>
          <span>Liked Songs: </span>
          <span>{props.likedSongs.list.length}</span>
        </div>
        <div className={MainStyle.stat}>
          <div className={`${MainStyle.sidebarIcon} ${MainStyle.blueColor}`}>
            <FontAwesomeIcon
              className={MainStyle.statIcon}
              icon={faListAlt}
              size={"2x"}
            />
          </div>
          <span>Playlist Songs: </span>
          <span>{props.playlistSongs.list.length}</span>
        </div>
        <div className={MainStyle.stat}>
          <div className={`${MainStyle.sidebarIcon} ${MainStyle.redColor}`}>
            <FontAwesomeIcon
              className={MainStyle.statIcon}
              icon={faMicrophone}
              size={"2x"}
            />
          </div>
          <span>Unique Artists: </span>
          <span>{props.artists.list.length}</span>
        </div>
        <div className={MainStyle.stat}>
          <div className={`${MainStyle.sidebarIcon} ${MainStyle.yellowColor}`}>
            <FontAwesomeIcon
              className={MainStyle.statIcon}
              icon={faUserFriends}
              size={"2x"}
            />
          </div>
          <span>Followers: </span>
          <span>{followerCount}</span>
        </div>
      </div>

      <h5>Your Most Popular Songs</h5>
      <div className={MainStyle.popularContainer}>{topFivePopular}</div>

      <h5>Most Liked Artists</h5>
      <div className={MainStyle.likedArtistContainer}>{topFiveArtists}</div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  likedSongs: state.spotify.likedSongs,
  playlistSongs: state.spotify.playlistSongs,
  profile: state.spotify.profile,
  artists: state.spotify.artists,
});

export default connect(mapStateToProps, {})(Sidebar);

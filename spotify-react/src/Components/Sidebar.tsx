import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListAlt,
  faMicrophone,
  faMusic,
  // faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { ITrack } from "../types/interfaces";
import MainStyle from "./Styles/Components/Main.module.scss";

export const Sidebar = (props) => {
  const [profile, setProfile]: any = useState({
    displayName: "user",
    profilePic: (
      <FontAwesomeIcon
        className={MainStyle.statIcon}
        icon={faMusic}
        size={"2x"}
      />
    ),
    followerCount: "-",
  });
  const [topArtist, setTopArtist]: any = useState([
    {
      img: "yo",
      artist: "loading",
      counter: "-",
    },
    {
      img: "yo",
      artist: "loading",
      counter: "-",
    },
    {
      img: "yo",
      artist: "loading",
      counter: "-",
    },
    {
      img: "yo",
      artist: "loading",
      counter: "-",
    },
    {
      img: "yo",
      artist: "loading",
      counter: "-",
    },
  ]);
  const [popularSongs, setPopularSongs]: any = useState([
    {
      img: "yo",
      title: "loading",
    },
    {
      img: "yo",
      title: "loading",
    },
    {
      img: "yo",
      title: "loading",
    },
    {
      img: "yo",
      title: "loading",
    },
    {
      img: "yo",
      title: "loading",
    },
    {
      img: "yo",
      title: "loading",
    },
  ]);

  useEffect(() => {
    if (props.profile.initialized) {
      setProfile({
        displayName: props.profile.display_name,
        profilePic: props.profile.images[0].url,
        followerCount: props.profile.followers.total,
      });
    }
  }, [props.profile]);

  useEffect(() => {
    function getTopFiveArtists() {
      const numArtist = 5;
      let topFiveArtist: any = [];

      if (props.artists.initialized) {
        if (props.artists.list.length > numArtist) {
          for (let i = 0; i < numArtist; i++) {
            topFiveArtist.push(props.artists.list[i]);
          }
          topFiveArtist.sort((a, b) => b.counter - a.counter);
          for (let i = numArtist; i < props.artists.list.length; i++) {
            let index = topFiveArtist.length;
            while (
              index > 0 &&
              props.artists.list[i].counter > topFiveArtist[index - 1].counter
            ) {
              index--;
            }
            if (index < numArtist) {
              topFiveArtist.splice(index, 0, props.artists.list[i]);
              topFiveArtist.splice(topFiveArtist.length - 1, 1);
            }
          }
          let top: any = [];
          for (let i = 0; i < numArtist; i++) {
            topFiveArtists.push(
              <div className={MainStyle.likedArtist}>
                <span>0{i + 1}</span>
                <img src={topFiveArtist[i].images[2].url}></img>

                <div className={MainStyle.likedArtistText}>
                  <span className={MainStyle.detailTitle}>
                    {topFiveArtist[i].artist_name}
                  </span>
                  <br></br>
                  <span>{topFiveArtist[i].counter} Songs Saved</span>
                </div>
              </div>
            );
          }
          for (let i = 0; i < numArtist; i++) {
            top.push({
              image: topFiveArtist[i].images[2].url,
              artist: topFiveArtist[i].artist_name,
              counter: topFiveArtist[i].counter,
            });
          }
          setTopArtist(top);
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
          let top: any = [];
          for (let i = 0; i < 6; i++) {
            topFivePopular.push(
              <div className={MainStyle.popularSong}>
                <div>
                  <img
                    src={popularFiveSongs[i].album.album_images[2].url}
                  ></img>
                </div>
                <span>{popularFiveSongs[i].track_name}</span>
              </div>
            );
          }
          for (let i = 0; i < 6; i++) {
            top.push({
              image: popularFiveSongs[i].album.album_images[2].url,
              title: popularFiveSongs[i].track_name,
            });
          }
          setPopularSongs(top);
        }
      }
    }

    getPopularSixSongs();
    getTopFiveArtists();
  }, [props.likedSongs]);

  let displayName = "user";
  let profilePic = "user";
  let followerCount = "-";
  let topFiveArtists: any = [];
  let topFivePopular: any = [];

  if (props.profile.display_name != undefined) {
    displayName = props.profile.display_name;
    profilePic = props.profile.images[0].url;
    followerCount = props.profile.followers.total;
  }
  function getTopFiveArtists() {
    const numArtist = 5;
    let topFiveArtist: any = [];

    if (props.artists.initialized) {
      if (props.artists.list.length > numArtist) {
        for (let i = 0; i < numArtist; i++) {
          topFiveArtist.push(props.artists.list[i]);
        }
        topFiveArtist.sort((a, b) => b.counter - a.counter);
        for (let i = numArtist; i < props.artists.list.length; i++) {
          let index = topFiveArtist.length;
          while (
            index > 0 &&
            props.artists.list[i].counter > topFiveArtist[index - 1].counter
          ) {
            index--;
          }
          if (index < numArtist) {
            topFiveArtist.splice(index, 0, props.artists.list[i]);
            topFiveArtist.splice(topFiveArtist.length - 1, 1);
          }
        }
        for (let i = 0; i < numArtist; i++) {
          topFiveArtists.push(
            <div className={MainStyle.likedArtist}>
              <span>0{i + 1}</span>
              <img src={topFiveArtist[i].images[2].url}></img>

              <div className={MainStyle.likedArtistText}>
                <span className={MainStyle.detailTitle}>
                  {topFiveArtist[i].artist_name}
                </span>
                <br></br>
                <span>{topFiveArtist[i].counter} Songs Saved</span>
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

      <div className={MainStyle.statSection}>
        <span className={MainStyle.sidebarSectionTitle}>Stats</span>
        <div className={MainStyle.statContainer}>
          <div className={MainStyle.stat}>
            <div className={`${MainStyle.sidebarIcon} ${MainStyle.greenColor}`}>
              <FontAwesomeIcon
                className={MainStyle.statIcon}
                icon={faMusic}
                size={"2x"}
              />
            </div>
            <div className={MainStyle.statDetails}>
              <span className={MainStyle.detailTitle}>Liked Songs </span>
              <br></br>
              <span className={MainStyle.secondaryTextColor}>
                {props.likedSongs.list.length}
              </span>
            </div>
          </div>
          <div className={MainStyle.stat}>
            <div className={`${MainStyle.sidebarIcon} ${MainStyle.blueColor}`}>
              <FontAwesomeIcon
                className={MainStyle.statIcon}
                icon={faListAlt}
                size={"2x"}
              />
            </div>
            <div className={MainStyle.statDetails}>
              <span className={MainStyle.detailTitle}>Playlist Songs </span>
              <br></br>
              <span className={MainStyle.secondaryTextColor}>
                {props.playlistSongs.list.length}
              </span>
            </div>
          </div>
          <div className={MainStyle.stat}>
            <div className={`${MainStyle.sidebarIcon} ${MainStyle.redColor}`}>
              <FontAwesomeIcon
                className={MainStyle.statIcon}
                icon={faMicrophone}
                size={"2x"}
              />
            </div>
            <div className={MainStyle.statDetails}>
              <span className={MainStyle.detailTitle}>Unique Artists </span>
              <br></br>
              <span className={MainStyle.secondaryTextColor}>
                {props.artists.list.length}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={MainStyle.popularSection}>
        <span className={MainStyle.sidebarSectionTitle}>
          Your Most Popular Songs
        </span>
        <div className={MainStyle.popularContainer}>
          {/* {topFivePopular} */}
          {popularSongs.map((val, key) => (
            <div className={MainStyle.popularSong}>
              <div>
                <img src={val.image}></img>
              </div>
              <span>{val.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={MainStyle.likedArtistSection}>
        <span className={MainStyle.sidebarSectionTitle}>
          Most Liked Artists
        </span>
        {/* <div className={MainStyle.likedArtistContainer}>{topFiveArtists}</div> */}
        {topArtist.map((val, key) => (
          <div className={MainStyle.likedArtist}>
            <span>0{key + 1}</span>
            <img src={val.image}></img>
            <div className={MainStyle.likedArtistText}>
              <span className={MainStyle.detailTitle}>{val.artist}</span>
              <br></br>
              <span>{val.counter} Songs Saved</span>
            </div>
          </div>
        ))}
      </div>
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

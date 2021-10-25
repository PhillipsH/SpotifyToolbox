import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt, faMicrophone, faMusic, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

export const Sidebar = (props) => {
  let displayName = "user";
  let profilePic = "user";
  let followerCount = "-";
  let profileUrl = "https://www.spotify.com";

  if (props.profile.display_name != undefined) {
    displayName = props.profile.display_name;
    profilePic = props.profile.images[0].url;
    followerCount = props.profile.followers.total;
    profileUrl = props.profile.external_urls.spotify;
  }
  // let image = props.likedSongs.list[0].album.album_images[2].url ?? "yo";
  let image = "yo"
  return (
    <div className="sidebar">
      <div className="user-div">
        <img className="user-img" src={profilePic}></img>
        <h5 className="user-name">{displayName}</h5>
      </div>

      <h5>Recently Played</h5>
      <div className="recent-container">
        <div className="recent-song">
          <div>
            <img src={image}></img>
          </div>
          <span>hello</span>
        </div>
        <div className="recent-song">
          <div>
            <img src={image}></img>
          </div>
          <span>hello</span>
        </div>
        <div className="recent-song">
          <div>
            <img src={image}></img>
          </div>
          <span>hello</span>
        </div>
        <div className="recent-song">
          <div>
            <img src={image}></img>
          </div>
          <span>hello</span>
        </div>
        <div className="recent-song">
          <div>
            <img src={image}></img>
          </div>
          <span>hello</span>
        </div>
        <div className="recent-song">
          <div>
            <img src={image}></img>
          </div>
          <span>hello</span>
        </div>
      </div>

      <h5>Most Liked Artists</h5>
      <div className="liked-artist-container">
        <div className="liked-artist">
          <span>01</span>
          <img src={image}></img>
          <span>hello</span>
        </div>
        <div className="liked-artist">
          <span>02</span>
          <img src={image}></img>
          <span>hello</span>
        </div>
        <div className="liked-artist">
          <span>03</span>
          <img src={image}></img>
          <span>hello</span>
        </div>
        <div className="liked-artist">
          <span>04</span>
          <img src={image}></img>
          <span>hello</span>
        </div>
        <div className="liked-artist">
          <span>05</span>
          <img src={image}></img>
          <span>hello</span>
        </div>
      </div>

      <h5>Stats</h5>
      <div className="stats-container">
        <div className="stat">
          <FontAwesomeIcon icon={faMusic} size={'2x'}/>
          <span>Liked Songs:</span>
          <span>{props.likedSongs.list.length}</span>
        </div>
        <div className="stat">
          <FontAwesomeIcon icon={faListAlt} size={'2x'}/>
          <span>Playlist Songs: </span>
          <span>{props.playlistSongs.list.length}</span>
        </div>
        <div className="stat">
          <FontAwesomeIcon icon={faMicrophone} size={'2x'}/>
          <span>Unique Artists: </span>
          <span>{followerCount}</span>
        </div>
        <div className="stat">
          <FontAwesomeIcon icon={faUserFriends} size={'2x'}/>
          <span>Followers: </span>
          <span>{followerCount}</span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  likedSongs: state.spotify.likedSongs,
  playlistSongs: state.spotify.playlistSongs,
  profile: state.spotify.profile,
});

export default connect(mapStateToProps, {})(Sidebar);

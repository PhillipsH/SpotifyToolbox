import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import likedImg from "../Icons/like.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCopy,
  faMicrophone,
  faRecordVinyl,
  faTrophy,
  faListAlt,
  faNotEqual,
  faAddressCard,
  faSignOutAlt,
  faAddressBook,
  faDonate,
  faMusic

} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub
} from "@fortawesome/free-brands-svg-icons";

export const Sidenav = (props) => {
  return (
    <div className="sidenav">
      <h2 className="nav-title"><FontAwesomeIcon icon={faRecordVinyl} /> SpotifyTools</h2>
      <div className="nav-tools">
        <span>Tools</span>
        <Link to="/Decade">
          <div className="nav-selection">
            <div>
              <FontAwesomeIcon icon={faCalendarAlt} className="nav-icon"/>
              <span>Decade</span>
            </div>
          </div>
        </Link>
        <Link to="/Duplicates">
          <div className="nav-selection">
            <div>
              <FontAwesomeIcon icon={faCopy} className="nav-icon"/>
              <span>Duplicates</span>
            </div>
          </div>
        </Link>
        <Link to="/Genre">
          <div className="nav-selection">
            <div>
              <FontAwesomeIcon icon={faMicrophone} className="nav-icon"/>
              <span>Genre</span>
            </div>
          </div>
        </Link>
        <Link to="/Top">
          <div className="nav-selection">
            <div>
              <FontAwesomeIcon icon={faTrophy} className="nav-icon"/>
              <span>Top Ranking</span>
            </div>
          </div>
        </Link>
        <Link to="/UniqueSaved">
          <div className="nav-selection">
            <div>
              <FontAwesomeIcon icon={faNotEqual} className="nav-icon"/>
              <span>Unique Saved</span>
            </div>
          </div>
        </Link>
        <Link to="/UniquePlaylist">
          <div className="nav-selection">
            <div>
              <FontAwesomeIcon icon={faNotEqual} className="nav-icon"/>
              <span> Unique Playlist</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="nav-tools">
        <span>Library</span>
        <Link to="/">
          <div className="nav-selection">
            <div>
              <FontAwesomeIcon icon={faMusic} className="nav-icon"/>
              <span>Liked Songs</span>
            </div>
          </div>
        </Link>
        <Link to="/Playlists">
          <div className="nav-selection">
            <div>
              <FontAwesomeIcon icon={faListAlt} className="nav-icon"/>
              <span>Playlists</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="nav-tools">
        <span>General</span>
        <div className="nav-selection">
          <div>
            <FontAwesomeIcon icon={faAddressCard} className="nav-icon"/>
            <span>Spotify Profile</span>
          </div>
        </div>
        <div className="nav-selection">
          <div>
            <FontAwesomeIcon icon={faGithub} className="nav-icon"/>
            <span>Github Repo</span>
          </div>
        </div>
        <div className="nav-selection">
          <div>
            <FontAwesomeIcon icon={faDonate} className="nav-icon"/>
            <span>Donate</span>
          </div>
        </div>
        <div className="nav-selection">
          <div>
            <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon"/>
            <span>Log Out</span>
          </div>
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

export default connect(mapStateToProps, {})(Sidenav);

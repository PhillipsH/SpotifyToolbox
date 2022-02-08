import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import MainStyle from "./Styles/Components/Main.module.scss";

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
  faMusic,
  faBars,
  faPodcast,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const Sidenav = (props) => {
  useEffect(() => {
    if ("external_urls" in props.profile) {
      setProfileUrl(props.profile.external_urls.spotify);
    }
  }, [props.profile]);

  const [profileUrl, setProfileUrl]: any = useState();
  function toggleNav(event) {
    event.preventDefault();
  }

  return (
    <div
      className={`${MainStyle.sidenav} ${props.sidenavTheme ? MainStyle.closedBar : ""
        }`}
    >
      <div className={MainStyle.navHeader}>
        <div className={`${MainStyle.toggleSidebar}`}>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              props.setSidenavTheme(!props.sidenavTheme);
            }}
          >
            <FontAwesomeIcon icon={faBars} className={MainStyle.navIcon} />
          </a>
        </div>
        <div className={`${MainStyle.titleLogo}`}>
          <FontAwesomeIcon icon={faPodcast} className={``} />
           
          <span className={MainStyle.mainTitle}> SpotifyToolbox</span>
        </div>
      </div>

      <div className={MainStyle.navTools}>
        <span>Library</span>
        <ul>
          <li className={`${MainStyle.navSelection} ${(useLocation().pathname == '/') ? MainStyle.navSelected : ""
            }`}>
            <Link to="/" className={`${MainStyle.navLink} ${""}`}>
              <FontAwesomeIcon icon={faMusic} className={MainStyle.navIcon} />
              <span className={MainStyle.navName}>Liked Songs</span>
            </Link>
          </li>
          {/*Add Playlist feature*/}
          {/* <li className={MainStyle.navSelection}>
            <Link to="/Playlists" className={`${MainStyle.navLink} ${""}`}>
              <FontAwesomeIcon icon={faListAlt} className={MainStyle.navIcon} />
              <span className={MainStyle.navName}>Playlists</span>
            </Link>
          </li> */}
        </ul>
      </div>

      <div className={MainStyle.navTools}>
        <span>Tools</span>
        <ul>
          <li className={`${MainStyle.navSelection} ${(useLocation().pathname == '/decade') ? MainStyle.navSelected : ""
            }`}>
            <Link to="/decade" className={`${MainStyle.navLink} ${""}`}>
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className={MainStyle.navIcon}
              />
              <span className={MainStyle.navName}>Decade</span>
            </Link>
          </li>
          <li className={`${MainStyle.navSelection} ${(useLocation().pathname == '/duplicates') ? MainStyle.navSelected : ""
            }`}>
            <Link to="/duplicates" className={`${MainStyle.navLink} ${""}`}>
              <FontAwesomeIcon icon={faCopy} className={MainStyle.navIcon} />
              <span className={MainStyle.navName}>Duplicates</span>
            </Link>
          </li>
          <li className={`${MainStyle.navSelection} ${(useLocation().pathname == '/genre') ? MainStyle.navSelected : ""
            }`}>
            <Link to="/genre" className={`${MainStyle.navLink} ${""}`}>
              <FontAwesomeIcon
                icon={faMicrophone}
                className={MainStyle.navIcon}
              />
              <span className={MainStyle.navName}>Genre</span>
            </Link>
          </li>
          <li className={`${MainStyle.navSelection} ${(useLocation().pathname == '/top/songs') ? MainStyle.navSelected : ""
            }`}>
            <Link to="/top/songs" className={`${MainStyle.navLink} ${""}`}>
              <FontAwesomeIcon icon={faTrophy} className={MainStyle.navIcon} />
              <span className={MainStyle.navName}>Top Songs</span>
            </Link>
          </li>
          <li className={`${MainStyle.navSelection} ${(useLocation().pathname == '/top/artists') ? MainStyle.navSelected : ""
            }`}>
            <Link to="/top/artists" className={`${MainStyle.navLink} ${""}`}>
              <FontAwesomeIcon icon={faTrophy} className={MainStyle.navIcon} />
              <span className={MainStyle.navName}>Top Artists</span>
            </Link>
          </li>
          <li className={`${MainStyle.navSelection} ${(useLocation().pathname == '/uniqueSaved') ? MainStyle.navSelected : ""
            }`}>
            <Link to="/uniqueSaved" className={`${MainStyle.navLink} ${""}`}>
              <FontAwesomeIcon
                icon={faNotEqual}
                className={MainStyle.navIcon}
              />
              <span className={MainStyle.navName}>Unique Saved</span>
            </Link>
          </li>
          <li className={`${MainStyle.navSelection} ${(useLocation().pathname == '/uniquePlaylists') ? MainStyle.navSelected : ""
            }`}>
            <Link to="/uniquePlaylist" className={`${MainStyle.navLink} ${""}`}>
              <FontAwesomeIcon
                icon={faNotEqual}
                className={MainStyle.navIcon}
              />
              <span className={MainStyle.navName}>Unique Playlist</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className={MainStyle.navTools}>
        <span>General</span>
        <ul>
          <li className={MainStyle.navSelection}>
            <a href={profileUrl} target="_blank" className={`${MainStyle.navLink} ${''}`}>
              <FontAwesomeIcon
                icon={faAddressCard}
                className={MainStyle.navIcon}
              />
              <span className={MainStyle.navName}>Spotify Profile</span>
            </a>
          </li>
          <li className={MainStyle.navSelection}>
            <a
              href={"https://github.com/PhillipsH/SpotifyTools"}
              target="_blank"
              onClick={toggleNav}
              className={`${MainStyle.navLink} ${""}`}
            >
              <FontAwesomeIcon icon={faGithub} className={MainStyle.navIcon} />
              <span className={MainStyle.navName}>Github Repo</span>
            </a>
          </li>
          <li className={MainStyle.navSelection}>
            <a href={"https://Ko-fi.com/wagyubeep"} target="_blank" className={`${MainStyle.navLink} ${""}`}>
              <FontAwesomeIcon icon={faDonate} className={MainStyle.navIcon} />
              <span className={MainStyle.navName}>Donate</span>
            </a>
          </li>
          <li className={MainStyle.navSelection}>
            <a href={"/home"} className={`${MainStyle.navLink} ${""}`}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className={MainStyle.navIcon}
              />
              <span className={MainStyle.navName}>Home</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  profile: state.spotify.profile,
});

export default connect(mapStateToProps, {})(Sidenav);

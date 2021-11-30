import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MainStyle from "./Styles/Components/Main.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPodcast,
  faNotEqual,
  faBox,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Topbar = (props) => {
  let displayName = "user";
  let profilePic = "user";

  if (props.profile.display_name != undefined) {
    displayName = props.profile.display_name;
    profilePic = props.profile.images[0].url;
  }
  return (
    <div className={MainStyle.topbar}>
      <div className={MainStyle.sidenavExtension}>
        <div
          className={`${MainStyle.toggleSidebar} ${
            props.sidenavTheme ? MainStyle.closedToggle : ""
          }`}
        >
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
        <div
          className={`${MainStyle.titleLogo} ${
            props.sidenavTheme ? MainStyle.closedToggle : ""
          }`}
        >
          <FontAwesomeIcon icon={faPodcast} className={MainStyle.navIcon} />
          <span className={MainStyle.title}>SpotifyTools</span>
        </div>
      </div>
      <div
        className={`${MainStyle.dashboardExtension} ${MainStyle.verticalCenter}`}
      >
        {/* <ul className={MainStyle.topbarNav}>
          <li>
            <Link to="/uniquePlaylist">
              <span className={MainStyle.navName}>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/uniquePlaylist">
              <span className={MainStyle.navName}>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/uniquePlaylist">
              <span className={MainStyle.navName}>How To Use</span>
            </Link>
          </li>
        </ul> */}
        <div className={MainStyle.cartContainer}>
          <FontAwesomeIcon icon={faBox} className={MainStyle.boxIcon} />
        </div>
      </div>
      <div className={MainStyle.sidebarExtension}>
        <div className={MainStyle.userContainer}>
          <img className={MainStyle.userImg} src={profilePic}></img>
          <h5 className={MainStyle.userName}>{displayName}</h5>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  profile: state.spotify.profile,
});

export default connect(mapStateToProps, {})(Topbar);

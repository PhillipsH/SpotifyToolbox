import React, { useEffect, useState } from "react";
import LandingStyle from "./Styles/Components/LandingPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPodcast } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Topbar = () => {
  // const [prevScroll, setPrevScroll]: any = useState(window.pageYOffset);
  const [topbar, setTopbar]: any = useState("showBar");
  let prevScroll = window.pageYOffset
  window.addEventListener("scroll", handleScroll.bind(this), { passive: true });
  function handleScroll() {
    var currentScrollPos = window.pageYOffset;
    if (prevScroll < currentScrollPos) {
      setTopbar("noShowBar");
    } else {
      setTopbar("showBar");
    }
    prevScroll = (currentScrollPos);
  }
  // console.log(topbar)
  return (
    <div className={LandingStyle.topbar + " " + LandingStyle[topbar]}>
      <div className={`${LandingStyle.titleLogo}`}>
        <FontAwesomeIcon icon={faPodcast} className={LandingStyle.navIcon} />
        <span className={LandingStyle.title}>SpotifyTools</span>
      </div>
      <div className={LandingStyle.topNav}>
        <a className="active" href="#home">
          Home
        </a>
        <a href="#about">About</a>
        <a href="#cards">Tools</a>
      </div>
      <a></a>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  profile: state.spotify.profile,
});

export default Topbar;

import React, { useState } from "react";
import LandingStyle from "./Styles/Components/LandingPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPodcast } from "@fortawesome/free-solid-svg-icons";

export const Topbar = () => {
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
        <a href="#faq">FAQ</a>
      </div>
      <a></a>
    </div>
  );
};

export default Topbar;

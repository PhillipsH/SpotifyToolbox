import React, { useState, useEffect } from "react";
import LandingStyle from "./Styles/Components/LandingPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPodcast } from "@fortawesome/free-solid-svg-icons";

export const Topbar = () => {
  const [topbar, setTopbar]: any = useState("showBar");
  let prevScroll = window.pageYOffset
  window.addEventListener("scroll", handleScroll, { passive: true });
  useEffect(() => {
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  function handleScroll() {
    var currentScrollPos = window.pageYOffset;
    if (prevScroll < currentScrollPos) {
      setTopbar("noShowBar");
    } else if (currentScrollPos == 0){
      setTopbar("invis");
    }else{
      setTopbar("showBar");
    }
    prevScroll = (currentScrollPos);
  }

  return (
    <div className={LandingStyle.topbar + " " + LandingStyle[topbar]}>
      <div className={`${LandingStyle.titleLogo}`}>
        <FontAwesomeIcon icon={faPodcast} className={LandingStyle.navIcon} />
        <span className={LandingStyle.title}>SpotifyToolbox</span>
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

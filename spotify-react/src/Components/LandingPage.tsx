import React from "react";
import { Button } from "reactstrap";
import LandingStyle from "./Styles/Components/LandingPage.module.scss";
import MainStyle from "./Styles/Components/Main.module.scss";
import MusicListener from "../Icons/music-listener.svg";
import Topbar from "./Topbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPodcast } from "@fortawesome/free-solid-svg-icons";

export const LandingPage = () => {
  return (
    <div id={'home'}>
      {/* <div className={LandingStyle.topbar}>
        <div className={`${LandingStyle.titleLogo}`}>
          <FontAwesomeIcon icon={faPodcast} className={MainStyle.navIcon} />
          <span className={MainStyle.title}>SpotifyTools</span>
        </div>
        <div className={LandingStyle.topNav}>
          <a className="active" href="#home">
            Home
          </a>
          <a href="#about">About</a>
          <a href="#cards">Tools</a>
        </div>
        <a></a>
      </div> */}
      <Topbar></Topbar>
      <div className={LandingStyle.backgroundImg}>
        <div className={LandingStyle.mainContent}>
          <h1>Tools for your Spotify Songs</h1>
          <p>
            Create playlists that are sorted based on the features that you
            want.
          </p>
          <a href="http://localhost:5000/authenticate">
            <Button className={LandingStyle.button} color="success">
              Login With Spotify
            </Button>
          </a>
        </div>
      </div>
      <div id={"about"}className={LandingStyle.aboutContainer}>
        <div className={LandingStyle.content}>
          <h2>What you can do with SpotifyTools?</h2>
          <div className={LandingStyle.summaryContent}>
            <div className={LandingStyle.textSummary}>
              <p>
                Be able to sort your songs based on the features you want.
                Create playlists with these features in mind such as creating
                playlist based on a genre or decade.
                <br></br>
                <br></br>
                View which songs or artists you've listened to the most. As well
                as your most saved artists.
                <br></br>
                <br></br>
                Find your lost songs that you've never put into a playlist. You
                can also find songs you've added to a playlist but never liked.
              </p>
            </div>
            <div className={LandingStyle.imageSummary}>
              <img src={MusicListener}></img>
            </div>
          </div>
        </div>

        <div id={"cards"}className={`${LandingStyle.content} ${LandingStyle.background}`}>
          <h2>Our Tools</h2>
          <div className={LandingStyle.cardsContainer}>
            <div className={LandingStyle.cardInfo + " " + LandingStyle.cardOne}>
              <span className={LandingStyle.cardTitle}>Remove Duplicates</span>
              <p className={LandingStyle.cardDescription}>
                Remove duplicate songs from the songs that you've saved.
              </p>
            </div>
            <div className={LandingStyle.cardInfo + " " + LandingStyle.cardTwo}>
              <span className={LandingStyle.cardTitle}>
                Decade/Genre Playlists
              </span>
              <p className={LandingStyle.cardDescription}>
                Create playlists based on a certain genre or decade.
              </p>
            </div>
            <div className={LandingStyle.cardInfo + " " + LandingStyle.cardOne}>
              <span className={LandingStyle.cardTitle}>Top Artists/Songs</span>
              <p className={LandingStyle.cardDescription}>
                See who your top songs or artists are.
              </p>
            </div>
            <div className={LandingStyle.cardInfo + " " + LandingStyle.cardOne}>
              <span className={LandingStyle.cardTitle}>
                Unique Playlist/Saved Songs
              </span>
              <p className={LandingStyle.cardDescription}>
                Finds songs that you haven't added to a playlist yet, or songs
                you haven't liked yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

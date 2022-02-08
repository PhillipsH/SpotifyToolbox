import React from "react";
import { Button } from "reactstrap";
import LandingStyle from "./Styles/Components/LandingPage.module.scss";
import MusicListener from "../Icons/music-listener.svg";
import Topbar from "./Topbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

export const LandingPage = () => {
  return (
    <div id={"home"}>
      <Topbar></Topbar>
      <div className={LandingStyle.backgroundImg}>
        <div className={LandingStyle.mainContent}>
          <h1>Tools for your Spotify Songs</h1>
          <p>
            Create playlists that are categorized based on the features that you
            want.
          </p>
          <a href={`http://${process.env.REACT_APP_API_IP}/api/authenticate`}>
            <Button className={LandingStyle.button} color="success">
              Login With Spotify
            </Button>
          </a>
        </div>
      </div>

      <div id={"about"} className={LandingStyle.aboutContainer}>
        <div className={LandingStyle.content}>
          <h2>What you can do with SpotifyToolbox?</h2>
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

        <div
          id={"cards"}
          className={`${LandingStyle.content} ${LandingStyle.background}`}
        >
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
        
        <div
          id={"faq"}
          className={`${LandingStyle.content} ${LandingStyle.faq}`}
        >
          <h2>FAQ</h2>
          <div className={LandingStyle.qaContainer}>
            <div className={LandingStyle.qa}>
              <p className={LandingStyle.question}>
                <FontAwesomeIcon icon={faQuestion} color={"green"} size={"2x"} /> Are you
                storing any data?
              </p>
              <p className={LandingStyle.answer}>
                No, there is no data being stored. The data being requested from
                the Spotify API is needed to perform the function on the website
                and are not being stored.
              </p>
            </div>
            <div className={LandingStyle.qa}>
              <p className={LandingStyle.question}>
                <FontAwesomeIcon icon={faQuestion} color={"green"} size={"2x"} /> Can you add a
                certain feature?
              </p>
              <p className={LandingStyle.answer}>
                We can try to add as many features as long as its possible with
                the Spotify API. You can contact us with any feature requests.
              </p>
            </div>
            <div className={LandingStyle.qa}>
              <p className={LandingStyle.question}>
                <FontAwesomeIcon icon={faQuestion} color={"green"} size={"2x"} /> Is there a way
                to donate to keep this project running?
              </p>
              <p className={LandingStyle.answer}>
                Currently there is no way to donate but we'll add a way in the
                future.
              </p>
            </div>
            <div className={LandingStyle.qa}>
              <p className={LandingStyle.question}>
                <FontAwesomeIcon icon={faQuestion} color={"green"} size={"2x"} /> How was this
                app created?
              </p>
              <p className={LandingStyle.answer}>
                This app was created in React, Node.js with the Spotify API.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

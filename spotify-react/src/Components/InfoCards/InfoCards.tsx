import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import HelperStyles from "../Styles/Components/Helper/Helper.module.scss";

// interface CardsProps{
//   SelectedSongsLength:number,
//   CurrentSongsLength:number
// }

const InfoCards = ({
  selectedSongsLength,
  currentSongsLength,
  currentBoard,
}) => {
  return (
    <div className={HelperStyles.cardsContainer}>
      <div
        className={HelperStyles.cardInfo + " " + HelperStyles.greenColor}
        // style={{ backgroundColor: "#ebfdef" }}
      >
        <FontAwesomeIcon
          className={HelperStyles.cardIcon}
          icon={faCalendarAlt}
          size={"3x"}
        />
        <h5 className={HelperStyles.cardTitle}>Current Songs</h5>
        <h2 className={HelperStyles.cardData}>{currentSongsLength}</h2>
      </div>
      <div
        className={HelperStyles.cardInfo + " " + HelperStyles.blueColor}
        // style={{ backgroundColor: "#e8eff9" }}
      >
        <FontAwesomeIcon
          className={HelperStyles.cardIcon}
          icon={faCalendarAlt}
          size={"3x"}
        />
        <h5 className={HelperStyles.cardTitle}>Current Board</h5>
        <h2 className={HelperStyles.cardData}>{currentBoard}</h2>
      </div>
      <div
        className={HelperStyles.cardInfo + " " + HelperStyles.redColor}
        // style={{ backgroundColor: "#ffefe7" }}
      >
        <FontAwesomeIcon
          className={HelperStyles.cardIcon}
          icon={faCalendarAlt}
          size={"3x"}
        />
        <h5 className={HelperStyles.cardTitle}>Selected Songs</h5>
        <h2 className={HelperStyles.cardData}>{selectedSongsLength}</h2>
      </div>
    </div>
  );
};

export default InfoCards;

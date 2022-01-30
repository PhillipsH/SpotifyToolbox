import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCheckSquare, faThList } from "@fortawesome/free-solid-svg-icons";
import HelperStyles from "../Styles/Components/Helper/Helper.module.scss";

// interface CardsProps{
//   SelectedSongsLength:number,
//   CurrentSongsLength:number
// }

const InfoCards = ({
  selectedSongsLength,
  currentSongsLength,
  currentBoard,
  currentIcon
}) => {
  return (
    <div className={HelperStyles.cardsContainer}>
      <div
        className={HelperStyles.cardInfo + " " + HelperStyles.greenColor}
      >
        <FontAwesomeIcon
          className={HelperStyles.cardIcon}
          icon={faThList}
          size={"3x"}
        />
        <h5 className={HelperStyles.cardTitle}>Current Songs</h5>
        <h2 className={HelperStyles.cardData}>{currentSongsLength}</h2>
      </div>
      <div
        className={HelperStyles.cardInfo + " " + HelperStyles.blueColor}
      >
        <FontAwesomeIcon
          className={HelperStyles.cardIcon}
          icon={currentIcon}
          size={"3x"}
        />
        <h5 className={HelperStyles.cardTitle}>Current Board</h5>
        <h2 className={HelperStyles.cardData}>{currentBoard}</h2>
      </div>
      <div
        className={HelperStyles.cardInfo + " " + HelperStyles.redColor}
      >
        <FontAwesomeIcon
          className={HelperStyles.cardIcon}
          icon={faCheckSquare}
          size={"3x"}
        />
        <h5 className={HelperStyles.cardTitle}>Selected Songs</h5>
        <h2 className={HelperStyles.cardData}>{selectedSongsLength}</h2>
      </div>
    </div>
  );
};

export default InfoCards;

import React from "react";
import ItemStyles from "../Styles/Components/Items/Items.module.scss";

interface Props extends React.HTMLAttributes<HTMLElement> {
  index?: number;
  id: string;
  name: string;
  image: any;
  genres: any;
  style: any;
  selectArtist?: Function;
  isSelected?: boolean;
}

const Artist = ({
  id,
  index,
  name,
  image,
  style,
  genres,
  selectArtist,
  isSelected,
}: Props) => {
  let selectStyle = "";
  if (isSelected) {
    selectStyle = "song-selected";
  }
  for (let i in genres) {
  }
  return (
    <div className={ItemStyles.artistItem} style={style}>
      <div>
        <div className={ItemStyles.artistRank}><span className={ItemStyles.num}>{index}.</span></div>
      </div>
      <div className="title-body">
        <div className={ItemStyles.imageDiv}>
          <img
            className={ItemStyles.artistImg}
            src={image}
            alt="Album Image"
          ></img>
        </div>
      </div>
      <div>
        <h5 className="song_title">{name}</h5>
        <h6 className="artist">{genres.toString()}</h6>
      </div>
    </div>
  );
};

export default Artist;

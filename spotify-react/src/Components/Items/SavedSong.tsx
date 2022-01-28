import React from "react";
import ItemStyles from "../Styles/Components/Items/Items.module.scss"

interface Props extends React.HTMLAttributes<HTMLElement> {
  id: string;
  title: string;
  artist: string;
  album: string;
  image: any;
  date: Date;
  style: any;
  selectSong?: any;
  index?: number;
  isSelected?: boolean;
}

const Song = ({
  index,
  id,
  title,
  artist,
  album,
  image,
  date,
  style,
  isSelected,
  selectSong,
}: Props) => {
  let selectStyle = "";
  if (isSelected) {
    selectStyle = ItemStyles.songSelected;
  }
  var readable_date = new Date(date).toDateString();
  return (
    <div
      className={ItemStyles.songItem + " " + selectStyle}
      style={style}
      onClick={() => {
        selectSong(index);
      }}
    >
      <div className={ItemStyles.titleBody}>
        <div className={ItemStyles.imageDiv}>
          <img className={ItemStyles.songImg} src={image} alt="Album Image"></img>
        </div>
        <div className={ItemStyles.songDetails}>
          <h5 className={ItemStyles.songTitle}>{title}</h5>
          <h6 className="artist">{artist}</h6>
        </div>
      </div>
      <h6 className="album">{album}</h6>
      <h6 className="date">{readable_date}</h6>
    </div>
  );
};

export default Song;

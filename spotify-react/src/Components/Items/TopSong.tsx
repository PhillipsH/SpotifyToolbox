import React from "react";
import ItemStyles from "../Styles/Components/Items/Items.module.scss";

interface Props extends React.HTMLAttributes<HTMLElement> {
  id: string;
  title: string;
  artist: string;
  album: string;
  image: any;
  style: any;
  selectSong?: any;
  key: number;
  index: number;
  popularity: number;
  isSelected?: boolean;
}

const TopSong = ({
  index,
  key,
  id,
  title,
  artist,
  album,
  image,
  popularity,
  style,
  isSelected,
  selectSong,
}: Props) => {
  let selectStyle = "";
  if (isSelected) {
    selectStyle = ItemStyles.songSelected;
  }
  return (
    <div
      className={
        ItemStyles.songItem + " " + ItemStyles.topSongItem + " " + selectStyle
      }
      style={style}
      onClick={() => {
        selectSong(index);
      }}
    >
      <div className={ItemStyles.songRanking}>
        <h3>{index + 1}.</h3>
      </div>
      <div className="title-body">
        <div className={ItemStyles.imageDiv}>
          <img className={ItemStyles.songImg} src={image} alt="Album Image"></img>
        </div>
        <div>
          <h5 className="song_title">{title}</h5>
          <h6 className="artist">{artist}</h6>
        </div>
      </div>
      <h6 className="album">{album}</h6>
      <h6 className="popularity">{popularity}</h6>
    </div>
  );
};

export default TopSong;

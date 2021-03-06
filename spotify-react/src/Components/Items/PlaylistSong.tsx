import React from "react";
import ItemStyles from "../Styles/Components/Items/Items.module.scss";

const style = {
  cardBody: {
    width: "100%",
    color: "black",
  },
};

const PlaylistSong = ({
  id,
  index,
  title,
  artist,
  album,
  image,
  playlistName,
  style,
  selectSong,
  isSelected
}) => {
  let selectStyle = "";
  if (isSelected) {
    selectStyle = ItemStyles.songSelected;
  }
  return (
    <div
      className={ItemStyles.songItem + " " + selectStyle}
      style={style}
      onClick={() => {
        selectSong(index);
      }}
    >
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
      <h6 className="playlistName">{playlistName}</h6>
    </div>
  );
};

export default PlaylistSong;

import React, { useState, useEffect } from "react";
// import DuplicateSongs from "../DuplicateSongs/DuplicateSongs";
import { connect } from "react-redux";
import { removeSongs } from "../../flux/actions/spotifyActions";
import InfoCards from "../InfoCards/InfoCards";
import DuplicateToolbox from "../Toolbox/DuplicateToolbox";
import BoardStyle from "../Styles/Components/Boards/Board.module.scss";
import DuplicateBoardStyle from "../Styles/Components/Boards/DuplicateBoard.module.scss";
import ItemStyles from '../Styles/Components/Items/Items.module.scss'
import DuplicateSongSingle from "../Items/DuplicateSongSingle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCopy,
  faMicrophone,
  faRecordVinyl,
  faTrophy,
  faListAlt,
  faNotEqual,
  faAddressCard,
  faSignOutAlt,
  faAddressBook,
  faDonate,
  faMusic,
  faBars,
  faPodcast,
} from "@fortawesome/free-solid-svg-icons";

const DuplicateSongsBoard = (props) => {
  const [masterSongs, setMasterSongs]: any = useState([]);
  const [currentSongs, setCurrentSongs]: any = useState([]);
  const [selectedSongs, setSelectedSongs]: any = useState([]);

  useEffect(() => {
    const likedSongsObj: any = {};
    const duplicateDict: any = {};

    for (let index in props.likedSongs.list) {
      if (
        likedSongsObj[
          "" +
            props.likedSongs.list[index].track_name +
            props.likedSongs.list[index].artist.artist_name
        ] === undefined
      ) {
        likedSongsObj[
          "" +
            props.likedSongs.list[index].track_name +
            props.likedSongs.list[index].artist.artist_name
        ] = props.likedSongs.list[index];
      } else {
        if (
          duplicateDict[
            "" +
              props.likedSongs.list[index].track_name +
              props.likedSongs.list[index].artist.artist_name
          ] === undefined
        ) {
          const duplicateObj = {
            track_name: props.likedSongs.list[index].track_name,
            artist: {
              artist_name: props.likedSongs.list[index].artist.artist_name,
            },

            // image: (props.likedSongs.list[index].album.album_images[2].url ?? null),
            image: ((props.likedSongs.list[index].album.album_images[2] != undefined) ? props.likedSongs.list[index].album.album_images[2].url : undefined),
            list: [
              likedSongsObj[
                "" +
                  props.likedSongs.list[index].track_name +
                  props.likedSongs.list[index].artist.artist_name
              ],
            ],
          };
          duplicateDict[
            "" +
              props.likedSongs.list[index].track_name +
              props.likedSongs.list[index].artist.artist_name
          ] = duplicateObj;
        }
        duplicateDict[
          "" +
            props.likedSongs.list[index].track_name +
            props.likedSongs.list[index].artist.artist_name
        ].list.push(props.likedSongs.list[index]);
      }
    }
    setMasterSongs(Object.values(duplicateDict));
    setCurrentSongs(Object.values(duplicateDict));
  }, [props.likedSongs]);

  return (
    <div className={BoardStyle.functionBoard}>
      <InfoCards
        selectedSongsLength={currentSongs.length}
        currentSongsLength={currentSongs.length}
        currentBoard={"Duplicate"}
        currentIcon={faCopy}
      />
      <DuplicateToolbox
        masterSongs={masterSongs}
        currentSongs={currentSongs}
        setCurrentSongs={setCurrentSongs}
        selectedSongs={selectedSongs}
        setSelectedSongs={setSelectedSongs}
      />
      <div
        className={`${BoardStyle.songContainer} ${DuplicateBoardStyle.duplicateSongContainer}`}
      >
        {currentSongs.map((val, key) => (
          // <DuplicateSongs key={key} currentSongIndex={key} dupeSongs={val} />
          <div className={ItemStyles.duplicateSongsContainer}>
            <div className={""}>
              <div className={ItemStyles.duplicateArtistTitle}>
                <div className={ItemStyles.imageDiv}>
                  <img
                    className={ItemStyles.songImg}
                    src={val.image}
                    alt="Album Image"
                  ></img>
                </div>
                <div>
                  <h5 className="song_title">{val.track_name}</h5>
                  <h6 className="artist">{val.artist.artist_name}</h6>
                </div>
              </div>
            </div>

            {val.list.map((val, index) => {
              var date = new Date(val.added_at).toDateString();
              // console.log(val.track_id + val.linked_from_id)
              return (
                <DuplicateSongSingle
                  trackName={val.track_name}
                  albumName={val.album.album_name}
                  date={date}
                  currentSongIndex={key}
                  key={index}
                  currentPlacement={index}
                  currentSong={val}
                ></DuplicateSongSingle>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  likedSongs: state.spotify.likedSongs,
});

export default connect(mapStateToProps, { removeSongs })(DuplicateSongsBoard);

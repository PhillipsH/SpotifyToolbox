import React from "react";

import {Button} from "reactstrap";

const style = {
  cardBody: {
    width: "100%",
    color: "black",
  },
};

const DuplicateSongs = ({ songs }) => {
  console.log(songs);
  return (
    <div className="card" style={style.cardBody}>
      <div className="card-body">
        <h5 className="song_title">{songs[0].track.name}</h5>
        <h6 className="artist">Artist: {songs[0].track.artists[0].name}</h6>
      </div>
      {/* <hr></hr> */}
      {songs.map((val, key) => {
        var readable_date = new Date(val.added_at).toDateString();
        return (
          <div className="card-body duplicate-song-container">
            <div className="duplicate-song-left">
              <h5 className="song_title">{val.track.name}</h5>
              <h6 className="artist">Album: {val.track.album.name}</h6>
              <h6 className="artist">Date: {readable_date}</h6>
            </div>
            <div className="duplicate-song-right">
              <Button color="danger">Remove</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DuplicateSongs;

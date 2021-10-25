import React from 'react';

const Song = ({
  id,
  title,
  artist,
  album,
  image,
  date,
}) => {
  var readable_date = new Date(date).toDateString();
  return ( 
    <div className="card card-container">
      <div className="card-body">
        <div className="title-body">
          <div className="image-div">
            <img src={image} alt="Album Image"></img>
          </div>
          <div>
            <h5 className="song_title">{title}</h5>
            <h6 className="artist">{artist}</h6>
          </div>
        </div>
        <h6 className="album">{album}</h6>
        <h6 className="date">{readable_date}</h6>
      </div>
    </div>
   );
}
 
export default Song;
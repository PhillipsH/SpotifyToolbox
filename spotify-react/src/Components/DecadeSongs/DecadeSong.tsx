import React from 'react';

const style={
  cardBody: {
    width: '100%',
    color: 'black'
  }
}

const DecadeSong = ({
  id,
  title,
  artist,
  album,
  date,
}) => {
  var readable_date = new Date(date).toDateString();
  return ( 
    <div className="card" style={style.cardBody}>
      <div className="card-body">
        <h5 className="song_title">{title}</h5>
        <h6 className="artist">Artist: {artist}</h6>
        <h6 className="album">Album: {album}</h6>
        <h6 className="realease_date">Release Date: {readable_date}</h6>
      </div>
    </div>
   );
}
 
export default DecadeSong;
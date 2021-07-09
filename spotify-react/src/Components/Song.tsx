import React from 'react';

const style={
  cardBody: {
    width: '95%',
    color: 'black'
  }
}

const Song = ({
  id,
  title,
  artist,
  album,
  date,
}) => {
  return ( 
    <div className="card" style={style.cardBody}>
      <div className="card-body">
        <h5 className="song_title">{title}</h5>
        <h6 className="artist">By: {artist}</h6>
        <p className="album">{album}</p>
        <small className="card-text">{date}</small><br></br>
      </div>
    </div>
   );
}
 
export default Song;
import React from 'react';

const style={
  cardBody: {
    width: '100%',
    color: 'black',
    padding: '2px',
  }
}

const Artist = ({
  artist,
  counter,
}) => {
  return ( 
    <div className="card" style={style.cardBody}>
      <div className="card-body" style={style.cardBody}>
        <h6 className="artist">Artist: {artist}</h6>
        <h6 className="song-counter">Number of Songs: {counter}</h6>
      </div>
    </div>
   );
}
 
export default Artist;
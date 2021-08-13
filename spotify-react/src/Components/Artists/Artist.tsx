import React from 'react';

const style={
  cardBody: {
    width: '100%',
    color: 'black'
  }
}

const Artist = ({
  artist,
  album,
}) => {
  return ( 
    <div className="card" style={style.cardBody}>
      <div className="card-body">
        <h6 className="artist">Artist: {artist}</h6>
        <h6 className="album">Album: {album}</h6>
      </div>
    </div>
   );
}
 
export default Artist;
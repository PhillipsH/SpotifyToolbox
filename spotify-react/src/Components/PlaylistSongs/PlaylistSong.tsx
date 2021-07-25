import React from 'react';

const style={
  cardBody: {
    width: '100%',
    color: 'black'
  }
}

const PlaylistSong = ({
  id,
  title,
  artist,
  album,
  date,
  playlistName
}) => {
  return ( 
    <div className="card" style={style.cardBody}>
      <div className="card-body">
        <h5 className="song_title">{title}</h5>
        <h6 className="artist">Artist: {artist}</h6>
        <h6 className="album">Album: {album}</h6>
        <h6 className="Playlist Name">Playlist: {playlistName}</h6>
      </div>
    </div>
   );
}
 
export default PlaylistSong;
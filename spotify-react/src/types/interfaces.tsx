export interface IAuthProps {
  auth: { isAuthenticated: boolean };
}

export interface IAlbum {
  album_id: string,
  album_name: string,
  artist: IArtist,
}

export interface IArtist {
  artist_id: string,
  artist_name: string,
  genre?: string[]
}

export interface IAlbum {
  album_id: string,
  album_name: string,
  artist: IArtist,
  genre?: string[]
}

export interface ITrack {
  track_id: string,
  track_uri: string,
  track_name: string,
  album: IAlbum,
  artist: IArtist,
  release_date: string,
  added_at: string,
  popularity: string,
  genre?: string[],
  listeners?: string,
  play_count?: string,
  linked_from_id?: string,

}

enum Genre{
  HIPHOP,
  POP,
  COUNTRY,
}

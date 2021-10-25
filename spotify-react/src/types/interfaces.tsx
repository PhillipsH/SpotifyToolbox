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
  followers?: number,
  images?: string,
  popularity?: number,
  genres?: string[]
}

export interface IAlbum {
  album_id: string,
  album_name: string,
  artist: IArtist,
  album_images: any[]
  genres?: string[]
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
  genres?: string[], 
  listeners?: string,
  play_count?: string,
  linked_from_id?: string,
}

export interface IPlaylistTrack extends ITrack{
  playlist_name: string,
  playlist_id: string,
}

export interface IPlaylistTrack {
  track_id: string,
  track_uri: string,
  track_name: string,
  album: IAlbum,
  artist: IArtist,
  release_date: string,
  added_at: string,
  popularity: string,
  genres?: string[],
  listeners?: string,
  play_count?: string,
  linked_from_id?: string,
}
export interface IArtistHash {
  [artist_id:string]:IArtist
}
export interface ITrackArtistHash {
  [trackArtistName:string]:ITrack
}
export interface ITrackArtistHashArr {
  [trackArtistName:string]:ITrack[]
}

enum Genre{
  HIPHOP,
  POP,
  COUNTRY,
}

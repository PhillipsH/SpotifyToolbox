export const AUTHORIZE = 'AUTHORIZE';
export const CHECK_AUTHORIZE = 'CHECK_AUTHORIZE';
export const REMOVE_SONGS = 'REMOVE_SONGS'
export const SET_CURRENT_LIST = 'SET_CURRENT_LIST'
export const GET_LIKED_SONGS = 'GET_LIKED_SONGS'
export const GET_LIKED_ISONGS = 'GET_LIKED_ISONGS'
export const GET_PLAYLIST_SONGS = 'GET_PLAYLIST_SONGS'
export const ITEMS_LOADING = 'ITEMS_LOADING';
export const SET_LIKED_SONGS = 'SET_LIKED_SONGS';
export const SET_PLAYLIST_SONGS = 'SET_PLAYLIST_SONGS';
export const GET_PROFILE = 'GET_PROFILE';
export const SET_ARTISTS = 'SET_ARTISTS';
export const ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST'
export const ADD_LOADING = 'ADD_LOADING';
export const REMOVE_LOADING = 'REMOVE_LOADING';
export const COMPLETE_SETUP = 'COMPLETE_SETUP';
export const START_SETUP = 'START_SETUP';
export const ADD_SONGS = 'ADD_SONGS';
export const GET_TOP = 'GET_TOP'
export const ADD_TO_SAVED = "ADD_TO_SAVED";

export const SET_BOARD = "SET_BOARD;"

export enum LoadingTypes {
    LikedSongs = "LIKED_SONGS",
    Profile = "PROFILE",
    PlaylistSongs = "PLAYLIST_SONGS",
    Artists = "ARTISTS"
}

export enum BoardTypes{
    Saved = "SAVED_BOARD",
    Artist = "ARTIST_BOARD",
    Genre = "GENRE_BOARD", 
    Decade = "DECADE_BOARD",
    PlaylistUnique = "PLAYLIST_UNIQUE_BOARD",
    SavedUnique = "SAVED_UNIQUE_BOARD",
    Duplicates = "DUPLICATE_BOARD",
    Uninitilized = "UNINITIALIZED_BOARD"

}
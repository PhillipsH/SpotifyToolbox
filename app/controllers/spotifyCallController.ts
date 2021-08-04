import { Request, Response } from 'express';

import axios from 'axios';
const querystring = require('querystring');

const redirect_uri:string = 'http://localhost:3000/callback'
const client_id:string = '300ac0b33203415b98bd63ec4146c74c'
const client_secret:string = 'a78fd6a2e88a4d0282c4c8724771646f'
const likedSongUri:string = 'https://api.spotify.com/v1/me/tracks'

//Function adds user to database then redirects user to the main page.
export async function getLikedSongs (req:Request, res:Response) {
    /*Possible to make function faster by getting the total amount of songs in the first url
    and using the total songs to calculate amount of requests needed to be done and asyncronously 
    creating all requests.
    */
    const START_LIKED_SONGS = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=50&market=US'
    console.log("GETTING LIKED SONGS")
    console.log(req.session["access_token"])
    async function recursiveSpotify (url:string){
        try{
            let response = await axios.get(url, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + req.session["access_token"],
                    "Content-Type": "application/json"
                }
            })
            if(response.data.next == null){
                return response.data.items
            }
            console.log(response.data.next)
            return(response.data.items.concat(await recursiveSpotify(response.data.next)))
        }catch(error){
            switch(error.response.status){
                case 429:
                    console.log("timeout error")
                    setTimeout(function () {
                    }, 5000);
                    return(recursiveSpotify(url))
                break;
            }
            return[]
        }
    }
    let totalLikedSongs = await recursiveSpotify(START_LIKED_SONGS)
    console.log("completed")
    console.log(totalLikedSongs.length)
    res.send(totalLikedSongs)
}


export async function getPlaylistSongs (req:Request, res:Response) {
    console.log("GETTING PLAYLIST SONGS")
    const allPlaylistUrl:string = 'https://api.spotify.com/v1/me/playlists?limit=50'
    console.log(req.session["access_token"])

    async function recursiveSpotify (url:string){
        try{
            let response = await axios.get(url, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + req.session["access_token"],
                    "Content-Type": "application/json"
                }
            })
            if(response.data.next == null){
                return response.data.items
            }
            console.log(response.data.next)
            return(response.data.items.concat(await recursiveSpotify(response.data.next)))
        }catch(error){
            console.log(error)
            switch(error.response.status){
                case 429:
                    console.log("timeout error")
                    setTimeout(function () {
                    }, 5000);
                    return(recursiveSpotify(url))
            }
            return[]
        }
    }
    async function recursivePlaylist (url:string, playlistName:string, playlistId:string){
        try{
            let response = await axios.get(url, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + req.session["access_token"],
                    "Content-Type": "application/json"
                }
            })
            for(let item in response.data.items){
                response.data.items[item]["playlist_name"] = playlistName
                response.data.items[item]["playlist_id"] = playlistId
            }
            if(response.data.next == null){
                return response.data.items
            }
            console.log(response.data.next)
            return(response.data.items.concat(await recursivePlaylist(response.data.next, playlistName, playlistId)))
        }catch(error){
            console.log(error)
            switch(error.response.status){
                case 429:
                    console.log("timeout error")
                    setTimeout(function () {
                    }, 5000);
                    return(recursivePlaylist(url, playlistName, playlistId))
                default:
                    console.log("OTHER ERROR PLEASE CHECK")
                    return []

            }
        }
    }
    //Getting all the playlists
    let playlists = await recursiveSpotify(allPlaylistUrl)

    //Removing all playlits not created by current user
    for(let i = 0; i < playlists.length; i++){
        if(playlists[i].owner.id != '12185463800'){
            playlists.splice(i,1)
            i -= 1;
        }
    }
    // Combining all promises in one array
    let combinedPlaylistPromise: any = []
    for(let playlistIndex in playlists){
        combinedPlaylistPromise.push(recursivePlaylist(playlists[playlistIndex].tracks.href, playlists[playlistIndex].name, playlists[playlistIndex].id))
    }
    //awaiting for all promises to be completed
    let combinedPlaylists:any = await Promise.all(combinedPlaylistPromise)
    /*Taking only unique songs from playlists as when combining playlists there will be some songs that are the exact same
    this is done using a json object so that we remove all duplicates efficiently.
    */
    let uniqueTracks:any = {};
    for(let playlistIndex in combinedPlaylists){
        for(let songIndex in combinedPlaylists[playlistIndex]){
            try{
                uniqueTracks[combinedPlaylists[playlistIndex][songIndex].track.id] = combinedPlaylists[playlistIndex][songIndex]
            }catch(error){
                console.log("not there")
                console.log(combinedPlaylists[playlistIndex][songIndex])
            }
    
        }
    }
    //converting the object into an array
    let uniqueTracksArr = []
    uniqueTracksArr = Object.values(uniqueTracks);
    res.send(uniqueTracksArr)
}

export async function removeLikedSongs(req:Request, res:Response) {
    let url = "https://api.spotify.com/v1/me/tracks"
    // let url = "https://api.spotify.com/v1/me/tracks?offset=0&limit=50&market=US"
    // let songs = req.body.songs
    console.log(req.session["access_token"])

    async function deleteSpotify (url:string, songs){
        try{
            let response = await axios.delete(url, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + req.session["access_token"],
                    "Content-Type": "application/json",
                },
                data: {
                  ids: songs
                }
            })
            console.log(response)
            return(response.data.items)
        }catch(error){
            console.log(error)
            switch(error.response.status){
                case 429:
                    console.log("timeout error")
                    setTimeout(function () {
                    }, 5000);
                    return(deleteSpotify(url, songs))
            }
            return[]
        }
    }

    while (req.body.songIds.length > 0){
        deleteSpotify(url, req.body.songIds.splice(0, 50))
    }

}

export async function addToPlaylist(req:Request, res:Response) {
    let createPlaylistURL = "https://api.spotify.com/v1/users/12185463800/playlists"
    let addSongPlaylistURL = "https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
    let songs = req.body.songs

    console.log("token  = "  + req.session["access_token"])

    // async function createPlaylist (url:string){
    //     try{
    //         let response = await axios.post(url, {
    //             headers: {
    //                 Accept: "application/json",
    //                 Authorization: "Bearer " + req.session["access_token"],
    //                 "Content-Type": "application/json"
    //             },
    //             data:{
    //                 "name": "New Playlist",
    //                 "description": "New playlist description",
    //                 "public": false
    //             }
    //         })
    //         return(response.data.id)
    //     }catch(error){
    //         console.log(error)
    //         switch(error.response.status){
    //             case 429:
    //                 console.log("timeout error")
    //                 setTimeout(function () {
    //                 }, 5000);
    //                 return(createPlaylist(url))
    //         }
    //         return[]
    //     }
    // }
    async function createPlaylist (url:string){
        try{
            let response = await axios.post(url, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + "BQAKA_gXg4Lt2LbjyZLg_m9rv4gOFa86535Xj2rdnm6PzWS3-Fq6QU31pIdAulUV7YPGHVm49822TxhJzapdUvtghGUeKQk_HRX4-sZIYnRVcCpSkniEnEt9Ni64HsmC1KHLEQHwkOM7gqXpgXweNYMLJIhsfVyg4bR1i82OyPksfiXLXSmSP6YFxlRCLEzkFFYbZTZfkQMg9bjOwqFDLZN3qkaF_GKBfzkpm-JSA7bkAkI3D9bOr2Y8CYJOXc4w",
                    "Content-Type": "application/json",
                },
                data:{
                    "name": "New Playlist",
                }
            })
            console.log(response)
            return(response.data.items)
        }catch(error){
            console.log(error)
            switch(error.response.status){
                case 429:
                    console.log("timeout error")
                    setTimeout(function () {
                    }, 5000);
                    return(createPlaylist(url))
            }
            return[]
        }
    }

    async function addToPlaylist (url:string, playlistId:string, songs){
        try{
            let response = await axios.post(url, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + req.session["access_token"],
                    "Content-Type": "application/json"
                },
                data: {
                  uris: songs
                }
            })
            return(response.data.items)
        }catch(error){
            console.log(error)
            switch(error.response.status){
                case 429:
                    console.log("timeout error")
                    setTimeout(function () {
                    }, 5000);
                    return(addToPlaylist(url,playlistId, songs))
            }
            return[]
        }
    }

    let playlistId = await createPlaylist(createPlaylistURL)
    console.log(playlistId)

    // while (songs > 0){
    //     addToPlaylist(addSongPlaylistURL, playlistId, songs.splice(0, 100))
    // }

}
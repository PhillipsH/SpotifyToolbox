import { Request, Response } from 'express';

import axios from 'axios';
const querystring = require('querystring');

const redirect_uri:string = 'http://localhost:3000/callback'
const client_id:string = '300ac0b33203415b98bd63ec4146c74c'
const client_secret:string = 'a78fd6a2e88a4d0282c4c8724771646f'
const likedSongUri:string = 'https://api.spotify.com/v1/me/tracks'
const START_LIKED_SONGS = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=50&market=US'

//Function adds user to database then redirects user to the main page.
export async function getLikedSongs (req:Request, res:Response) {
    /*Possible to make function faster by getting the total amount of songs in the first url
    and using the total songs to calculate amount of requests needed to be done and asyncronously 
    creating all requests.
    */
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



    // async function recursiveAxios (url){
    //     let response = await axios.get(url, {
    //         headers: {
    //             Accept: "application/json",
    //             Authorization: "Bearer " + req.session["access_token"],
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     console.log(response.data.offset)
    //     if(response.data.next == null){
    //         return response.data.items
    //     }
    //     // console.log(response.data.next)
    //     return(response.data.items.concat(await recursiveAxios(response.data.next)))
    // }
    // let playlistSongs = []
    // for(let playlistIndex in response.data){
    //     let url = "https://api.spotify.com/v1/playlists/" + {playlist_id} + "/tracks"
    //     playlistSongs.push(recursiveAxios(playlistIndex))
    // }
    // promises.all(playlistSongs).then(playlist =>{
    //     let total_songs = []
    //     for(let songs in playlist){
    //         total_songs.concat(playlist[songs])
    //     }
    // })
}
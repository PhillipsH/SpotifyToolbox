import { Request, Response } from 'express';

import axios from 'axios';
require('dotenv').config();

const redirect_uri:string = 'http://localhost:3000/callback'
const client_id:string|undefined = process.env.CLIENT_ID
const client_secret:string|undefined  = process.env.CLIENT_SECRET

const refreshTokenUri:string = 'https://accounts.spotify.com/api/token'

//Function adds user to database then redirects user to the main page.
export async function getLikedSongs (req:Request, res:Response) {
    /*Possible to make function faster by getting the total amount of songs in the first url
    and using the total songs to calculate amount of requests needed to be done and asyncronously 
    creating all requests.
    */
    const START_LIKED_SONGS = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=50&market=US'
    console.log("GETTING LIKED SONGS")
    console.log(req.session["access_token"])
    console.log(req.session["profile_id"])
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
            if(error.response.status == undefined){
                console.log(error)
            }
            switch(error.response.status){
                case 429:
                    console.log("timeout error")
                    setTimeout(function () {
                    }, error.response.headers["retry-after"] * 1000);
                    return(recursiveSpotify(url))
                case 401:
                    let authData = {
                        grant_type: "refresh_token",
                        refresh_token: req.session["refresh_token"],
                    }
                    let response = await axios.post(refreshTokenUri, authData,{
                        headers: {
                            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
                            },
                    })
                    console.log(response)
                    req.session["access_token"] = response.data.access_token;
                    return(recursiveSpotify(url))
                default:
                    console.log("OTHER ERROR PLEASE CHECK")
                    return []
            }
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
            if(error.response.status == undefined){
                console.log(error)
            }
            switch(error.response.status){
                case 429:
                    console.log("timeout error")
                    setTimeout(function () {
                    }, 5000);
                    return(recursiveSpotify(url))
                case 401:
                    let authData = {
                        grant_type: "refresh_token",
                        refresh_token: req.session["refresh_token"],
                    }
                    let response = await axios.post(refreshTokenUri, authData,{
                        headers: {
                            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
                          },
                    })
                    console.log(response)
                    req.session["access_token"] = response.data.access_token;
                    return(recursiveSpotify(url))
                default:
                    console.log("OTHER ERROR PLEASE CHECK")
                    return []
            }
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
            if(error.response.status == undefined){
                console.log(error)
            }
            switch(error.response.status){
                case 429:
                    setTimeout(function () {
                    }, error.response.headers["retry-after"] * 1000);
                    return(recursivePlaylist(url, playlistName, playlistId))
                case 401:
                    let authData = {
                        grant_type: "refresh_token",
                        refresh_token: req.session["refresh_token"],
                    }
                    let response = await axios.post(refreshTokenUri, authData,{
                        headers: {
                            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
                            },
                    })
                    console.log(response)
                    req.session["access_token"] = response.data.access_token;
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
        if(playlists[i].owner.id != req.session["profile_id"]){
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
            if(error.response.status == undefined){
                console.log(error)
            }
            switch(error.response.status){
                case 429:
                    console.log("timeout error")
                    setTimeout(function () {
                    }, error.response.headers["retry-after"] * 1000);
                    return(deleteSpotify(url, songs))
                case 401:
                    let authData = {
                        grant_type: "refresh_token",
                        refresh_token: req.session["refresh_token"],
                    }
                    let response = await axios.post(refreshTokenUri, authData,{
                        headers: {
                            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
                            },
                    })
                    console.log(response)
                    req.session["access_token"] = response.data.access_token;
                    return(deleteSpotify(url, songs))
                default:
                    console.log("OTHER ERROR PLEASE CHECK")
                    return []
            }
        }
    }

    while (req.body.songIds.length > 0){
        deleteSpotify(url, req.body.songIds.splice(0, 50))
    }

}

export async function getProfile(req:Request, res:Response){
    const profileURI = 'https://api.spotify.com/v1/me'
    axios.get(profileURI, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + req.session["access_token"],
            "Content-Type": "application/json"
        }
    }).then(response => {
        res.send(response.data)
    })
}

export async function addToPlaylist(req:Request, res:Response) {
    let createPlaylistURL = "https://api.spotify.com/v1/users/" + req.session["profile_id"]+ "/playlists"
    let songUris = req.body.songUris
    console.log(req.body)
    console.log("token  = "  + req.session["access_token"])
    let playlistData = {
        "name": "Liked Songs Not in Playlist",
        "description": "Liked Songs that are not in a playlist",
        "public": false
    }
    async function createPlaylist (url:string){
        try{
            let response = await axios.post(url, playlistData,{
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + req.session["access_token"],
                    "Content-Type": "application/json"
                }
            })
            return(response.data.id)
        }catch(error){
            if(error.response.status == undefined){
                console.log(error)
            }
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

    async function addToPlaylistAxios (url:string, playlistId:string, songs){
        let songObj = {uris: songs}
        try{
            let response = await axios.post(url, songObj, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + req.session["access_token"],
                    "Content-Type": "application/json"
                }
            })
            return(response.data.items)
        }catch(error){
            if(error.response.status == undefined){
                console.log(error)
            }
            switch(error.response.status){
                case 429:
                    console.log("timeout error")
                    setTimeout(function () {
                    }, 5000);
                    return(addToPlaylistAxios(url,playlistId, songs))
            }
            return[]
        }
    }

    console.log(songUris)
    let playlistId = await createPlaylist(createPlaylistURL)
    console.log(playlistId)
    let addSongPlaylistURL = "https://api.spotify.com/v1/playlists/" + playlistId + "/tracks"
    while (songUris.length > 0){
        console.log("running")
        addToPlaylistAxios(addSongPlaylistURL, playlistId, songUris.splice(0, 100))
    }

}
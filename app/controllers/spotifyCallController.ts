import { Request, Response } from "express";
import axios from "axios";
import { refreshToken } from "./authenticateController";
require("dotenv").config();

const redirect_uri: string = "http://localhost:3000/callback";
const client_id: string | undefined = process.env.CLIENT_ID;
const client_secret: string | undefined = process.env.CLIENT_SECRET;

const refreshTokenUri: string = "https://accounts.spotify.com/api/token";

//Function adds user to database then redirects user to the main page.
export async function getLikedSongs(req: Request, res: Response) {
  /*Possible to make function faster by getting the total amount of songs in the first url
    and using the total songs to calculate amount of requests needed to be done and asyncronously 
    creating all requests.
    */
  const LIKED_SONGS_URI = "https://api.spotify.com/v1/me/tracks";
  
  async function spotifyApiCall(url: string, offset) {
    try {
      let response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + req.session["access_token"],
          "Content-Type": "application/json",
        },
        params: {
          limit: 50,
          market: "US",
          offset: offset,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response.status != undefined) {
        switch (error.response.status) {
          case 429:
            console.log("timeout error");
            setTimeout(function () {},
            error.response.headers["retry-after"] * 1000);
            return spotifyApiCall(url, offset);
          case 503:
            console.log("503 error");
            setTimeout(function () {}, 5000);
            return spotifyApiCall(url, offset);
          case 401:
            await refreshToken(req, res);
            return spotifyApiCall(url, offset);

          default:
            return [];
        }
      } else {
        console.log("error");
      }
    }
  }

  let initialCall = await spotifyApiCall(LIKED_SONGS_URI, 0);

  let promiseArr: any = [];

  for (let i = 50; i < initialCall.total; i += 50) {
    promiseArr.push(spotifyApiCall(LIKED_SONGS_URI, i));
  }

  let songApiArr: any = await Promise.all(promiseArr);
  let totalLikedSongs = [];
  totalLikedSongs = totalLikedSongs.concat(initialCall.items);

  for (let i in songApiArr) {
    totalLikedSongs = totalLikedSongs.concat(songApiArr[i].items);
  }
  res.send(totalLikedSongs);
}

export async function getPlaylistSongs(req: Request, res: Response) {
  const allPlaylistUrl: string =
    "https://api.spotify.com/v1/me/playlists?limit=50";

  async function recursiveSpotify(url: string) {
    try {
      let response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + req.session["access_token"],
          "Content-Type": "application/json",
        },
      });
      if (response.data.next == null) {
        return response.data.items;
      }
      return response.data.items.concat(
        await recursiveSpotify(response.data.next)
      );
    } catch (error: any) {
      if (error.response.status == undefined) {
        // console.log(error)
      }
      switch (error.response.status) {
        case 429:
          console.log("timeout error");
          setTimeout(function () {}, 5000);
          return recursiveSpotify(url);
        case 503:
          console.log("error 503");
          setTimeout(function () {}, 5000);
          return recursiveSpotify(url);
        case 401:
          await refreshToken(req, res);
          return recursiveSpotify(url);
        default:
          console.log("other error check PLAYLIST");
          console.log(error.response.status);
          return [];
      }
    }
  }
  async function recursivePlaylist(
    url: string,
    playlistName: string,
    playlistId: string
  ) {
    try {
      let response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + req.session["access_token"],
          "Content-Type": "application/json",
        },
      });
      for (let item in response.data.items) {
        response.data.items[item]["playlist_name"] = playlistName;
        response.data.items[item]["playlist_id"] = playlistId;
      }
      if (response.data.next == null) {
        return response.data.items;
      }
      return response.data.items.concat(
        await recursivePlaylist(response.data.next, playlistName, playlistId)
      );
    } catch (error: any) {
      if (error.response.status == undefined) {
        console.log("other error recursive playlist");
      }
      switch (error.response.status) {
        case 429:
          setTimeout(function () {},
          error.response.headers["retry-after"] * 1000);
          return recursivePlaylist(url, playlistName, playlistId);
        case 503:
          setTimeout(function () {}, 5000);
          return recursivePlaylist(url, playlistName, playlistId);
        case 401:
          await refreshToken(req, res);
          return recursivePlaylist(url, playlistName, playlistId);
        default:
          console.log("OTHER ERROR PLEASE CHECK PLAYLIST 2");
          console.log(error.response.status);
          return [];
      }
    }
  }
  //Getting all the playlists
  let playlists = await recursiveSpotify(allPlaylistUrl);

  //Removing all playlits not created by current user
  for (let i = 0; i < playlists.length; i++) {
    if (playlists[i].owner.id != req.session["profile_id"]) {
      playlists.splice(i, 1);
      i -= 1;
    }
  }
  // Combining all promises in one array
  let combinedPlaylistPromise: any = [];
  for (let playlistIndex in playlists) {
    combinedPlaylistPromise.push(
      recursivePlaylist(
        playlists[playlistIndex].tracks.href,
        playlists[playlistIndex].name,
        playlists[playlistIndex].id
      )
    );
  }
  //awaiting for all promises to be completed
  let combinedPlaylists: any = await Promise.all(combinedPlaylistPromise);
  /*Taking only unique songs from playlists as when combining playlists there will be some songs that are the exact same
    this is done using a json object so that we remove all duplicates efficiently.
    */
  let uniqueTracks: any = {};
  for (let playlistIndex in combinedPlaylists) {
    for (let songIndex in combinedPlaylists[playlistIndex]) {
      try {
        uniqueTracks[combinedPlaylists[playlistIndex][songIndex].track.id] =
          combinedPlaylists[playlistIndex][songIndex];
      } catch (error) {
        console.log("not there");
        // console.log(combinedPlaylists[playlistIndex][songIndex]);
      }
    }
  }
  //converting the object into an array
  let uniqueTracksArr = [];
  uniqueTracksArr = Object.values(uniqueTracks);
  res.send(uniqueTracksArr);
}

export async function getGenre(req: Request, res: Response) {
  const GENRE_API = `https://api.spotify.com/v1/artists`;
  let artists;
  if (req.query.artists == undefined) throw "undefined";
  if (!Array.isArray(req.query.artists)) throw "sent data is not an array";

  artists = req.query.artists;
  if (artists > 50) throw "songList is too large";
  // const API_KEY = '57ee3318536b23ee81d6b27e36997cde'

  async function addGenre(idsString) {
    try {
      let response = await axios.get(GENRE_API, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + req.session["access_token"],
          "Content-Type": "application/json",
        },
        params: {
          ids: idsString,
        },
      });
      if (response.data.error != undefined) throw response;
      return response.data;
    } catch (error: any) {
      if (error.response.status == undefined) {
        // console.log(error);
        console.log("other error");
      }
      switch (error.response.status) {
        case 429:
          setTimeout(function () {},
          error.response.headers["retry-after"] * 1000);
          return addGenre(idsString);

        case 503:
          setTimeout(function () {},
          error.response.headers["retry-after"] * 1000);
          return addGenre(idsString);

        case 401:
          await refreshToken(req, res);
          return addGenre(idsString);
        default:
          console.log("OTHER ERROR PLEASE CHECK GETGENRE");
          // console.log(error.response.status);
          return [];
      }
    }
  }

  res.send(await addGenre(artists.toString()));
}

export async function getProfile(req: Request, res: Response) {
  const profileURI = "https://api.spotify.com/v1/me";
  async function getSpotifyProfile() {
    try {
      let response = await axios.get(profileURI, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + req.session["access_token"],
          "Content-Type": "application/json",
        },
      });
      return response.data
    } catch (error: any) {
      if (error.response.status == undefined) {
        console.log(error);
      }
      switch (error.response.status) {
        case 429:
          console.log("timeout error");
          setTimeout(function () {},
          error.response.headers["retry-after"] * 1000);
          return getSpotifyProfile();
        case 401:
          await refreshToken(req, res);
          return getSpotifyProfile();
        default:
          console.log("OTHER ERROR PLEASE CHECK");
          // console.log(error.response.status);
          return [];
      }
    }
  }
  let profile = await getSpotifyProfile();
  console.log(profile);
  res.send(profile);
}

export async function removeLikedSongs(req: Request, res: Response) {
  let url = "https://api.spotify.com/v1/me/tracks";
  console.log(req.session["access_token"]);

  async function deleteSpotify(url: string, songs) {
    try {
      let response = await axios.delete(url, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + req.session["access_token"],
          "Content-Type": "application/json",
        },
        data: {
          ids: songs,
        },
      });
      console.log(response);
      return response.data.items;
    } catch (error: any) {
      if (error.response.status == undefined) {
        console.log(error);
      }
      switch (error.response.status) {
        case 429:
          console.log("timeout error");
          setTimeout(function () {},
          error.response.headers["retry-after"] * 1000);
          return deleteSpotify(url, songs);
        case 401:
          await refreshToken(req, res);
          return deleteSpotify(url, songs);
        default:
          console.log("OTHER ERROR PLEASE CHECK");
          // console.log(error.response.status);
          return [];
      }
    }
  }

  while (req.body.songIds.length > 0) {
    deleteSpotify(url, req.body.songIds.splice(0, 50));
  }
}

export async function addLikedSongs(req: Request, res: Response) {
  const url = "https://api.spotify.com/v1/me/tracks";

  async function addLikedSongsCall(url: string, songs) {
    try {
      let response = await axios.put(url, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + req.session["access_token"],
          "Content-Type": "application/json",
        },
        data: {
          ids: songs,
        },
      });
      return response.data.items;
    } catch (error: any) {
      if (error.response.status == undefined) {
        console.log(error);
      }
      switch (error.response.status) {
        case 429:
          console.log("timeout error");
          setTimeout(function () {},
          error.response.headers["retry-after"] * 1000);
          return addLikedSongsCall(url, songs);
        case 401:
          await refreshToken(req, res);
          return addLikedSongsCall(url, songs);
        default:
          console.log("OTHER ERROR" + error.response.status);
          return [];
      }
    }
  }

  while (req.body.songIds.length > 0) {
    addLikedSongsCall(url, req.body.songIds.splice(0, 50));
  }
}

export async function createPlaylist(req: Request, res: Response) {
  const createPlaylistURL =
    "https://api.spotify.com/v1/users/" +
    req.session["profile_id"] +
    "/playlists";
  const playlistDetails = req.body.playlistDetails;

  async function getPlaylistId(url: string) {
    try {
      let response = await axios.post(url, playlistDetails, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + req.session["access_token"],
          "Content-Type": "application/json",
        },
      });
      return response.data.id;
    } catch (error: any) {
      if (error.response.status == undefined) {
        console.log(error);
      }
      switch (error.response.status) {
        case 429:
          console.log("timeout error");
          setTimeout(function () {},
          error.response.headers["retry-after"] * 1000);
          return getPlaylistId(url);
        case 401:
          let authData = {
            grant_type: "refresh_token",
            refresh_token: req.session["refresh_token"],
          };
          let response = await axios.post(refreshTokenUri, authData, {
            headers: {
              Authorization:
                "Basic " +
                new Buffer(client_id + ":" + client_secret).toString("base64"),
            },
          });
          req.session["access_token"] = response.data.access_token;
          return getPlaylistId(url);
        default:
          console.log("OTHER ERROR PLEASE CHECK");
          console.log(error.response.status);
          return [];
      }
    }
  }
  let playlistId = await getPlaylistId(createPlaylistURL);
  res.send(playlistId);
}

export async function addSongsToPlaylist(req: Request, res: Response) {
  const playlistId = req.body.playlistId;
  const songUris = req.body.songUris;

  const addSongPlaylistURL =
    "https://api.spotify.com/v1/playlists/" + playlistId + "/tracks";

  async function addToPlaylistCall(url: string, songs) {
    let songObj = { uris: songs };
    try {
      let response = await axios.post(url, songObj, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + req.session["access_token"],
          "Content-Type": "application/json",
        },
      });
      return response.data.items;
    } catch (error: any) {
      if (error.response.status == undefined) {
        console.log(error);
      }
      switch (error.response.status) {
        case 429:
          console.log("timeout error");
          setTimeout(function () {},
          error.response.headers["retry-after"] * 1000);
          return addToPlaylistCall(url, songs);
        case 401:
          await refreshToken(req, res);
          return addToPlaylistCall(url, songs);
        default:
          console.log("OTHER ERROR PLEASE CHECK");
          console.log(error.response.status);
          return [];
      }
    }
  }

  while (songUris.length > 0) {
    addToPlaylistCall(addSongPlaylistURL, songUris.splice(0, 100));
  }
}

export async function top(req: Request, res: Response) {
  const rankType = req.query.rankType;
  const rankTime = req.query.rankTime;
  const url = "https://api.spotify.com/v1/me/top/" + rankType;

  async function topCall() {
    try {
      let response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + req.session["access_token"],
          "Content-Type": "application/json",
        },
        params: {
          limit: 50,
          time_range: rankTime,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response.status == undefined) {
        console.log(error);
      }
      switch (error.response.status) {
        case 429:
          console.log("timeout error");
          setTimeout(function () {},
          error.response.headers["retry-after"] * 1000);
          return topCall();
        case 401:
          await refreshToken(req, res);
          return topCall();
        default:
          console.log("OTHER ERROR PLEASE CHECK");
          console.log(error.response.status);
          return [];
      }
    }
  }
  let topObj = await topCall();
  res.send(topObj.items);
}

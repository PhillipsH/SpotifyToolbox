import { Request, Response } from "express";

import axios from "axios"
import axiosRetry from "axios-retry"
require("dotenv").config();

const redirect_uri: string = `http://${process.env.API_IP}/api/authenticate/getTokens`
// const redirect_uri: string = "http://52.188.116.255:5000/api/authenticate/getTokens";
const client_id: string | undefined = process.env.CLIENT_ID;
const client_secret: string | undefined = process.env.CLIENT_SECRET;
const querystring = require("querystring");

axiosRetry(axios, {
  retries: 15,
  retryDelay: (error) => {
    console.log(error)
    return 2500;
  },
  retryCondition: (error) => {
    return error?.response?.status === 429 || error?.response?.status === 503;
  },
});

//Function adds user to database then redirects user to the main page.
export async function authenticateUser(req: Request, res: Response) {
  var scope: string =
    "user-library-read user-library-modify playlist-read-private playlist-modify-private playlist-modify-public user-read-private user-read-email user-top-read";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
      })
  );
}

export async function getTokens(req: Request, res: Response) {
  const authURI = "https://accounts.spotify.com/api/token";
  const profileURI = "https://api.spotify.com/v1/me";

  axios({
    url: authURI,
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    params: {
      grant_type: "authorization_code",
      code: req.query.code,
      redirect_uri: redirect_uri,
    },
  })
    .then((response) => {
      req.session["code"] = req.query.code;
      req.session["access_token"] = response.data.access_token;
      req.session["refresh_token"] = response.data.refresh_token;
      // req.session.cookie.maxAge = parseInt(response.data.expires_in) * 1000;
      axios
        .get(profileURI, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + req.session["access_token"],
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          req.session["profile_id"] = response.data.id;
          res.redirect(`http://${process.env.API_IP}`);
        });
    })
    .catch((error) => {
      if (error?.response?.status == undefined) {
        console.log(error);
      }else{
        console.log(error)
      }
    });
}

export async function checkAuth(req: Request, res: Response) {
  if (req.session["access_token"] != undefined) {
    res.send({ isAuthenticated: true });
  } else {
    res.send({ isAuthenticated: false });
  }
}

export async function refreshToken(req: Request, res: Response) {
  const refreshTokenUri: string = "https://accounts.spotify.com/api/token";
  try{
    let response = await axios({
      url: refreshTokenUri,
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      params: {
        grant_type: "refresh_token",
        refresh_token: req.session["refresh_token"],
      },
    })
    req.session["access_token"] = response.data.access_token;
  }catch{
    res.redirect(`${process.env.API_IP}`);
  }
}

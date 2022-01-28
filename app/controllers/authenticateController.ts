import { Request, Response } from "express";

const axios = require("axios");
require("dotenv").config();

const redirect_uri: string = "http://localhost:5000/authenticate/getTokens";
const client_id: string | undefined = process.env.CLIENT_ID;
const client_secret: string | undefined = process.env.CLIENT_SECRET;
const querystring = require("querystring");

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
        new Buffer(client_id + ":" + client_secret).toString("base64"),
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
          res.redirect("http://localhost:5000/");
        });
    })
    .catch((error) => {
      console.log(error);
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
  console.log("refreshing")
  console.log(req.session["refresh_token"])
  const refreshTokenUri: string = "https://accounts.spotify.com/api/token";

  let response = await axios({
    url: refreshTokenUri,
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    params: {
      grant_type: "refresh_token",
      refresh_token: req.session["refresh_token"],
    },
  })
  console.log("REFRESHED")
  req.session["access_token"] = response.data.access_token;
}

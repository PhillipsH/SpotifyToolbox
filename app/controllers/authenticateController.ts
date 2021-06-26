import { Request, Response } from "express";

const axios = require("axios");

const redirect_uri:string = 'http://localhost:5000/authenticate/getTokens'
const client_id : string = '300ac0b33203415b98bd63ec4146c74c'
const client_secret : string = 'a78fd6a2e88a4d0282c4c8724771646f'
const querystring = require('querystring');

//Function adds user to database then redirects user to the main page.
export async function authenticateUser (req:Request, res:Response) {
  // const scope = 'user-read-private playlist-read-private user-library-read';
  // const scope:string = 'user-library-read';
  var scope = 'user-read-private user-read-email user-library-read';
  res.redirect('https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
  }));
    
}

export async function getTokens (req:Request, res:Response) {
  console.log(req.query.code)
  console.log(req.originalUrl)
  const authURI = 'https://accounts.spotify.com/api/token'
  axios({
      url: authURI,
      method: 'post',
      params: {
        grant_type: 'client_credentials',
        code: req.query.code
      },
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: client_id,
        password: client_secret
      }
  }).then(response => {
    console.log("setting cookie")
    res.cookie('access_token',response.data.access_token, { maxAge: parseInt(response.data.expires_in) * 1000, httpOnly: true });
    res.redirect('http://localhost:3000/')
  })
}
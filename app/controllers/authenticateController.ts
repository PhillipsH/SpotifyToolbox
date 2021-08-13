import { Request, Response } from "express";
import request from 'request'

const axios = require("axios");

const redirect_uri:string = 'http://localhost:5000/authenticate/getTokens'
const client_id : string = '300ac0b33203415b98bd63ec4146c74c'
const client_secret : string = 'a78fd6a2e88a4d0282c4c8724771646f'
const querystring = require('querystring');


//Function adds user to database then redirects user to the main page.
export async function authenticateUser (req:Request, res:Response) {
  console.log("AUTHENTICATE USER")
  var scope:string = 'user-library-read user-library-modify playlist-read-private playlist-modify-private playlist-modify-public user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
  }));
}

export async function getTokens (req:Request, res:Response) {
  const authURI = 'https://accounts.spotify.com/api/token'
  const profileURI = 'https://api.spotify.com/v1/me'

  console.log("GETTING TOKENS")
  axios({
      url: authURI,
      method: 'post',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      params: {
        grant_type: 'authorization_code',
        code: req.query.code,
        redirect_uri: redirect_uri
      }
  }).then(response => {
    req.session["code"] = req.query.code;
    req.session["access_token"] = response.data.access_token;
    req.session.cookie.maxAge = parseInt(response.data.expires_in) * 1000;
    axios.get(profileURI, {
      headers: {
          Accept: "application/json",
          Authorization: "Bearer " + req.session["access_token"],
          "Content-Type": "application/json"
      }
    }).then(response => {
      req.session["profile_id"] = response.data.id
      res.redirect('http://localhost:3000/');
    })
  }).catch((error)=>{
    console.log(error)
  })
}

export async function checkAuth (req:Request, res:Response) {
  console.log("CHECK AUTH")
  if(req.session["access_token"] != undefined){
    res.send({"isAuthenticated" : true})
  }else{
    res.send({"isAuthenticated" : false})
  }
}
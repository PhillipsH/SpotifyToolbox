import { Request, Response } from "express";

const axios = require("axios");

const redirect_uri:string = 'http://localhost:3000/callback'
const client_id : string = '300ac0b33203415b98bd63ec4146c74c'
// const client_secret : string = 'a78fd6a2e88a4d0282c4c8724771646f'
const querystring = require('querystring');

//Function adds user to database then redirects user to the main page.
export async function authenticateUser (req:Request, res:Response) {
  // const scope = 'user-read-private playlist-read-private user-library-read';
  const scope:string = 'user-library-read';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      // state: state
    }));
}
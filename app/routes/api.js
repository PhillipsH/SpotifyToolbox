"use strict";
// import { Request, Response } from "express";
// import {Router} from 'express'
// const apiRouter = Router();
// const path = require('path')
// var querystring = require('querystring');
// var request = require('request'); // "Request" library
// let redirect_uri = 'http://localhost:5000/callback'
// let client_id : string = '300ac0b33203415b98bd63ec4146c74c'
// let client_secret : string = 'a78fd6a2e88a4d0282c4c8724771646f'
// /* GET home page. */
// apiRouter.get('/', (req:Request, res:Response) =>{
//   res.send("API is working properly");
// })
// apiRouter.get('/authenticateUser', (req:Request, res:Response) =>{
//   // res.send("hello what is good")
//   var scope = 'user-read-private playlist-read-private';
//   console.log("hey")
//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope, 
//       redirect_uri: redirect_uri,
//       // state: state
//     }));
//   // res.redirect('https://accounts.spotify.com/authorize' +
//   //   '?response_type=code' +
//   //   '&client_id=' + my_client_id +
//   //   (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
//   //   '&redirect_uri=' + encodeURIComponent(redirect_uri));
// })
// apiRouter.get('/callback', (req:Request, res:Response) =>{
//   // res.send(req.query.code + "\n\n")
//   let code = req.query.code
//   var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     form: {
//       code: code,
//       redirect_uri: redirect_uri,
//       grant_type: 'authorization_code'
//     },
//     headers: {
//       'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//     },
//     json: true
//   };
//   request.post(authOptions, function(error:Error, response:Response, body :any) {
//     console.log("yo")
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token
//       // var refresh_token = body.refresh_token;
//       console.log(access_token)
//       var options = {
//         url: 'https://api.spotify.com/v1/me/playlists',
//         headers: { 'Authorization': 'Bearer ' + access_token },
//         json: true
//       };
//       // use the access token to access the Spotify Web API
//       request.get(options, function(error:Error, response:Response, body:any) {
//         let playlists = body.items
//         let playlist = ""
//         for(let i in playlists){
//           console.log(playlists[i])
//           playlist += playlists[i].name
//           playlist += '|'
//         }
//         res.sendFile(path.resolve(__dirname,'../','../', 'spotify-react', 'build', 'index.html'))
//       });
//       // we can also pass the token to the browser to make requests from there
//     }  
//   });
// })
// export default apiRouter

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiRouter = express_1.Router();
var path = require('path');
var querystring = require('querystring');
var request = require('request'); // "Request" library
var redirect_uri = 'http://localhost:5000/callback';
var client_id = '300ac0b33203415b98bd63ec4146c74c';
var client_secret = 'a78fd6a2e88a4d0282c4c8724771646f';
/* GET home page. */
apiRouter.get('/', function (req, res) {
    res.send("API is working properly");
});
apiRouter.get('/authenticateUser', function (req, res) {
    // res.send("hello what is good")
    var scope = 'user-read-private playlist-read-private';
    console.log("hey");
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
        }));
});
apiRouter.get('/callback', function (req, res) {
    // res.send(req.query.code + "\n\n")
    var code = req.query.code;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };
    request.post(authOptions, function (error, response, body) {
        console.log("yo");
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            // var refresh_token = body.refresh_token;
            console.log(access_token);
            var options = {
                url: 'https://api.spotify.com/v1/me/playlists',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
            };
            // use the access token to access the Spotify Web API
            request.get(options, function (error, response, body) {
                var playlists = body.items;
                var playlist = "";
                for (var i in playlists) {
                    console.log(playlists[i]);
                    playlist += playlists[i].name;
                    playlist += '|';
                }
                res.sendFile(path.resolve(__dirname, '../', '../', 'spotify-react', 'build', 'index.html'));
            });
            // we can also pass the token to the browser to make requests from there
        }
    });
});
exports.default = apiRouter;

import { Request, Response } from 'express';

import axios from 'axios';
const querystring = require('querystring');

const redirect_uri:string = 'http://localhost:3000/callback'
const client_id:string = '300ac0b33203415b98bd63ec4146c74c'
const client_secret:string = 'a78fd6a2e88a4d0282c4c8724771646f'
const likedSongUri:string = 'https://api.spotify.com/v1/me/tracks'

//Function adds user to database then redirects user to the main page.
export async function getLikedSongs (req:Request, res:Response) {
    console.log("GETTING LIKED SONGS")
    console.log(req.query.code)
    axios.get(likedSongUri, {
        params: {
            market: 'US',
            limit: '50',
            offset: '1'
        },
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + req.query.code,
            "Content-Type": "application/json"
        }
    }).then(response =>{console.log(response)}).catch((error)=>{
        console.log(error)
    })
    // axios.get(likedSongUri, {
    //     params: {
    //         market: 'US',
    //         limit: '50',
    //         offset: '1'
    //     },
    //     headers: {
    //         Accept: "application/json",
    //         Authorization: "Bearer BQAA26f4wr4CED34QVPZrSktgKtMXtpNom73BilA9DlwhfEnBHMxmAkBnSSkHPSRm7sE9ioU48RHV0-y-q2quUT8-He2SWU9V3dUcF78-Uq_aghR7CvTuvobbQ4Ex2NywxczTwD0lkK5-GGCI_qeedi9kZl6K7LFEOyeG87g4N8AYWW-Q556fwbFCGutvg" ,
    //         "Content-Type": "application/json"
    //     }
    // }).then(response =>{console.log(response)})
    // .catch((error)=>{
    //     console.log(error)
    // })
    
}
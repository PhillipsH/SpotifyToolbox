import axios from "axios"
import { ITrack } from "../types/interfaces"

export function addToPlaylist(playlistSongs){
  let songUris:string []= []
  //getting all songs
  for(let songIndex in playlistSongs){
    songUris.push(playlistSongs[songIndex].track.uri)
  }
  let playlistData = {
    songUris : songUris
  }
  // delete song from spotify through server api
  console.log(playlistData)
  axios
  .post('http://localhost:5000/spotify/addToPlaylist', playlistData,
  {withCredentials: true,})
  .then(res =>{
    console.log(res)
  });
}


export function removeLikedSong(dupeIds:string[], likedSongsList:ITrack[]){
  
  axios
  .delete('http://localhost:5000/spotify/removeLikedSongs', 
  {withCredentials: true,
  data : {
    songIds : dupeIds
  }})
  .then(res =>{
    console.log(res)
  });

  let likedSongsDict:any = {}

  for(let songIndex in likedSongsList){
    const id = likedSongsList[songIndex].linked_from_id ?? likedSongsList[songIndex].track_id
    likedSongsDict[id] = likedSongsList[songIndex]
  }


  for(let dupeId in dupeIds){
    if(likedSongsDict[dupeId] !== undefined){
      delete likedSongsDict[dupeId]
    }
  }

  let currentSongsNew:ITrack[] = Object.values(likedSongsDict);
  return currentSongsNew

}

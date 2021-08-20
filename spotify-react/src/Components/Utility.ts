import axios from "axios"

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


// function removeAllSongs(removeSongs, likedSongs){
//   console.log("trying to remove")
  
//   axios
//   .delete('http://localhost:5000/spotify/removeLikedSongs', 
//   {withCredentials: true,
//   data : {
//     songIds : removeSongs
//   }})
//   .then(res =>{
//     console.log(res)
//   });

//   // let likedSongsNew = props.likedSongs.slice()
//   console.log(likedSongsNew)

//   //Find likedSong in state with the same id user deleted
  
//   for(let idIndex in dupeIds){
//     console.log(dupeIds[idIndex])
//     let index = 0;
//     let found = false;
//     while(index < likedSongsNew.length && found == false){
//       if (likedSongsNew[index].track.id == dupeIds[idIndex]){
//         found = true;
//         likedSongsNew.splice(index, 1)
//       }
//       index++
//     }
//   }

//   //Set the liked Songs
//   console.log(likedSongsNew.length)
//   // props.setLikedSongs(likedSongsNew)

//   //Set current songs with deleted song
//   let currentSongsNew = []

//   // props.setCurrentSongList(currentSongsNew, "DUPLICATE_SONGS" )

// }

export function findDuplicates(likedSongs) {
  let likedSongsObj: any = {};
  let duplicateObj: any = {};

  //Create an object of props of all liked songs
  for (let index in likedSongs) {
    if (
      likedSongsObj[
        "" +
          likedSongs[index].track.name +
          likedSongs[index].track.artists[0].name
      ] == undefined
    ) {
      likedSongsObj[
        "" +
          likedSongs[index].track.name +
          likedSongs[index].track.artists[0].name
      ] = likedSongs[index];
    } else {
      if (
        duplicateObj[
          "" +
            likedSongs[index].track.name +
            likedSongs[index].track.artists[0].name
        ] == undefined
      ) {
        duplicateObj[
          "" +
            likedSongs[index].track.name +
            likedSongs[index].track.artists[0].name
        ] = [
          likedSongsObj[
            "" +
              likedSongs[index].track.name +
              likedSongs[index].track.artists[0].name
          ],
        ];
      }
      duplicateObj[
        "" +
          likedSongs[index].track.name +
          likedSongs[index].track.artists[0].name
      ].push(likedSongs[index]);
      // let bothSongs = [likedSongsObj["" + props.likedSongs[index].track.name + props.likedSongs[index].track.artists[0].name], props.likedSongs[index]]
      // duplicateSongs.push(bothSongs)
    }
  }
  let duplicateSongs: any = Object.values(duplicateObj);
  console.log(duplicateSongs.length);

  // props.setCurrentSongList(duplicateSongs, "DUPLICATE_SONGS");
}
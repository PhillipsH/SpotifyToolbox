import axios from "axios"

export function addToPlaylist(currentSongs){
  console.log("trying to remove")
  let songUris:string []= []
  console.log(currentSongs)
  //getting all songs
  for(let songIndex in currentSongs.currentList){
    songUris.push(currentSongs.currentList[songIndex].track.uri)
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
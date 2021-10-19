import React, { useEffect, useState } from "react";
import GenreSong from './GenreSong'
import {Button} from "reactstrap";
import { connect } from "react-redux";
import { addToPlaylist } from "../Utility";
import { ITrack } from "../../types/interfaces";

const GenreBoard = (props) => {
  const [genres, setGenres]:any = useState([]);
  const [currentSongs, setCurrentSongs]:any = useState([])

  useEffect(() => {
    let currentGenres = {}
    for(let i in props.likedSongs.list){
      for(let genre in props.likedSongs.list){
        if(currentGenres[props.likedSongs.list[i].genres[genre]] == undefined){
          currentGenres[props.likedSongs.list[i].genres[genre]] = {}
        }
        currentGenres[props.likedSongs.list[i].genres[genre]][props.likedSongs.list[i].track_id] = props.likedSongs.list[i]
      }
    }
    setGenres(currentGenres)
    
  }, []);
  for(let genre in genres){
    console.log(genre)
  }
  function getPop(){
    let currentPop = {}
    Object.assign(currentPop, genres["pop"]);
    Object.assign(currentPop, genres["post-teen pop"]);
    Object.assign(currentPop, genres["electropop"]);
    Object.assign(currentPop, genres["dance pop"]);
    Object.assign(currentPop, genres["alt z"]);
    Object.assign(currentPop, genres["social media pop"]);
    Object.assign(currentPop, genres["indie poptism"]);
    Object.assign(currentPop, genres["tropical house"]);
    Object.assign(currentPop, genres["pop dance"]);
    Object.assign(currentPop, genres["uk pop"]);

    Object.assign(currentPop, genres["acoustic pop"]);
    Object.assign(currentPop, genres["art pop"]);
    Object.assign(currentPop, genres["australian alternative pop"]);
    Object.assign(currentPop, genres["australian pop"]);
    Object.assign(currentPop, genres["acoustic pop"]);
    Object.assign(currentPop, genres["barbadian pop"]);
    Object.assign(currentPop, genres["baroque pop"]);
    Object.assign(currentPop, genres["bedroom pop"]);
    Object.assign(currentPop, genres["bow pop"]);
    Object.assign(currentPop, genres["brill building pop"]);
    Object.assign(currentPop, genres["britpop"]);
    Object.assign(currentPop, genres["bubblegum pop"]);
    Object.assign(currentPop, genres["canadian pop"]);
    Object.assign(currentPop, genres["canadian pop punk"]);
    Object.assign(currentPop, genres["candy pop"]);
    Object.assign(currentPop, genres["chill pop"]);
    Object.assign(currentPop, genres["columbian pop"]);
    Object.assign(currentPop, genres["danish pop"]);
    Object.assign(currentPop, genres["dream pop"]);
    setCurrentSongs(Object.values(currentPop))

    console.log(currentPop)
  }
  function getHipHop(){
    let currentHipHop = {}

    //general hip hop
    Object.assign(currentHipHop, genres["hip hop"]);
    Object.assign(currentHipHop, genres["rap"]);
    Object.assign(currentHipHop, genres["abstract hip hop"]);
    Object.assign(currentHipHop, genres["alternative hip hop"]);
    Object.assign(currentHipHop, genres["atl hip hop"]);
    Object.assign(currentHipHop, genres["conscious hip hop"]);
    Object.assign(currentHipHop, genres["deep underground hip hop"]);
    Object.assign(currentHipHop, genres["experimental hip hop"]);
    Object.assign(currentHipHop, genres["golden age hip hop"]);
    Object.assign(currentHipHop, genres["indie hip hop"]);
    Object.assign(currentHipHop, genres["industrial hip hop"]);
    Object.assign(currentHipHop, genres["lgbtq+ hip hop"]);
    Object.assign(currentHipHop, genres["old school hip hop"]);
    Object.assign(currentHipHop, genres["abstract"]);
    Object.assign(currentHipHop, genres["political hip hop"]);
    Object.assign(currentHipHop, genres["psychedelic hip hop"]);
    Object.assign(currentHipHop, genres["hip hop"]);
    Object.assign(currentHipHop, genres["gangster rap"]);
    Object.assign(currentHipHop, genres["trap"]);
    Object.assign(currentHipHop, genres["pop rap"]);
    Object.assign(currentHipHop, genres["hardcore hip hop"]);
    Object.assign(currentHipHop, genres["crunk"]);
    Object.assign(currentHipHop, genres["atl hip hop"]);
    Object.assign(currentHipHop, genres["underground hip hop"]);
    Object.assign(currentHipHop, genres["melodic rap"]);
    Object.assign(currentHipHop, genres["hip pop"]);
    Object.assign(currentHipHop, genres["alternative hip hop"]);
    Object.assign(currentHipHop, genres["old school hip hop"]);
    Object.assign(currentHipHop, genres["conscious hip hop"]);
    Object.assign(currentHipHop, genres["golden age hip hop"]);

    //American hip hop
    Object.assign(currentHipHop, genres["boston hip hip"]);
    Object.assign(currentHipHop, genres["buffalo hip hop"]);
    Object.assign(currentHipHop, genres["indiana hip hop"]);
    Object.assign(currentHipHop, genres["memphis hip hop"]);
    Object.assign(currentHipHop, genres["minnesota hip hop"]);
    Object.assign(currentHipHop, genres["queens hip hop"]);
    Object.assign(currentHipHop, genres["sacremento hip hop"]);
    Object.assign(currentHipHop, genres["seattle hip hop"]);
    Object.assign(currentHipHop, genres["kentucky hip hop"]);
    Object.assign(currentHipHop, genres["portland hip hop"]);
    Object.assign(currentHipHop, genres["miami hip hop"]);
    Object.assign(currentHipHop, genres["mississippi hip hop"]);
    Object.assign(currentHipHop, genres["north carolina hip hop"]);
    Object.assign(currentHipHop, genres["oakland hip hop"]);
    Object.assign(currentHipHop, genres["ohio hip hop"]);
    Object.assign(currentHipHop, genres["asian american hip hop"]);
    Object.assign(currentHipHop, genres["detroit hip hop"]);
    Object.assign(currentHipHop, genres["east coast hip hop"]);
    Object.assign(currentHipHop, genres["west coast rap"]);
    Object.assign(currentHipHop, genres["southern hip hop"]);
    Object.assign(currentHipHop, genres["dirty south rap"]);

    //western hip hop
    Object.assign(currentHipHop, genres["uk hip hop"]);
    Object.assign(currentHipHop, genres["uk alternative hip hop"]);
    Object.assign(currentHipHop, genres["australian hip hop"]);
    Object.assign(currentHipHop, genres["canadian hip hop"]);
    Object.assign(currentHipHop, genres["canadian old school hip hop"]);
    Object.assign(currentHipHop, genres["bc underground hip hop"]);

    //asian hip hop
    // Object.assign(currentHipHop, genres["hong kong hip hop"]);
    // Object.assign(currentHipHop, genres["indonesian hip hop"]);
    // Object.assign(currentHipHop, genres["desi hip hop"]);
    // Object.assign(currentHipHop, genres["chinese hip hop"]);
    // Object.assign(currentHipHop, genres["korean old school hip hop"]);
    
    //
    // Object.assign(currentHipHop, genres["latin hip hop"]);
    
    setCurrentSongs(Object.values(currentHipHop))
  }
  function getRock(){
    let currentRock = {}
    Object.assign(currentRock, genres["rock"]);
    Object.assign(currentRock, genres["album rock"]);
    Object.assign(currentRock, genres["classic rock"]);
    Object.assign(currentRock, genres["hard rock"]);
    Object.assign(currentRock, genres["heartland rock"]);
    Object.assign(currentRock, genres["modern rock"]);
    Object.assign(currentRock, genres["mellow gold"]);
    Object.assign(currentRock, genres["alternative rock"]);
    Object.assign(currentRock, genres["soft rock"]);
    Object.assign(currentRock, genres["art rock"]);
    Object.assign(currentRock, genres["blues rock"]);
    Object.assign(currentRock, genres["folk rock"]);
    Object.assign(currentRock, genres["country rock"]);
    Object.assign(currentRock, genres["pop rock"]);
    Object.assign(currentRock, genres["modern alternative rock"]);
    Object.assign(currentRock, genres["glam rock"]);
    Object.assign(currentRock, genres["indie rock"]);
    setCurrentSongs(Object.values(currentRock))

  }
  function getRNB(){
    let currentRNB = {}
    Object.assign(currentRNB, genres["r&b"]);
    Object.assign(currentRNB, genres["urban contemporary"]);
    Object.assign(currentRNB, genres["new jack swing"]);
    Object.assign(currentRNB, genres["neo soul"]);
    Object.assign(currentRNB, genres["pop r&b"]);
    Object.assign(currentRNB, genres["alternative r&b"]);
    Object.assign(currentRNB, genres["chill r&b"]);
    Object.assign(currentRNB, genres["indie r&b"]);

    setCurrentSongs(Object.values(currentRNB))
  }
  function getPunk(){
    let currentPunk = {}
    Object.assign(currentPunk, genres["punk"]);
    Object.assign(currentPunk, genres["pop punk"]);
    Object.assign(currentPunk, genres["skate punk"]);
    Object.assign(currentPunk, genres["post-punk"]);
    Object.assign(currentPunk, genres["hardcore punk"]);
    Object.assign(currentPunk, genres["alternative rock"]);
    Object.assign(currentPunk, genres["pop emo"]);
    Object.assign(currentPunk, genres["anthem emo"]);
    Object.assign(currentPunk, genres["pixie"]);
    Object.assign(currentPunk, genres["emo"]);
    Object.assign(currentPunk, genres["alternative emo"]);
    Object.assign(currentPunk, genres["canadian pop punk"]);
    Object.assign(currentPunk, genres["uk pop punk"]);
    Object.assign(currentPunk, genres["modern alternative rock"]);
    setCurrentSongs(Object.values(currentPunk))

  }
  function getIndie(){
    let currentIndie = {}
    Object.assign(currentIndie, genres["indie pop"]);
    Object.assign(currentIndie, genres["indie rock"]);
    Object.assign(currentIndie, genres["indie folk"]);
    Object.assign(currentIndie, genres["indie punk"]);
    Object.assign(currentIndie, genres["indie r&b"]);
    Object.assign(currentIndie, genres["indie garage rock"]);

    setCurrentSongs(Object.values(currentIndie))
  }
  function getChristian(){
    let currentChristian = {}
    Object.assign(currentChristian, genres["christian music"]);
    Object.assign(currentChristian, genres["woriship"]);
    Object.assign(currentChristian, genres["christian alternative rock"]);
    Object.assign(currentChristian, genres["ccm"]);
    Object.assign(currentChristian, genres["world worship"]);
    Object.assign(currentChristian, genres["anthem worship"]);
    Object.assign(currentChristian, genres["christian rock"]);
    Object.assign(currentChristian, genres["christian pop"]);
    Object.assign(currentChristian, genres["christian ccm"]);
    Object.assign(currentChristian, genres["deep christian rock"]);
    setCurrentSongs(Object.values(currentChristian))
  }
  function getKPop(){
    let currentKPop = {}
    Object.assign(currentKPop, genres["k-pop"]);
    Object.assign(currentKPop, genres["k-pop boy group"]);
    Object.assign(currentKPop, genres["k-pop girl group"]);
    Object.assign(currentKPop, genres["korean pop"]);
    Object.assign(currentKPop, genres["korean r&b"]);
    Object.assign(currentKPop, genres["k-rap"]);
    Object.assign(currentKPop, genres["k-indie"]);
    Object.assign(currentKPop, genres["classic k-pop"]);

    setCurrentSongs(Object.values(currentKPop))
  }
  function getElectronic(){
    let currentElectronic = {}
    Object.assign(currentElectronic, genres["edm"]);
    Object.assign(currentElectronic, genres["electro house"]);
    Object.assign(currentElectronic, genres["pop edm"]);
    Object.assign(currentElectronic, genres["progressive electro house"]);
    Object.assign(currentElectronic, genres["electronic trap"]);
    Object.assign(currentElectronic, genres["electro house"]);
    Object.assign(currentElectronic, genres["canadian electronic"]);
    Object.assign(currentElectronic, genres["gaming edm"]);

    setCurrentSongs(Object.values(currentElectronic))
  }

  function addSongsToPlaylist(){
    addToPlaylist(props.currentSongs.currentList)
  }
  return (
    <div className="function-board">
      <h5>Genre Songs: {currentSongs.length}</h5>
      <div className="toolbox">
        <Button color="success" onClick={addSongsToPlaylist}>Add to Playlist</Button>
      </div>
      <Button color="success" onClick={getPop}>Pop</Button>
      <Button color="success" onClick={getHipHop}>HipHop</Button>
      <Button color="success" onClick={getRock}>Rock</Button>
      <Button color="success" onClick={getRNB}>R&B</Button>
      <Button color="success" onClick={getPunk}>Punk</Button>
      <Button color="success" onClick={getIndie}>Indie</Button>
      <Button color="success" onClick={getKPop}>K-Pop</Button>
      <Button color="success" onClick={getChristian}>Christian</Button>
      <Button color="success" onClick={getElectronic}>Electronic</Button>
      <div className="song-container">
        {currentSongs.map((val, key) => (
            <GenreSong
              key={key}
              id={val.track_id}
              title={val.track_name}
              artist={val.artist.artist_name}
              album={val.album.album_name}
              date={val.added_at}
            />
          ))}   
      </div>  
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  currentSongs: state.spotify.currentSongs,
  artists: state.spotify.artists,
  likedSongs: state.spotify.likedSongs,
});

export default connect(mapStateToProps, {})(GenreBoard);


import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import {getLikedSongs} from '../flux/actions/spotifyActions';
import {IAuthProps} from '../types/interfaces';
import axios from "axios";
import querystring from 'querystring';

export const Main = (props)  => {

  const getLikedSongs = () =>{
    const code:string = (window.location.href.split("?")[1].split("=")[1]);
    // const url:string = ("http://localhost:5000/spotify/getLikedSongs/?code=" + code); 
    props.getLikedSongs(code);
    // Axios.get(url).then(response =>{console.log(response)})
    
  }
return (
  <div>
    <Button onClick={getLikedSongs} color="success">YOU ARE IN MAIN</Button><br></br>
  </div>
  );
}

const mapStateToProps = (state:IAuthProps) => ({
  likedSongs: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {getLikedSongs})(Main);
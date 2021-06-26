import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import {authorize} from '../flux/actions/authorizeAction';
import {IAuthProps} from '../types/interfaces';
import axios from "axios";
import querystring from 'querystring';

export const Main = (props)  => {

  const getLikedSongs = () =>{
    console.log("running")
    props.authorize();
  }
  if(props.authenticated == false){
    console.log("authorizing")
    authorize();
  }
  console.log(props.authenticated)
return (
  <div>
    <h1>You are in Main</h1>
    <Button onClick={getLikedSongs} color="success">YOU ARE IN MAIN</Button><br></br>
  </div>
  );
}

const mapStateToProps = (state:IAuthProps) => ({
  authenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {authorize})(Main);
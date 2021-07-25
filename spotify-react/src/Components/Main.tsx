import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import {checkAuthorize} from '../flux/actions/authorizeAction';
import {IAuthProps} from '../types/interfaces';
import Authorizer from './Authorizer';
import SpotifyFunctions from './SpotifyFunctions'

export const Main = (props)  => {

  // props.checkAuthorize();
  useEffect(() => {
    props.checkAuthorize();
  }, [])
  let mainBoard = {
    marginTop:"150px",
    marginBottom:"50px"
  }
  // const checkAuthentication = () =>{
  //   console.log(props.authenticated)
  //   props.checkAuthorize();
  // }
  let mainContent = (props.authenticated.isAuthenticated) 
  ? (
  <>
    <SpotifyFunctions/>
  </>
  )
  : (
    <Authorizer/>
  )
    
  
return (
  <div>
    <div style={mainBoard}>
      <h1>Welcome To Spotify Tools</h1>
    </div>
    {mainContent}
  </div>
  );
}

const mapStateToProps = (state:IAuthProps) => ({
  authenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {checkAuthorize})(Main);
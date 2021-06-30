import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import {checkAuthorize} from '../flux/actions/authorizeAction';
import {IAuthProps} from '../types/interfaces';
import Authorizer from './Authorizer';
import SpotifyFunctions from './SpotifyFunctions'

export const Main = (props)  => {

  // props.checkAuthorize();
  const checkAuthentication = () =>{
    console.log(props.authenticated)
    props.checkAuthorize();
  }
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
    <h1>You are in Main</h1>
    {mainContent}
    <Button onClick={checkAuthentication} color="success">check auth</Button><br></br>
  </div>
  );
}

const mapStateToProps = (state:IAuthProps) => ({
  authenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {checkAuthorize})(Main);
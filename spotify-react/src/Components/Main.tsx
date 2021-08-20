import React, {useEffect } from 'react';
import { connect } from 'react-redux';
import {checkAuthorize} from '../flux/actions/authorizeAction';
import {IAuthProps} from '../types/interfaces';
import Authorizer from './Authorizer';
import SpotifyFunctions from './Dashboard'

export const Main = (props)  => {

  useEffect(() => {
    props.checkAuthorize();
  }, [])
  let mainBoard = {
    marginTop:"150px",
    marginBottom:"50px",
    width:"100%"
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
    {mainContent}
  </div>
  );
}

const mapStateToProps = (state:IAuthProps) => ({
  authenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {checkAuthorize})(Main);
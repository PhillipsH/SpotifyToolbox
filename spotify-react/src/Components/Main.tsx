import React, {useEffect } from 'react';
import { connect } from 'react-redux';
import {checkAuthorize} from '../flux/actions/authorizeAction';
import {IAuthProps} from '../types/interfaces';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard'

export const Main = (props)  => {

  useEffect(() => {
    props.checkAuthorize();
  }, [])
  
  let mainContent = (props.authenticated.isAuthenticated) 
  ? (
  <>
    <Dashboard/>
  </>
  )
  : (
    <LandingPage/>
  )
    
  
return (
  <>
    {mainContent}
  </>
  );
}

const mapStateToProps = (state:IAuthProps) => ({
  authenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {checkAuthorize})(Main);
import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import {checkAuthorize} from '../flux/actions/authorizeAction';
import {IAuthProps} from '../types/interfaces';

export const Authorizer = ({checkAuthorize})  => {
return (
  <div className='background-img'>
    <h1>YOU ARE NOT LOGGED IN</h1>
    <a href="http://localhost:5000/authenticate"><Button color="success">Login With Spotify</Button></a>
  </div>
  );
}

const mapStateToProps = (state:IAuthProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {checkAuthorize})(Authorizer);
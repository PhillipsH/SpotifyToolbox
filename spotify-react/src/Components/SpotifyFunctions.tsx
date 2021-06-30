import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import {checkAuthorize} from '../flux/actions/authorizeAction';
import {IAuthProps} from '../types/interfaces';

export const SpotifyFunctions = ()  => {

return (
  <div>
    <h1>CONGRATS YOU ARE LOGGED IN</h1>
  </div>
);
}

const mapStateToProps = (state:IAuthProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {checkAuthorize})(Authorizer);
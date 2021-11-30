import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import {IAuthProps} from '../types/interfaces';
import MainStyle from './Styles/Components/Main.module.scss'

export const Authorizer = ()  => {
return (
  <div className={MainStyle.backgroundImg}>
    <h1>YOU ARE NOT LOGGED IN</h1>
    <a href="http://localhost:5000/authenticate"><Button color="success">Login With Spotify</Button></a>
  </div>
  );
}

const mapStateToProps = (state:IAuthProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Authorizer);
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import {authorize} from '../flux/actions/authorizeAction';
import {IAuthProps} from '../types/interfaces';
import Axios from "axios";
import querystring from 'querystring';

export const Authorizer = ({authorize})  => {

  const authorizeClick = () =>{
    const code = (window.location.href.split("?")[1].split("=")[1])
    console.log(code)
  }
return (
  <div>
    <Button onClick={authorizeClick} color="success">YOU ARE IN MAIN</Button><br></br>
  </div>
  );
}

const mapStateToProps = (state:IAuthProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {authorize})(Authorizer);
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import {authorize} from '../flux/actions/authorizeAction';
import {IAuthProps} from '../types/interfaces';
import { useParams } from "react-router";
import Axios from "axios"

export const Authorizer = ({authorize})  => {
  authorize()


return (
  <div>
    <a href="http://localhost:5000/authenticate"><Button color="success">Login With Spotify</Button></a>
  </div>
  );
}

const mapStateToProps = (state:IAuthProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {authorize})(Authorizer);
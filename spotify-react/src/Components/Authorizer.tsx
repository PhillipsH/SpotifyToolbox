import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import {authorize} from '../flux/actions/authorizeAction';
import {IAuthProps} from '../types/interfaces';
import { useParams } from "react-router";
import Axios from "axios"

export const Authorizer = ({authorize})  => {

  const authorizeClick = () =>{
    console.log("working")
    // Axios.get('http://localhost:5000/authenticate')
  }
return (
  <div>
    {/* <Button onClick={authorizeClick} color="success">success</Button><br></br> */}
    <a href="http://localhost:5000/authenticate"><Button color="success">Link</Button></a>
  </div>
  );
}

const mapStateToProps = (state:IAuthProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {authorize})(Authorizer);
import React, { Component } from 'react';
import {Row} from 'react-bootstrap';
import NavBar from './NavBar';
import ChangePassword from "./ChangePassword";
import Auth from "../models/Auth";

class User extends Component {
  constructor(props){
    Auth.authenticationRequired();
    super(props);
  }

  render() {
    return(
      <div>
        <Row>
          <NavBar/>
        </Row>
        <Row>
          <ChangePassword/>
        </Row>
      </div>
    );
  }

}

export default User;

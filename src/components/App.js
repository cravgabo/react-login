import React, { Component } from 'react';
import {Row} from 'react-bootstrap';
import Login from  '../components/Login';
import NavBar from '../components/NavBar';
import StartPage from '../components/StartPage';
import Register from "./Register";
import Auth from "../models/Auth";

class App extends Component {
  constructor(props){
    Auth.notAuthenticationRequired();
    super(props);
    this.state = {
      "show_login": localStorage.getItem("show_login") === "true"
    };
  }

  static showLogin(){
    if(localStorage.getItem("show_login") !== "true" ){
      localStorage.setItem("show_login", "true");
      console.log("show_login", localStorage.getItem("show_login"));
      window.location.reload();
    }
  }

  static hideLogin(){
    if(localStorage.getItem("show_login") === "true"){
      localStorage.setItem("show_login", "false");
      console.log("show_login", localStorage.getItem("show_login"));
      window.location.reload();
    }
  }

  loginScreen = (
    <div>
      <Row>
        <NavBar/>
      </Row>
      <Row>
        <StartPage/>
        <Login/>
      </Row>
    </div>
  );

  registerScreen = (
    <div>
      <Row>
        <NavBar/>
      </Row>
      <Row>
        <StartPage/>
        <Register/>
      </Row>
    </div>
  );

  render() {
    if(this.state.show_login) {
      return this.loginScreen;
    }
    return this.registerScreen;
  }
}

export default App;

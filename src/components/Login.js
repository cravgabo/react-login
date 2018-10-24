import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel, Col} from "react-bootstrap";
import "../styles/Login.css";
import Auth from "../models/Auth";
import config from "../config";
import FetchResponses from "./FetchResponses";
import ForgotPassword from "./ForgotPassword";
import Commons from "./commons";


class Login extends Component {
  constructor(props) {
    Auth.notAuthenticationRequired();
    super(props);
    const user_data = Auth.getLastUserData();
    let username = "";
    let email = "";
    if(user_data && user_data !== "{}"){
      username = JSON.parse(user_data).username;
      email = JSON.parse(user_data).email;
    }
    this.state = {
      username: username,
      password: "",
      email: email,
      display: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setDisplayLogin = this.setDisplayLogin.bind(this);
  };

  validateForm() {
    return this.state.username.length > 3 && this.state.password.length > 3;
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  setDisplayLogin(value){
    this.setState({
      display: value
    });
    console.log(this.state.display)
  }

  static successResponse(json_data){
    console.info("Response success", JSON.stringify(json_data));
    alert("User successfully log in");
    Auth.loginUser(json_data.key);
    console.info("session_token", Auth.getSessionToken());
    return window.location.reload();
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = Commons.formDataToObject(new FormData(event.target));

    fetch(config.url_login, {
      method: "POST",
      body: JSON.stringify(data),
      headers: config.headers_base})
      .then(FetchResponses.processResponse)
      .then(Login.successResponse)
      .catch(FetchResponses.errorResponse)
  };

  formLogin() {
    if (this.state.display) {
      return (
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>Username</ControlLabel>
            <FormControl
              name="username"
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              autoComplete={"off"}
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit">
            Login
          </Button>
        </form>
      );
    }
  }

  render() {
    return (
      <Col xs={4} md={4}>
        {this.formLogin()}
        <ForgotPassword
          email={this.state.email}
          setDisplayLogin={this.setDisplayLogin}
        />
      </Col>
    );
  }
}

export default Login;
import React, {Component} from "react";
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import Commons from "./commons";
import config from "../config";
import FetchResponses from "./FetchResponses";

class ForgotPassword extends Component{
  constructor(props){
    super(props);

    this.state = {
      email: this.props.email,
      display: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.setDisplay = this.setDisplay.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  setDisplay(){
    this.setState({
      display: !this.state.display
    });
    this.props.setDisplayLogin(this.state.display)
  }

  static successResponse(json_data){
    const response = JSON.stringify(json_data);
    console.info("Response success", response);
    alert(json_data.detail);
  }

  static handleSubmit(event) {
    event.preventDefault();
    const data = Commons.formDataToObject(new FormData(event.target));
    console.log(data);

    fetch(config.reset_pass, {
      method: "POST",
      body: JSON.stringify(data),
      headers: config.headers_base})
      .then(FetchResponses.processResponse)
      .then(ForgotPassword.successResponse)
      .catch(FetchResponses.errorResponse)
  };

  formForgotPassword() {
    if (this.state.display) {
      return (
        <form onSubmit={ForgotPassword.handleSubmit}>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              value={this.state.email}
              onChange={this.handleChange}
              name={"email"}
              type="email"
              autoComplete={"off"}
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            type="submit">
            Change Password
          </Button>
        </form>
      );
    }
  }

  forgotPasswordMain(){
    return (
      <div>
        <Button
          onClick={this.setDisplay}
          bsStyle="link">I Forgot Password
        </Button>
       {this.formForgotPassword()}
      </div>
    );
  }

  render() {
    return this.forgotPasswordMain();
  }

}

export default ForgotPassword;
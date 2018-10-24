import React, {Component} from "react";
import {Button, Col, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import Commons from "./commons";
import config from "../config";
import FetchResponses from "./FetchResponses";
import Auth from "../models/Auth";


class ChangePassword extends Component{
  constructor(props){
    super(props);

    this.state = {
      display: false
    };

    this.setDisplay = this.setDisplay.bind(this);
  }

  setDisplay(){
    this.setState({
      display: !this.state.display
    });
  }

  static successResponse(json_data){
    const response = JSON.stringify(json_data);
    console.info("Response success", response);
    alert(json_data.detail);
    Auth.logoutUser(json_data);
  }

  static handleSubmit(event) {
    event.preventDefault();
    const data = Commons.formDataToObject(new FormData(event.target));
    console.log(data);

    fetch(config.change_pass, {
      method: "POST",
      body: JSON.stringify(data),
      headers: config.headers_auth})
      .then(FetchResponses.processResponse)
      .then(ChangePassword.successResponse)
      .catch(FetchResponses.errorResponse)
  };

  formChangePassword() {
    if (!this.state.display){
      return
    }
    return (
      <form onSubmit={ChangePassword.handleSubmit}>
        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            name={"new_password1"}
            type="password"
            autoComplete={"off"}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            name={"new_password2"}
            type="password"
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

  changePassword() {
    return (
      <Col xs={4} md={4}>
        <Button
          onClick={this.setDisplay}
          block
          bsStyle="primary"
          bsSize="large">
          Password
        </Button>
        {this.formChangePassword()}
      </Col>
    );
  }

  render() {
    return this.changePassword();
  }

}

export default ChangePassword;
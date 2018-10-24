import React, { Component } from 'react'
import {Col, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import Commons from "./commons";
import config from "../config";
import FetchResponses from "./FetchResponses";


class ResetPassword extends Component {
  constructor(props){
    super(props);
    this.state = {
      uid: props.match.params.uid,
      token: props.match.params.token,
      new_password1: "",
      new_password2: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static successResponse(json_data){
    const response = JSON.stringify(json_data);
    console.info("Response success", response);
    alert(json_data.detail);
    window.location.replace("/");
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = Commons.formDataToObject(new FormData(event.target));
    console.log(data);

    data.uid = this.state.uid;
    data.token = this.state.token;

    fetch(config.confirm_reset_pass, {
      method: "POST",
      body: JSON.stringify(data),
      headers: config.headers_base})
      .then(FetchResponses.processResponse)
      .then(ResetPassword.successResponse)
      .catch(FetchResponses.errorResponse)
  };

  render() {
    return (
      <Col xs={8} md={8}>
        <form onSubmit={this.handleSubmit}>
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
      </Col>
    );
  }
}

export default ResetPassword;
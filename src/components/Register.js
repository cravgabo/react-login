import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel, Col, Panel, Checkbox} from "react-bootstrap";
import "../styles/Login.css";
import config from "../config";
import FetchResponses from "./FetchResponses";
import Commons from "./commons";
import App from "./App";
import Auth from "../models/Auth";


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      fiscal_number_type: "",
      fiscal_number: "",
      person_type: "",
      phone: "",
      password: "",
      is_staff: false,
      country: "",
      state: "",
      city: "",
      street: ""
    };

    Register.handleSubmit = Register.handleSubmit.bind(this);
  };


  static successResponse(json_data){
    const user_response = JSON.stringify(json_data);
    console.info("Response success", user_response);
    alert("User created succesfully, please Log in");
    Auth.setLastUserData(json_data);
    App.showLogin();
  }

  static handleSubmit(event) {
    event.preventDefault();
    const data = Commons.formDataToObject(new FormData(event.target));
    console.log(data);

    data.address = {
      country: data.country,
      state: data.state,
      city: data.city,
      street: data.street,
    };
    data.is_staff = data.is_staff === "on";

    // Remove unused fields
    delete data.country;
    delete data.state;
    delete data.city;
    delete data.street;

    fetch(config.add_user, {
      method: "POST",
      body: JSON.stringify(data),
      headers: config.headers_add_user})
      .then(FetchResponses.processResponse)
      .then(Register.successResponse)
      .catch(FetchResponses.errorResponse)
  };

  render() {
    return (
      <Col xs={4} md={4}>
        <form onSubmit={Register.handleSubmit}>
          <FormGroup>
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              name={"username"}
              
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="email"
              name={"email"}

            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              name={"first_name"}
              type="text"

            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              name={"last_name"}
              type="text"

            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Fiscal Number Type</ControlLabel>
            <FormControl
              name={"fiscal_number_type"}
              componentClass="select"
              >
              <option value="CC">Cédula de ciudadanía</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Fiscal Number</ControlLabel>
            <FormControl
              name={"fiscal_number"}
              type="text"

            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Phone</ControlLabel>
            <FormControl
              name={"phone"}
              type="text"

            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Person Type</ControlLabel>
            <FormControl
              name={"person_type"}
              componentClass="select"
              >
              <option value="N">Natural</option>
              <option value="J">Jurídico</option>
            </FormControl>
          </FormGroup>
          <Panel>
            <Panel.Heading>Address</Panel.Heading>
            <Panel.Body>
              <FormGroup>
                <ControlLabel>Country</ControlLabel>
                <FormControl
                  name={"country"}
                  type="text"

                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>State</ControlLabel>
                <FormControl
                  name={"state"}
                  type="text"

                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>City</ControlLabel>
                <FormControl
                  name={"city"}
                  type="text"

                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Street</ControlLabel>
                <FormControl
                  name={"street"}
                  type="text"

                />
              </FormGroup>
            </Panel.Body>
          </Panel>
          <FormGroup>
            <Checkbox
              name={"is_staff"}
              >Is staff</Checkbox>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              name={"password"}
              type="password"
              autoComplete={"off"}
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            type="submit">
            Login
          </Button>
        </form>
      </Col>
    );
  };
}
export default Register;
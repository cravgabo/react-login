import React, { Component } from 'react'
import { Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'


class Reset extends Component {
  constructor(props){
    super(props);
    this.state = {
      uid: props.match.params.uid,
      token: props.match.params.token
    }
  }

  render() {
    return (
      <Col xs={8} md={8}>
        <form>
          <FormGroup>
            <ControlLabel>Uid</ControlLabel>
            <FormControl.Static>{this.state.uid}</FormControl.Static>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Token</ControlLabel>
            <FormControl.Static>{this.state.token}</FormControl.Static>
          </FormGroup>
        </form>
      </Col>
    );
  }
}

export default Reset;
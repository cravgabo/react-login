import React, { Component } from 'react'
import { Col, Image } from 'react-bootstrap'
import logo from '../img/logo.svg'


class StartPage extends Component {
  render() {
    return (
      <Col xs={8} md={8}>
        <Image src={logo}/>
      </Col>
    );
  }
}

export default StartPage;
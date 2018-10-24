import React, { Component } from 'react';
import { Col, Nav, Navbar, NavItem} from 'react-bootstrap';
import App from "./App";
import Auth from "../models/Auth";
import Commons from "./commons";


class NavBar extends Component{
  constructor(props){
    super(props);
    const user_data = Auth.getLastUserData();
    let name = "";
    if(user_data){
      const user_obj = JSON.parse(user_data);
      name = user_obj.first_name + " " + user_obj.last_name;
    }
    this.state = {
      name: name
    };
  }

  authenticatedUser() {
    return(
      <Col xs={12} md={12}>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/user/">{this.state.name}</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem onClick={Commons.logOut}>
                Logout
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    );
  }


  unauthenticatedUser() {
    return (
      <Col xs={12} md={12}>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Alkomprar</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem onClick={App.hideLogin}>
                Register
              </NavItem>
              <NavItem onClick={App.showLogin}>
                Login
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    );
  }

  render(){
    if(Auth.isAuthenticated()) {
      return this.authenticatedUser();
    }
    return this.unauthenticatedUser();
  }
}


export default NavBar;
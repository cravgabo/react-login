import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import App from './components/App';
import ResetPassword from "./components/ResetPassword";
import User from "./components/User";


class BasicRoute extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={App}/>
          <Route path="/user/" exact component={User}/>
          <Route path="/reset/:uid&:token" component={ResetPassword}/>
        </div>
      </BrowserRouter>
    );
  };
}

export default BasicRoute

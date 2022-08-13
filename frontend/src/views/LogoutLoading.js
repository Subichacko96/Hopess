import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';
const ConfigFile = require('../config');

//const URL = require("../../ApiUrl");

export default class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  logout() {
    Cookie.remove(ConfigFile.COOKIE_ADMIN);
    Cookie.remove(ConfigFile.COOKIE_TOKEN);
    this.setState({
      auth: false,
    });
    window.location.reload(false);
  }

  componentDidMount() {
    this.logout();
  }

  render() {
    return (
      <>
        <Redirect to='login' />;
      </>
    );
  }
}

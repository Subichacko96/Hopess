import React, { Component } from "react";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Cookie from "js-cookie";
const ConfigFile = require("./config");

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  componentDidMount() {
    this.authListener();
  }
  load = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/admin"
            render={
              this.state.user
                ? (props) => <AdminLayout {...props} />
                : (props) => <AuthLayout {...props} />
            }
          />
          <Route
            path="/auth"
            render={
              this.state.user
                ? (props) => <AdminLayout {...props} />
                : (props) => <AuthLayout {...props} />
            }
          />
          <Redirect from="/" to="/auth" />

        </Switch>
      </BrowserRouter>
    );
  };

  authListener() {
    const token = Cookie.get(ConfigFile.COOKIE_TOKEN)
      ? Cookie.get(ConfigFile.COOKIE_TOKEN)
      : null;
    const userData = Cookie.get(ConfigFile.COOKIE_ADMIN)
      ? Cookie.get(ConfigFile.COOKIE_ADMIN)
      : null;

    this.setState({
      token: token,
      user: userData,
    });
    // console.log(userData);
    // console.log(token);
  }
  render() {
    return this.load();
  }
}

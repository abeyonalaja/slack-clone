import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";
import { connect } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import { authenticate, unauthenticate } from "./actions/session";
import MatchAuthenticated from "./components/MatchAuthenticated";
import RedirectAuthenticated from "./components/RedirectAuthenticated";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    console.log("Token is >> ", token);

    if (token) {
      this.props.authenticate();
    } else {
      this.props.unauthenticate();
    }
  }

  render() {
    const { isAuthenticated, willAuthenticate } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };

    console.log("Auth Props == ", authProps);
    return (
      <Router>
        <div style={{ display: "flex", flex: "1" }}>
          <Switch>
            <MatchAuthenticated
              exact
              path="/"
              component={Home}
              {...authProps}
            />
            <RedirectAuthenticated
              exact
              path="/login"
              component={Login}
              {...authProps}
            />
            <Route exact path="/signup" component={Signup} {...authProps} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate
  }),
  { authenticate, unauthenticate }
)(App);

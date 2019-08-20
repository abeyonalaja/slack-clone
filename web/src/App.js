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
import { authenticate } from "./actions/session";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    console.log("Token is >> ", token);

    if (token) {
      console.log("Got token >>> ", token);
      this.props.authenticate();
    }
  }
  render() {
    return (
      <Router>
        <div style={{ display: "flex", flex: "1" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(
  null,
  { authenticate }
)(App);

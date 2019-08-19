import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";
import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";

const App = ({ history, store }) => (
  <Router>
    <div style={{ display: "flex", flex: "1" }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;

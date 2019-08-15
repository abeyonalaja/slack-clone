import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";

const App = ({ history, store }) => (
  // <Provider store={store}>
  //   <ConnectedRouter history={history}>
  //     <Switch>
  //       <Route path="/" component={Home} />
  //     </Switch>
  //   </ConnectedRouter>
  // </Provider>

  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

export default App;

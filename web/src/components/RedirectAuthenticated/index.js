import React from "react";
import { Route, Redirect } from "react-router-dom";

const RedirectAuthenticated = ({
  pattern,
  exactly,
  isAuthenticated,
  willAuthenticate,
  component: Component
}) => (
  <Route
    exactly={exactly}
    pattern={pattern}
    render={props => {
      if (isAuthenticated) {
        return <Redirect to={{ pathname: "/" }} />;
      }
      if (willAuthenticate) {
        return null;
      }
      if (!willAuthenticate && !isAuthenticated) {
        return <Component {...props} />;
      }
      return null;
    }}
  />
);

export default RedirectAuthenticated;

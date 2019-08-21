import React from "react";
import { Route, Redirect } from "react-router-dom";

const MatchAuthenticated = ({
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
        console.log("IS AUTHED", props);
        return <Component {...props} />;
      }
      if (willAuthenticate) {
        return null;
      }
      if (!willAuthenticate && !isAuthenticated) {
        console.log(
          "NOT AUTHED",
          ` isAuthenticated ${isAuthenticated} willAuthenticate: ${willAuthenticate}`
        );
        return <Redirect to={{ pathname: "/login" }} />;
      }
      return null;
    }}
  />
);

export default MatchAuthenticated;

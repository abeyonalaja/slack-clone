import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signup } from "../../actions/session";
import SignupForm from "../../components/SignupForm";
import Navbar from "../../components/Navbar";

class SignUp extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleSignUp = data => {
    this.props.signup(data, this.props.history);
  };

  render() {
    console.log("Sign up", this.props);
    return (
      <div style={{ flex: "1" }}>
        <Navbar />
        <SignupForm onSubmit={this.handleSignUp} />
      </div>
    );
  }
}

// SignUp.propTypes = {
//   signup: PropTypes.func
// };

export default connect(
  null,
  { signup }
)(SignUp);

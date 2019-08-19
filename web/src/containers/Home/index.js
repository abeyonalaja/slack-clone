import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/session";
import Navbar from "../../components/Navbar";
import PropTypes from "prop-types";

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleLogout = () => this.props.logout(this.context.router);

  render() {
    const { currentUser, isAuthenticated } = this.props;

    return (
      <div style={{ flex: "1" }}>
        <Navbar />
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
        {isAuthenticated && (
          <div>
            <span>{currentUser.username}</span>
            <button type="button" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  logout: PropTypes.func,
  currentUser: PropTypes.object,
  isAuthenticated: PropTypes.bool
};

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser
  }),
  { logout }
)(Home);

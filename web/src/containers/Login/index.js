import React, { Component} from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session';
import LoginForm from '../../components/LoginForm';
import Navbar from '../../components/Navbar';
import PropTypes from 'prop-types';


class Login extends Component {
    static contextTypes = {
        router: PropTypes.object,
    };


    handleLogin = data => this.props.login(data, this.context.router);

    render() {
        return (
            <div style={{ flex: '1' }}>
                <Navbar />
                <LoginForm onSubmit={this.handleLogin} />
            </div>
        );
    }
}

Login.Proptypes = {
    login: () => void
};

export default connect(null, { login })(Login);
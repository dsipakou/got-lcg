import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class LoginForm extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  usernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  passwordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  doLogin() {
    fetch('http://localhost:8000/auth/', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          cookies.set('token', json.token);
        });
      }
    }).catch((error) => { throw error; });
  }

  render() {
    return (
      <div>
        <input id="username" onChange={this.usernameChange} />
        <input id="password" type="password" onChange={this.passwordChange} />
        <button id="login_btn" onClick={this.doLogin}>Login</button>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;

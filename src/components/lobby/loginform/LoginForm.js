import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({login}) => {
  return (
    <div>
      <input id='username' />
      <button id='login_btn' onClick={login}>Login</button>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func
}

export default LoginForm;

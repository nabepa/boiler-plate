import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';

const LoginPage = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email,
      password,
    };

    dispatch(loginUser(body)).then((res) => {
      if (res.payload.loginSuccess) {
        props.history.push('/');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type='email' value={email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type='password' value={password} onChange={onPasswordHandler} />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

export default withRouter(LoginPage);

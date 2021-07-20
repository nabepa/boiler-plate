import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

const RegisterPage = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onReEnterPasswordHandler = (event) => {
    setReEnterPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== reEnterPassword) {
      return alert('Passwords must match');
    }

    let body = {
      email,
      name,
      password,
    };

    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        props.history.push('/login');
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
        <label>Name</label>
        <input type='text' value={name} onChange={onNameHandler} />
        <label>Password</label>
        <input type='password' value={password} onChange={onPasswordHandler} />
        <label>Re-enter password</label>
        <input
          type='password'
          value={reEnterPassword}
          onChange={onReEnterPasswordHandler}
        />
        <br />
        <button>Create your Account</button>
      </form>
    </div>
  );
};

export default RegisterPage;

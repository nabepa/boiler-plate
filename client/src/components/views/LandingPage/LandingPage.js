import React from 'react';
import axios from 'axios';

const LandingPage = (props) => {
  const onClickHandler = () => {
    axios.get('/api/logout').then((res) => {
      if (res.data.success) {
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
      <h2>Landing Page</h2>
      <button onClick={onClickHandler}>Log out</button>
    </div>
  );
};

export default LandingPage;

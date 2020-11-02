import React from 'react';

const Time: React.FC = () => {
  let date = () =>
    new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div>
      <h1 style={{ color: 'white', fontSize: '8vh' }}>
        {date()}
        <br />{' '}
        <span style={{ fontSize: '2vh' }}> Καλώς ήρθες επισκέπτη/τρια </span>
      </h1>
    </div>
  );
};

export default Time;

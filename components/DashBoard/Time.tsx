import React from 'react';
import { useMeQuery } from '../../src/generated/graphql';

const Time: React.FC = () => {
  const { data, loading } = useMeQuery();

  let body: any = null;

  if (loading) {
    body = (
      <span style={{ fontSize: '2vh' }}> Καλώς ήρθες επισκέπτη/τρια </span>
    );
  } else if (data && data.me?.username) {
    body = (
      <span style={{ fontSize: '2vh' }}>Καλώς ήρθες {data.me?.username}</span>
    );
  } else {
    body = (
      <span style={{ fontSize: '2vh' }}> Καλώς ήρθες επισκέπτη/τρια </span>
    );
  }

  let date = () =>
    new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div>
      <h1 style={{ color: 'white', fontSize: '8vh' }}>
        {date()}
        <br /> {body}
      </h1>
    </div>
  );
};

export default Time;

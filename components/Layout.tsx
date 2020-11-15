import React from 'react';
import Copyright from '../src/Copyright';

const Layout = (props: any) => {
  const { children } = props;
  return (
    <>
      {children}

      <Copyright />
    </>
  );
};

export default Layout;

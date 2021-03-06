import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { useMeQuery } from '../src/generated/graphql';
import LogoutMenu from './DashBoard/LogoutMenu';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: '#ec407a',
  },
  appBarTransparent: {
    backgroundColor: 'transparent',
    transition: '0.4s',
    boxShadow: 'none',
  },
  appBarSolid: {
    backgroundColor: '#061220',
    transition: '0.4s',
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  const { data, loading } = useMeQuery();

  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = <LogoutMenu />;
  } else {
    body = (
      <div>
        <Button
          style={{
            color: '#ec407a',
            fontWeight: 'bold',
          }}
        >
          <Link href='/login'>
            <a style={{ textDecoration: 'none', color: '#ec407a' }}>ΣΥΝΔΕΣΗ</a>
          </Link>
        </Button>

        <Button
          style={{
            color: '#ec407a',
            fontWeight: 'bold',
          }}
        >
          <Link href='/register'>
            <a style={{ textDecoration: 'none', color: '#ec407a' }}>ΕΓΓΡΑΦΗ</a>
          </Link>
        </Button>
      </div>
    );
  }

  const [navBackground, setNavBackground] = useState('appBarTransparent');
  const navRef: any = React.useRef();

  navRef.current = navBackground;

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 400;
      if (show) {
        setNavBackground('appBarSolid');
      } else {
        setNavBackground('appBarTransparent');
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes[navRef.current]}>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Link href='/'>
              <a style={{ textDecoration: 'none', color: '#ec407a' }}>
                eventhub_
              </a>
            </Link>
          </Typography>
          {body}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default App;

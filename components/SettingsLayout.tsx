import React, { CSSProperties } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SettingsIcon from '@material-ui/icons/Settings';
import LockIcon from '@material-ui/icons/Lock';
import { useMeQuery } from '../src/generated/graphql';
import { useRouter } from 'next/router';
import Head from 'next/head';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Link from 'next/link';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '0 auto',
      width: '95%',
      marginTop: '5vh',
      marginBottom: '2vh',
    },
    paper: {
      minHeight: '75vh',
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

const globalStyle = `
body {
  background-color: #ffc107;
  background-size: cover;
}
`;

const mainPage: CSSProperties = {
  textTransform: 'none',
  color: '#eeeeee',
  backgroundColor: 'green',
  fontWeight: 'bold',
};

const SettingsLayout = (props: any) => {
  const classes = useStyles();
  const router = useRouter();

  const [value, setValue] = React.useState(0);
  const { data } = useMeQuery();

  const { children } = props;
  return (
    <div className={classes.root}>
      <Head>
        <style>{globalStyle}</style>
      </Head>
      <div style={{ marginBottom: '-3vh', marginTop: '-2vh' }}>
        <h3>Ρυθμίσεις λογαριασμού</h3>
        <Link href='/'>
          <Button variant='contained' style={mainPage}>
            Αρχική
          </Button>
        </Link>
      </div>
      <Paper elevation={3}>
        <BottomNavigation
          showLabels
          className={classes.root}
          //   value={value}
          //   onChange={(event, newValue) => {
          //     setValue(newValue);
          //   }}
        >
          <BottomNavigationAction
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            label='Ρυθμίσεις'
            icon={<SettingsIcon />}
            onClick={() => {
              router.push({
                pathname: '/user-settings/[id]',
                query: { id: data?.me?.id },
              });
            }}
          />

          <BottomNavigationAction
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            label='Προφίλ'
            icon={<AccountCircle />}
            onClick={() => {
              router.push({
                pathname: '/user-settings/profile/[id]',
                query: { id: data?.me?.id },
              });
            }}
          />

          <BottomNavigationAction
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            label='Ασφάλεια'
            icon={<LockIcon />}
            onClick={() => {
              router.push({
                pathname: '/user-settings/security/[id]',
                query: { id: data?.me?.id },
              });
            }}
          />
        </BottomNavigation>
      </Paper>
      <Paper elevation={1} variant='outlined' className={classes.paper}>
        {children}
      </Paper>
    </div>
  );
};

export default SettingsLayout;

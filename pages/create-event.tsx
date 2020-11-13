import React from 'react';
import Head from 'next/head';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { isAuth } from '../src/utils/isAuth';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

interface createProps {}

const globalStyle = `
body {
  background-color: #061220;
  background-size: cover;
}
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: '0 auto',
      width: '95%',
      marginTop: '5vh',
    },
    formRoot: {
      flexGrow: 1,
      margin: '0 auto',
      width: '55%',
      marginTop: '5vh',
    },
    title: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#d32f2f',
    },
    paper: {
      minHeight: '70vh',
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(4),
      color: theme.palette.error.main,
    },
    button: {
      textTransform: 'none',
      fontSize: '18px',
    },
    submit: {
      margin: theme.spacing(3, 0, 3),
    },
  })
);

const CreateEvent: React.FC<createProps> = () => {
  isAuth();

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Head>
        <style>{globalStyle}</style>
      </Head>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2 className={classes.title}>Δημιουργία Event</h2>
          <Paper elevation={3} className={classes.paper}>
            <Box mt={20}>
              <Grid item xs={12} className={classes.formRoot}>
                <Link href='create-single-event'>
                  <Button
                    variant='contained'
                    className={classes.button}
                    style={{ backgroundColor: '#43a047' }}
                  >
                    Μονό
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} className={classes.formRoot}>
                <Button
                  variant='contained'
                  className={classes.button}
                  style={{ backgroundColor: '#fdd835' }}
                  disabled
                >
                  Festival
                </Button>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateEvent;

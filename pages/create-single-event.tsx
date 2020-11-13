import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import { isAuth } from '../src/utils/isAuth';

interface Props {}

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
      color: '#4caf50',
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
    submit: {
      margin: theme.spacing(3, 0, 3),
    },
  })
);

const Single: React.FC<Props> = () => {
  const classes = useStyles();
  isAuth();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2 className={classes.title}>Δημιουργία Event</h2>
          <Paper elevation={3} className={classes.paper}>
            <Grid item xs={12} className={classes.formRoot}>
              <TextField
                id='email'
                label='Email'
                name='email'
                autoComplete='email'
                fullWidth
                variant='outlined'
              />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Single;

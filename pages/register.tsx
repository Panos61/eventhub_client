import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    backgroundColor: theme.palette.background.default,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(4),
    color: theme.palette.error.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}));

const Register = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Box mt={25}>
        <Container maxWidth='sm'>
          <Card className={classes.root} elevation={5}>
            <CardContent>
              <h2 style={{ fontFamily: 'sans-serif', color: 'ff9800' }}>
                Register
              </h2>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='email'
                      label='Email'
                      name='email'
                      autoComplete='email'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='email'
                      label='Username'
                      name='username'
                      autoComplete='username'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      name='password'
                      label='Κωδικός'
                      type='password'
                      id='password'
                      autoComplete='current-password'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      name='password'
                      label='Επιβεβαίωση κωδικού'
                      type='password'
                      id='password'
                      autoComplete='confirm-password'
                    />
                  </Grid>
                </Grid>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  className={classes.submit}
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  ΕΓΓΡΑΦΗ
                </Button>
                <Grid
                  container
                  justify='flex-end'
                  style={{ textAlign: 'center' }}
                >
                  <Grid item xs={12}>
                    <Link href='#' variant='body2'>
                      Έχετε ήδη λογαριασμό; Συνδεθείτε!
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Register;

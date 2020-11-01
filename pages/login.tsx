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
import Link from 'next/link';
import Head from 'next/head';
import Fab from '@material-ui/core/Fab';
import { Form, Formik } from 'formik';

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

const globalStyle = `
body {
  background-color: #491e07;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23cc0000' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23aa0000' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23d6002b' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23b10022' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d9004b' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23b2003d' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23d3006c' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23ac0057' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23c4008c' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%239e0071' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23aa00aa' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23880088' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
}
`;

interface Values {
  email: string;
  username: string;
  password: string;
}

interface Props {
  onSubmit: (values: Values) => void;
}

const Login: React.FC<Props> = ({ onSubmit }) => {
  const classes = useStyles();

  //const register;

  return (
    <>
      <Head>
        <style>{globalStyle}</style>
      </Head>
      <CssBaseline />

      <Box mt={5}>
        <Fab
          style={{ textTransform: 'none' }}
          variant='extended'
          size='small'
          color='secondary'
        >
          <Link href='/'>
            <span style={{ textDecoration: 'none' }}>Αρχική</span>
          </Link>
        </Fab>
      </Box>
      <Box mt={10}>
        <Container maxWidth='sm'>
          <Card className={classes.root} elevation={5}>
            <CardContent>
              <h2 style={{ fontFamily: 'sans-serif', color: 'black' }}>
                Σύνδεση στο <span style={{ color: ' #FF6F1D' }}>eventhub_</span>
              </h2>

              <Formik
                initialValues={{
                  email: '',
                  username: '',
                  password: '',
                }}
                onSubmit={(values) => {
                  console.log(values);
                  onSubmit(values);
                }}
              >
                {({ values, handleChange }) => (
                  <Form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          value={values.email}
                          variant='outlined'
                          required
                          fullWidth
                          onChange={handleChange}
                          id='email'
                          label='Email'
                          name='email'
                          autoComplete='email'
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          value={values.username}
                          variant='outlined'
                          required
                          fullWidth
                          onChange={handleChange}
                          id='username'
                          label='Username'
                          name='username'
                          autoComplete='username'
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          value={values.password}
                          variant='outlined'
                          onChange={handleChange}
                          required
                          fullWidth
                          name='password'
                          label='Κωδικός'
                          type='password'
                          id='password'
                          autoComplete='current-password'
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
                      Συνδεση
                    </Button>
                    <Grid
                      container
                      justify='flex-end'
                      style={{ textAlign: 'center' }}
                    >
                      <Grid item xs={12}>
                        <Link href='/login'>
                          Έχετε ήδη λογαριασμό; Συνδεθείτε!
                        </Link>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
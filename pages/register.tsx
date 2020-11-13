import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Head from 'next/head';
import Box from '@material-ui/core/Box';
import { useRouter } from 'next/router';
import {
  MeDocument,
  MeQuery,
  useRegisterMutation,
} from '../src/generated/graphql';
import { setAccessToken } from '../src/utils/accessToken';
import { toErrorMap } from '../src/utils/toErrorMap';
import { InputField } from './utils/InputField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fab from '@material-ui/core/Fab';

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

const Register: React.FC = () => {
  const classes = useStyles();

  const router = useRouter();
  const [register] = useRegisterMutation();
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
                Εγγραφή στο <span style={{ color: ' #FF6F1D' }}>eventhub_</span>
              </h2>

              <Formik
                initialValues={{
                  username: '',
                  email: '',
                  password: '',
                  // confirmPassword: '',
                }}
                validationSchema={Yup.object().shape({
                  password: Yup.string().min(
                    6,
                    'Ο κωδικός πρέπει να περιέχει τουλάχιστον 6 χαρακτήρες!'
                  ),

                  // confirmPassword: Yup.string()
                  //   .oneOf([Yup.ref('password'), null], 'Passwords must match')
                  //   .required('Confirm Password is required'),
                })}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  setTimeout(() => {
                    setSubmitting(false);
                  }, 200);
                  const response = await register({
                    variables: { options: values },

                    update: (cache, { data }) => {
                      cache.writeQuery<MeQuery | any>({
                        query: MeDocument,
                        data: {
                          __typename: 'Query',
                          me: data?.register.user,
                        },
                      });
                    },
                  });

                  if (response.data?.register.errors) {
                    setTimeout(() => {
                      setSubmitting(false);
                    }, 500);
                    setErrors(toErrorMap(response.data.register.errors));
                  } else if (response.data?.register.user) {
                    if (typeof router.query.next === 'string') {
                      router.push(router.query.next);
                    } else {
                      // worked
                      setAccessToken(response.data.register.accessToken);
                      router.push('/');
                    }
                  }
                }}
                render={({ errors, touched, isSubmitting, submitForm }) => (
                  <Form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Field
                          name='username'
                          label='Username'
                          component={InputField}
                          className={
                            'form-control' +
                            (errors.username && touched.username
                              ? ' is-invalid'
                              : '')
                          }
                        />
                        {/* <ErrorMessage
                          name='firstName'
                          component='div'
                          className='invalid-feedback'
                        /> */}
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          label='Email'
                          name='email'
                          component={InputField}
                          type='text'
                          className={
                            'form-control' +
                            (errors.email && touched.email ? ' is-invalid' : '')
                          }
                        />
                        {/* <ErrorMessage
                          name='email'
                          component='div'
                          className='invalid-feedback'
                        /> */}
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          label='Κωδικός'
                          name='password'
                          type='password'
                          component={InputField}
                          className={
                            'form-control' +
                            (errors.password && touched.password
                              ? ' is-invalid'
                              : '')
                          }
                        />
                        {/* <ErrorMessage
                          name='password'
                          component='div'
                          className='invalid-feedback'
                        /> */}
                      </Grid>

                      {/* <Grid item xs={12}>
                        <Field
                          label='Κωδικός'
                          name='password'
                          type='password'
                          component={InputField}
                          className={
                            'form-control' +
                            (errors.confirmPassword && touched.confirmPassword
                              ? ' is-invalid'
                              : '')
                          }
                        />
                        <ErrorMessage
                          name='confirmPassword'
                          component='div'
                          className='invalid-feedback'
                        />
                      </Grid> */}
                    </Grid>
                    {isSubmitting && <LinearProgress />}
                    <br />

                    <Box mt={2}>
                      <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        style={{
                          backgroundColor: '#f44336',
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                        disabled={isSubmitting}
                        onClick={submitForm}
                      >
                        Εγγραφη
                      </Button>
                    </Box>
                    <Grid
                      container
                      justify='flex-end'
                      style={{ textAlign: 'center', marginTop: '15px' }}
                    >
                      <Grid item xs={12}>
                        <Link href='/login'>
                          Έχετε ήδη λογαριασμό; Συνδεθείτε!
                        </Link>
                      </Grid>
                    </Grid>
                    <Button type='reset'>ΕΠΑΝΑΦΟΡΑ</Button>
                  </Form>
                )}
              />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Register;

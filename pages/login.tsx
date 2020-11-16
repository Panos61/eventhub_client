import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Head from 'next/head';
import Fab from '@material-ui/core/Fab';
import { Form, Formik, Field } from 'formik';
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
} from '../src/generated/graphql';
import { toErrorMap } from '../src/utils/toErrorMap';
import { useRouter } from 'next/router';
import { setAccessToken } from '../src/utils/accessToken';
import { InputField } from './utils/InputField';
import LinearProgress from '@material-ui/core/LinearProgress';

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
  background-color: #FF7700;
}
`;

interface Values {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (values: Values) => void;
}

const Login: React.FC<Props> = ({}) => {
  const classes = useStyles();

  const router = useRouter();
  const [login] = useLoginMutation();

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
                  password: '',
                }}
                validate={(values) => {
                  const errors: Partial<Values> = {};
                  if (!values.email) {
                    errors.email = 'Υποχρεωτικό πεδίο!';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = 'Μη έγκυρη μορφή email!';
                  }
                  if (!values.password) {
                    errors.password = 'Υποχρεωτικό πεδίο!';
                  }
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  setTimeout(() => {
                    setSubmitting(false);
                  }, 200);
                  const response = await login({
                    variables: values,

                    update: (cache, { data }) => {
                      cache.writeQuery<MeQuery | any>({
                        query: MeDocument,
                        data: {
                          __typename: 'Query',
                          me: data?.login.user,
                        },
                      });
                    },
                  });

                  if (response.data?.login.errors) {
                    setTimeout(() => {
                      setSubmitting(false);
                    }, 500);
                    setErrors(toErrorMap(response.data.login.errors));
                  } else if (response.data?.login.user) {
                    if (typeof router.query.next === 'string') {
                      router.push(router.query.next);
                    } else {
                      // worked
                      setAccessToken(response.data.login.accessToken);
                      router.push('/');
                    }
                  }
                }}
              >
                {({ submitForm, isSubmitting }) => (
                  <Form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Field
                          component={InputField}
                          name='email'
                          type='email'
                          label='Email'
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          component={InputField}
                          type='password'
                          label='Κωδικός'
                          name='password'
                        />
                      </Grid>
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
                        Συνδεση
                      </Button>
                    </Box>
                    <Grid
                      container
                      justify='flex-end'
                      style={{ textAlign: 'center', marginTop: '15px' }}
                    >
                      <Grid item xs={12}>
                        <Link href='/register'>
                          Δεν έχετε λογαριασμό; Εγγραφείτε!
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

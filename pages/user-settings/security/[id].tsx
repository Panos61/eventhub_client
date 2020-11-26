import React from 'react';
import SettingsLayout from '../../../components/SettingsLayout';
import { setAccessToken } from '../../../src/utils/accessToken';
import Button from '@material-ui/core/Button';
import {
  // MeDocument,
  // MeQuery,
  useDeleteAccountMutation,
  useChangePasswordMutation,
  useMeQuery,
} from '../../../src/generated/graphql';
import { useRouter } from 'next/router';
import { Box, Container, Divider, makeStyles } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import Grid from '@material-ui/core/Grid/Grid';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import { InputField } from '../../utils/InputField';
import Link from 'next/link';
import { toErrorMap } from '../../../src/utils/toErrorMap';
import { validateConfirmPassword } from '../../utils/confirmPassword';

interface Values {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Props {
  onSubmit: (values: Values) => void;
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    color: theme.palette.error.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}));

const UserSecurity: React.FC<Props> = () => {
  const router = useRouter();
  const classes = useStyles();

  const [deleteAccount, { client, error }] = useDeleteAccountMutation();
  const { data } = useMeQuery();
  const [changePassword] = useChangePasswordMutation();
  return (
    <SettingsLayout>
      <h2 style={{ textDecoration: 'underline' }}>Ασφάλεια λογαριασμού</h2>

      <Divider />
      <h4>Αλλαγή κωδικού</h4>
      <Container maxWidth='sm'>
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validate={(values) => {
            const errors: Partial<Values> = {};
            if (!values.oldPassword) {
              errors.oldPassword = 'Υποχρεωτικό πεδίο!';
            }
            if (!values.newPassword) {
              errors.newPassword = 'Υποχρεωτικό πεδίο';
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            setTimeout(() => {
              setSubmitting(false);
            }, 200);
            const response: string | any = await changePassword({
              variables: values,
            });

            // if (response) {
            //   setTimeout(() => {
            //     setSubmitting(false);
            //   }, 500);
            //   setErrors(toErrorMap(response.errors));
            // } else if (response) {
            //   if (typeof router.query.next === 'string') {
            //     router.push(router.query.next);
            //   } else {
            //     // worked
            //     setAccessToken(response);
            //     router.push('/');
            //   }
            // }
          }}
        >
          {({ submitForm, isSubmitting, values }) => (
            <Form className={classes.form} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <Field
                    component={InputField}
                    name='oldPassword'
                    type='password'
                    label='Παλιός κωδικός'
                  />
                </Grid>

                <Grid item xs={12} lg={12}>
                  <Field
                    component={InputField}
                    type='password'
                    label='Νέος κωδικός'
                    name='newPassword'
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Field
                    component={InputField}
                    type='password'
                    label='Επιβεβαίωση κωδικού'
                    name='confirmPassword'
                    validate={(value: string) =>
                      validateConfirmPassword(values.newPassword, value)
                    }
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
                    backgroundColor: 'green',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'none',
                  }}
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Αλλαγή κωδικού
                </Button>
              </Box>
              <Grid
                container
                justify='flex-end'
                style={{ textAlign: 'center', marginTop: '15px' }}
              >
                <Grid item xs={12}>
                  <Link href='/register'>Ξέχασα τον κωδικό μου</Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
      <br />
      <Divider />
      <Box mt={10}>
        <h4 style={{ color: 'red' }}>Διαγραφή λογαριασμού</h4>
        <p>
          Επιβεβαιωθείτε ότι είστε σίγουροι. Δεν θα μπορείτε να αναιρέσετε την
          επιλογή σας.
        </p>
        <Button
          style={{
            textTransform: 'none',
            backgroundColor: 'red',
            color: 'white',
          }}
          variant='contained'
          onClick={async () => {
            await deleteAccount({
              variables: { id: data?.me?.id } as any,
            });

            console.log(data?.me?.id);
            setAccessToken('');
            await client.resetStore();

            if (!error) {
              router.push('/');
            } else {
              alert(error);
            }
          }}
        >
          Διαγραφή λογαριασμού
        </Button>
      </Box>
    </SettingsLayout>
  );
};

export default UserSecurity;
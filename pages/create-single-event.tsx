import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Button,
  LinearProgress,
  MenuItem,
  FormControlLabel,
} from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { TextField, Switch } from 'formik-material-ui';
import { TimePicker, DatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useCreateEventMutation } from '../src/generated/graphql';
import { useRouter } from 'next/router';
import Head from 'next/head';
import MuiTextField from '@material-ui/core/TextField';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import Box from '@material-ui/core/Box';
import { isAuth } from '../src/utils/isAuth';
import { validationSchema } from './utils/eventValidation';
import { cities } from './utils/cities';

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
      width: 'auto',
      marginTop: '5vh',
    },
    title: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#4caf50',
    },
    paper: {
      marginTop: '5vh',
      minHeight: '65vh',
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

// Select topic options
const options = [
  {
    value: 'music',
    label: 'Μουσική',
  },
  {
    value: 'sports',
    label: 'Αθλητισμός',
  },
  {
    value: 'entertainment',
    label: 'Διασκέδαση',
  },
  {
    value: 'cinema',
    label: 'Σινεμά',
  },
  {
    value: 'arts',
    label: 'Τέχνη',
  },
];

// Page global style
const globalStyle = `
  body {
    background-color: #c93006;
  }
`;

const SingleForm = () => {
  const classes = useStyles();

  const [createEvent] = useCreateEventMutation();
  const router = useRouter();

  // User must be logged in
  isAuth();

  return (
    <>
      <Head>
        <style>{globalStyle}</style>
      </Head>
      <Formik
        initialValues={{
          title: '',
          topic: '',
          description: '',

          date: new Date(),
          time: new Date(),

          city: '',
          address: '',

          adultsOnly: true,
          extraInfo: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);

          const { errors } = await createEvent({
            variables: { options: values } as any | string,
          });

          if (!errors) {
            router.push('/');
          } else {
            alert(JSON.stringify('Error'));
          }
        }}
      >
        {({ submitForm, isSubmitting, touched, errors, values }) => (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <h2 className={classes.title}>Δημιουργία Event</h2>
                  <Form>
                    <Paper elevation={3} className={classes.paper}>
                      <Grid item xs={12} lg={6} className={classes.formRoot}>
                        <p>(*) Υποχρεωτικό</p> <br />
                        <h3>1ο Βήμα - Περιγραφή</h3>
                        <Box mt={3}>
                          <Field
                            component={TextField}
                            name='title'
                            label='Τίτλος *'
                            color='secondary'
                            fullWidth
                            value={values.title}
                            error={touched.title && Boolean(errors.title)}
                            helperText={
                              (touched.title && errors.title) || (
                                <p>
                                  Εισάγετε τίτλο (από 5 μέχρι μέχρι 35
                                  χαρακτήρες!)
                                </p>
                              )
                            }
                          />
                        </Box>
                        <Box mt={5}>
                          <Field
                            component={TextField}
                            name='topic'
                            label='Είδος *'
                            color='secondary'
                            fullWidth
                            select
                            value={values.topic}
                            error={touched.topic && Boolean(errors.topic)}
                            helperText={
                              (touched.topic && errors.topic) || (
                                <p>Εισάγετε είδος</p>
                              )
                            }
                          >
                            {options.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </Box>
                        <Box mt={5}>
                          <Field
                            component={TextField}
                            multiline
                            fullWidth
                            label='Περιγραφή *'
                            name='description'
                            color='secondary'
                            variant='outlined'
                            value={values.description}
                            error={
                              touched.description && Boolean(errors.description)
                            }
                            helperText={
                              (touched.description && errors.description) || (
                                <p>
                                  Εισάγετε περιγραφή (από 10 μέχρι μέχρι 5000
                                  χαρακτήρες!)
                                </p>
                              )
                            }
                          />
                        </Box>
                      </Grid>
                    </Paper>
                    <Paper elevation={3} className={classes.paper}>
                      <Grid item xs={12} lg={6} className={classes.formRoot}>
                        <p>(*) Υποχρεωτικό</p> <br />
                        <h3>2ο Βήμα - Ημερομηνία/Ώρα</h3>
                        <Box mt={3}>
                          <Field
                            color='secondary'
                            component={TimePicker}
                            name='time'
                            label='Ώρα *'
                            fullWidth
                          />
                        </Box>
                        <Box mt={10}>
                          <Field
                            color='secondary'
                            component={DatePicker}
                            name='date'
                            label='Ημερομηνία *'
                            fullWidth
                          />
                        </Box>
                      </Grid>
                    </Paper>
                    <Paper elevation={3} className={classes.paper}>
                      <Grid item xs={12} lg={6} className={classes.formRoot}>
                        <p>(*) Υποχρεωτικό</p> <br />
                        <h3>3ο Βήμα - Τοποθεσία</h3>
                        {/* <Box mt={3}>
                          <Field
                            name='city'
                            component={Autocomplete}
                            options={cities}
                            fullWidth
                            renderInput={(
                              params: AutocompleteRenderInputParams
                            ) => (
                              <MuiTextField
                                {...params}
                                error={touched.city && Boolean(errors.city)}
                                helperText={
                                  (touched.city && errors.city) || (
                                    <p>
                                      Εισάγετε περιγραφή (από 10 μέχρι μέχρι
                                      5000 χαρακτήρες!)
                                    </p>
                                  )
                                }
                                label='Πόλη/ Περιφέρεια *'
                                variant='outlined'
                              />
                            )}
                          />
                        </Box> */}
                        <Box mt={3}>
                          <Field
                            component={TextField}
                            name='address'
                            label='Οδός/Διεύθυνση *'
                            color='secondary'
                            fullWidth
                            value={values.address}
                            error={touched.address && Boolean(errors.address)}
                            helperText={
                              (touched.address && errors.address) || (
                                <p>
                                  Εισάγετε διεύθυνση (από 2 μέχρι μέχρι 25
                                  χαρακτήρες!)
                                </p>
                              )
                            }
                          />
                        </Box>
                      </Grid>
                    </Paper>
                    <Paper elevation={3} className={classes.paper}>
                      <Grid item xs={12} lg={6} className={classes.formRoot}>
                        <p>(*) Υποχρεωτικό</p> <br />
                        <h3>4ο Βήμα - Πολυμέσα</h3>
                      </Grid>
                    </Paper>
                    <Paper elevation={3} className={classes.paper}>
                      <Grid item xs={12} lg={6} className={classes.formRoot}>
                        <p>(*) Υποχρεωτικό</p> <br />
                        <h3>5ο Βήμα - Επιπλέον πληροφορίες</h3>
                        <Box mt={1}>
                          <FormControlLabel
                            control={
                              <Field
                                color='secondary'
                                component={Switch}
                                type='checkbox'
                                name='adultsOnly'
                                fullWidth
                              />
                            }
                            label='Άνω των 18'
                          />
                        </Box>
                        <Box mt={3}>
                          <Field
                            component={TextField}
                            color='secondary'
                            multiline
                            name='extraInfo'
                            fullWidth
                            label='Επιπλέον Πληροφορίες'
                            value={values.extraInfo}
                            error={
                              touched.extraInfo && Boolean(errors.extraInfo)
                            }
                            helperText={
                              (touched.extraInfo && errors.extraInfo) || (
                                <p>
                                  Επιπλέον πληροφορίες/σχόλια (μέχρι μέχρι 200
                                  χαρακτήρες!)
                                </p>
                              )
                            }
                          />
                        </Box>
                        {isSubmitting && <LinearProgress />}
                        <Box mt={2}>
                          <Button
                            fullWidth
                            variant='contained'
                            color='secondary'
                            disabled={isSubmitting}
                            onClick={submitForm}
                          >
                            ΔΗΜΙΟΥΡΓΙΑ EVENT
                          </Button>
                        </Box>
                      </Grid>
                    </Paper>
                  </Form>
                </Grid>
              </Grid>
            </div>
          </MuiPickersUtilsProvider>
        )}
      </Formik>
    </>
  );
};

export default SingleForm;

import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Button,
  LinearProgress,
  MenuItem,
  FormControlLabel,
} from '@material-ui/core';
import * as yup from 'yup';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { TextField, Select, Switch } from 'formik-material-ui';
import { TimePicker, DatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useCreateEventMutation } from '../src/generated/graphql';
import { useRouter } from 'next/router';
// import {
//   Autocomplete,
//   AutocompleteRenderInputParams,
// } from 'formik-material-ui-lab';
import Box from '@material-ui/core/Box';
import { isAuth } from '../src/utils/isAuth';

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

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, 'Τουλάχιστον 5 χαρακτήρες (από 5 μέχρι μέχρι 35 χαρακτήρες!)')
    .max(35, 'Υπερβαίνει τους 35 χαρακτήρες (από 5 μέχρι μέχρι 35 χαρακτήρες!)')
    .required('Υποχρεωτικό πεδίο!'),
  description: yup
    .string()
    .min(10, 'Τουλάχιστον 10 χαρακτήρες (από 10 μέχρι μέχρι 5000 χαρακτήρες!)')
    .max(
      5000,
      'Υπερβαίνει τους 5000 χαρακτήρες (από 10 μέχρι μέχρι 5000 χαρακτήρες!)'
    )
    .required('Υποχρεωτικό πεδίο!'),
  topic: yup.string().required('Υποχρεωτικό πεδίο!'),
  extraInfo: yup
    .string()
    .max(200, 'Υπερβαίνει τους 200 χαρακτήρες (μέχρι 200 χαρακτήρες!)'),
});

const SingleForm = () => {
  const classes = useStyles();

  const [createEvent] = useCreateEventMutation();
  const router = useRouter();

  // User must be logged in
  isAuth();

  return (
    <Formik
      initialValues={{
        title: '',
        topic: '',
        description: '',

        adultsOnly: true,
        date: new Date(),
        time: new Date(),
        image: '',

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
                <Paper elevation={3} className={classes.paper}>
                  <Grid item xs={12} lg={6} className={classes.formRoot}>
                    <p>(*) Υποχρεωτικό</p> <br />
                    <Form>
                      <Box margin={1}>
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
                      <Box mt={2}>
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
                      <Box mt={1}>
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
                      <Box mt={1}>
                        <Field
                          color='secondary'
                          style={{
                            backgroundColor: 'red',

                            color: 'white',
                          }}
                          name='image'
                          type='file'
                          fullWidth
                        />
                      </Box>

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

                      <Box mt={1}>
                        <Field
                          color='secondary'
                          component={TimePicker}
                          name='time'
                          label='Ώρα *'
                          fullWidth
                        />
                      </Box>
                      <Box mt={1}>
                        <Field
                          color='secondary'
                          component={DatePicker}
                          name='date'
                          label='Ημερομηνία *'
                          fullWidth
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
                          error={touched.extraInfo && Boolean(errors.extraInfo)}
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
                      <Box margin={1}>
                        <Button
                          variant='contained'
                          color='secondary'
                          disabled={isSubmitting}
                          onClick={submitForm}
                        >
                          ΔΗΜΙΟΥΡΓΙΑ EVENT
                        </Button>
                      </Box>
                    </Form>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </MuiPickersUtilsProvider>
      )}
    </Formik>
  );
};

export default SingleForm;

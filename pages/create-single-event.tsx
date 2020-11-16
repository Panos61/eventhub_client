import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField/TextField';
import { isAuth } from '../src/utils/isAuth';
import { Box, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import * as yup from 'yup';

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
});

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

interface Props {}

const Single: React.FC<Props> = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      topic: '',
      description: '',
    },

    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    },
  });

  const classes = useStyles();
  isAuth();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2 className={classes.title}>Δημιουργία Event</h2>
          <Paper elevation={3} className={classes.paper}>
            <Grid item xs={12} lg={6} className={classes.formRoot}>
              <form onSubmit={formik.handleSubmit}>
                <Box mt={2}>
                  <TextField
                    fullWidth
                    name='title'
                    label='Τίτλος *'
                    color='secondary'
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={
                      (formik.touched.title && formik.errors.title) || (
                        <p>Εισάγετε τίτλο (από 5 μέχρι μέχρι 35 χαρακτήρες!)</p>
                      )
                    }
                  />
                </Box>
                <Box mt={2}>
                  <TextField
                    fullWidth
                    name='topic'
                    label='Είδος *'
                    color='secondary'
                    select
                    value={formik.values.topic}
                    onChange={formik.handleChange}
                    error={formik.touched.topic && Boolean(formik.errors.topic)}
                    helperText={
                      (formik.touched.topic && formik.errors.topic) || (
                        <p>Εισάγετε είδος</p>
                      )
                    }
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <Box mt={2}>
                  <TextField
                    fullWidth
                    name='description'
                    label='Περιγραφή *'
                    multiline
                    color='secondary'
                    variant='outlined'
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      (formik.touched.description &&
                        formik.errors.description) || (
                        <p>
                          Εισάγετε περιγραφή (από 10 μέχρι μέχρι 5000
                          χαρακτήρες!)
                        </p>
                      )
                    }
                  />
                </Box>

                <Box mt={3}>
                  <Button
                    color='secondary'
                    variant='contained'
                    fullWidth
                    type='submit'
                  >
                    ΔΗΜΙΟΥΡΓΙΑ EVENT
                  </Button>
                </Box>
              </form>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Single;

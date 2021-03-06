import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MusicTemplate from '../../templates/music-template';
import { Box, Fab } from '@material-ui/core';
import Link from 'next/link';

interface musicProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: '0 auto',
      width: '95%',
      marginTop: '5vh',
    },
    title: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'red',
    },
    paper: {
      minHeight: '70vh',
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

const Music: React.FC<musicProps> = () => {
  const classes = useStyles();
  return (
    <>
      <Box mt={3} mb={-5} ml={5}>
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
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h2 className={classes.title}>Μουσική</h2>
            <Paper elevation={3} className={classes.paper}>
              <MusicTemplate />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Music;

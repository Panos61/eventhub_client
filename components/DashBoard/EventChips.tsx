import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '5vh',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  })
);

export default function EventChips() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link href='/events/music'>
        <Chip
          label='Μουσική'
          variant='outlined'
          style={{
            backgroundColor: '#c62828',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '15px',
            cursor: 'pointer',
          }}
        />
      </Link>
      <Link href='/register'>
        <Chip
          label='Αθλητισμός'
          variant='outlined'
          style={{
            backgroundColor: '#1e88e5',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '15px',
            cursor: 'pointer',
          }}
        />
      </Link>
      <Link href='/register'>
        <Chip
          label='Διασκέδαση'
          variant='outlined'
          style={{
            backgroundColor: '#c2185b',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '15px',
            cursor: 'pointer',
          }}
        />
      </Link>
      <Link href='/register'>
        <Chip
          label='Σινεμά'
          variant='outlined'
          style={{
            backgroundColor: '#388e3c',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '15px',
            cursor: 'pointer',
          }}
        />
      </Link>
      <Link href='/register'>
        <Chip
          label='Τέχνη'
          variant='outlined'
          style={{
            backgroundColor: '#ff9800',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '15px',
            cursor: 'pointer',
          }}
        />
      </Link>
    </div>
  );
}

import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';

const style = {
  color: 'grey',
  textDecoration: 'none',
};

export default function Copyright() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={5} style={style}>
          <Link href='/'>
            <a style={style}>Σχετικά με εμάς</a>
          </Link>
        </Grid>
        <Grid item xs={5}>
          <Link href='/'>
            <a style={style}>Όροι χρήσης</a>
          </Link>
        </Grid>
        <Grid item xs={2}>
          <Link href='/'>
            <a style={style}>FAQs</a>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          alignContent='center'
          style={{ marginTop: '-0.5vh' }}
        >
          <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright © '}
            <MuiLink color='inherit' href='https://material-ui.com/'>
              eventhub_
            </MuiLink>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

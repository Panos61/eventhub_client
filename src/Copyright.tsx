import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const linkStyle = {
  color: '#616161',
};

export default function Copyright() {
  return (
    <Container maxWidth='sm'>
      <Typography
        variant='body2'
        align='center'
        style={{ marginTop: '10vh', marginBottom: '1vh', color: '#bdbdbd' }}
      >
        <Grid container spacing={0} style={{ marginBottom: '20px' }}>
          <Grid item xs={4}>
            <Link href='/about' style={linkStyle}>
              <a>
                <li>Σχετικά με εμάς</li>
              </a>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href='/about' style={linkStyle}>
              <a>
                <li>Όροι χρήσης</li>
              </a>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href='/about' style={linkStyle}>
              <a>
                <li>FAQs</li>
              </a>
            </Link>
          </Grid>
        </Grid>
        {'Copyright © '}
        <MuiLink color='inherit' href='https://material-ui.com/'>
          eventhub_
        </MuiLink>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Container>
  );
}

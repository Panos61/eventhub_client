import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import AppBar from '../components/AppBar';
import Parallax from '../views/Parallax';
import Time from '../components/DashBoard/Time';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RoomTwoToneIcon from '@material-ui/icons/RoomTwoTone';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { makeStyles } from '@material-ui/core/styles';
import EventChips from '../components/DashBoard/EventChips';

const useStyles = makeStyles(() => ({
  container: {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',
    color: '#FFFFFF',
    zIndex: 12,
    '@media (min-width: 576px)': {
      maxWidth: '540px',
    },
    '@media (min-width: 768px)': {
      maxWidth: '720px',
    },
    '@media (min-width: 992px)': {
      maxWidth: '960px',
    },
    '@media (min-width: 1200px)': {
      maxWidth: '1140px',
    },
  },
  title: {
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none',
    color: '#FFFFFF',
    margin: '1.75rem 0 0.875rem',
    fontWeight: '700',
    fontFamily: `"Roboto Slab", "Times New Roman", serif`,
  },
}));

export default function Index() {
  const classes = useStyles();
  return (
    <>
      <AppBar />
      <Parallax filter>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <Time />

              <div style={{ display: 'flex' }}>
                <RoomTwoToneIcon />
                {'  '}
                Florina
              </div>
              <h4>
                Δημιουργήστε ή αναζητήστε κάθε νέο event στην περιοχή σας!
              </h4>
              <br />
              <div style={{ display: 'flex' }}>
                <Button style={{ backgroundColor: 'white', color: '#e65100' }}>
                  <AddIcon />
                  Event
                </Button>
                <Button
                  style={{
                    backgroundColor: 'white',
                    color: 'green',
                    marginLeft: '15px',
                  }}
                >
                  <InfoOutlinedIcon />
                  Ιnfo
                </Button>
              </div>
            </GridItem>
            <GridItem>
              <EventChips />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <Container maxWidth='sm'>
        <Box my={8}>
          <Typography
            variant='h4'
            component='h1'
            gutterBottom
            style={{ color: 'orangered' }}
          >
            Next.js with TypeScript example
          </Typography>
          <Link href='/about' color='secondary'>
            Go to the about page
          </Link>
          <ProTip />
        </Box>

        <div style={{ marginTop: '30vh' }}>
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
          . <br />
        </div>
      </Container>
    </>
  );
}

import { Card, CardContent } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';
import { useMusicEventsQuery } from '../src/generated/graphql';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

interface musicTempProps {}

const globalStyle = `
.flex-container {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
  }
`;

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    cursor: 'pointer',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const MusicTemplate: React.FC<musicTempProps> = () => {
  const classes = useStyles();

  const { data } = useMusicEventsQuery({
    variables: {
      limit: 10,
    },
  });

  return (
    <>
      <Head>
        <style>{globalStyle}</style>
      </Head>

      {data?.events?.map((e) =>
        !e ? (
          <p>No events</p>
        ) : (
          <div className='flex-container'>
            <Link href='/event/[id]' as={`/event/${e.id}`}>
              <Card
                className={classes.root}
                key={e.id}
                style={{
                  marginTop: '5vh',
                  flexDirection: 'row',
                }}
                variant='outlined'
              >
                <CardContent>{e.title}</CardContent>
              </Card>
            </Link>
          </div>
        )
      )}
    </>
  );
};

export default MusicTemplate;

import React, { useState } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { getAccessToken, setAccessToken } from '../src/utils/accessToken';
import { ApolloLink, Observable } from 'apollo-link';
import jwtDecode from 'jwt-decode';
import { onError } from 'apollo-link-error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import CircularProgress from '@material-ui/core/CircularProgress';
import Layout from '../components/Layout';
import { createUploadLink } from 'apollo-upload-client';

const cache = new InMemoryCache({});
const link = createUploadLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            console.log(accessToken);
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: 'accessToken',
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();

        if (!token) {
          return true;
        }

        try {
          const { exp } = jwtDecode(token);
          if (Date.now() >= exp * 1000) {
            return false;
          } else {
            return true;
          }
        } catch {
          return false;
        }
      },
      fetchAccessToken: () => {
        return fetch('http://localhost:4000/refresh-token', {
          method: 'POST',
          credentials: 'include',
        });
      },
      handleFetch: (accessToken) => {
        setAccessToken(accessToken);
      },
      handleError: (err) => {
        console.warn('Your refresh token is invalid. Try to relogin');
        console.error(err);
      },
    }) as any,
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }),
    requestLink,
    link,
  ]) as any,
  cache,
}) as any;

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }

    fetch('http://localhost:4000/refresh-token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ position: 'absolute', left: '50%', top: '50%' }}>
        <CircularProgress color='secondary' />
      </div>
    );
  }

  return (
    <React.Fragment>
      <ApolloProvider client={client}>
        <Head>
          <title>eventhub_</title>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width'
          />
        </Head>
        <Layout>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />

            <Component {...pageProps} />
          </ThemeProvider>
        </Layout>
      </ApolloProvider>
    </React.Fragment>
  );
}

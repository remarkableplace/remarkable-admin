import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const { REACT_APP_GRAPHQL_API } = process.env;
const graphqlApi = REACT_APP_GRAPHQL_API || '';

const client = new ApolloClient({
  link: new HttpLink({
    credentials: 'include',
    uri: `${graphqlApi}/api/graphql`
  }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  global.document.getElementById('root')
);

registerServiceWorker();

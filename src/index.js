import React from 'react';
import { render } from 'react-dom';
import { ReduxCache, apolloReducer } from 'apollo-cache-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import reducers from './reducers';

import { App } from './containers/App';

const globalReducer = combineReducers({
  apollo: apolloReducer,
  ...reducers
});

const middleware = [];

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
 
const store = createStore(
  globalReducer,
  composeEnhancers(
    applyMiddleware(...middleware)
  ) 
);
 
const cache = new ReduxCache({ store });
 
const client = new ApolloClient({
  link: new HttpLink(),
  cache
});

const WrappedApp = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

render(WrappedApp, document.getElementById('root'));
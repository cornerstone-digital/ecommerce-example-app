import React from 'react';
import { render } from 'react-dom';
import { ReduxCache, apolloReducer } from 'apollo-cache-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducers';

import Navigation from './components/layout/Navigation';
import Products from './components/products/Products.container';
import Basket from './components/basket/Basket.container';
import NotFound from './components/errors/NotFound';

console.log(Products);

const globalReducer = combineReducers({
  apollo: apolloReducer,
  ...reducers
}); 

const middleware = [];
 
const store = createStore(
  globalReducer,
  composeWithDevTools(
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
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Products} />
            <Route path="/basket" component={Basket} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </ApolloProvider>
); 

render(WrappedApp, document.getElementById('root'));
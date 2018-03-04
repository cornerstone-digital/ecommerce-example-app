import React from 'react';
import { render } from 'react-dom';
import { ReduxCache, apolloReducer } from 'apollo-cache-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { Switch, Route } from 'react-router';
// import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import Navigation from './components/layout/Navigation';
import Products from './components/products/Products.container';
import Basket from './components/basket/Basket.container';
import NotFound from './components/errors/NotFound';

import './index.css';

const globalReducer = combineReducers({
  routerReducer,
  apolloReducer,
  ...reducers
}); 

const history = createHistory();
const middleware = [
  thunk,
  routerMiddleware(history)
];
 
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

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch)

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <Navigation />
        <ConnectedSwitch>
          <Route exact path="/" component={Products} />
          <Route path="/basket" component={Basket} />
          <Route component={NotFound} />
        </ConnectedSwitch>
      </div>
    </div>
  )
};

const ConnectedApp = connect(state => ({
  location: state.location,
}))(App)

const WrappedApp = (
  <ApolloProvider client={client} store={store}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ConnectedApp />
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>
);



render(WrappedApp, document.getElementById('root'));
import React from 'react';
import Navigation from '../components/layout/Navigation';

export const App = () => (
  <div>
    <Navigation />
    <div className="container">
    <Switch>
      <Route exact path="/" component={ProductListWithData} />
      <Route path="/basket" component={BasketComponent} />
      <Route component={NotFound} />
    </Switch>
    </div>
  </div>
);
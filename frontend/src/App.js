import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <div>
      <Switch>
        <Route component={Home} path='/' />
      </Switch>
    </div>
  );
}

export default App;

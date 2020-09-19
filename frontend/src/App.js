import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import './styles/App.scss';

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

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import HistoricResults from './components/HistoricResults';
import './styles/App.scss';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route component={Home} exact path='/' />
        <Route component={HistoricResults}  path='/results' />
      </Switch>
    </div>
  );
}

export default App;

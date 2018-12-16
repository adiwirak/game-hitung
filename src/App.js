import React, { Component } from 'react';
import {  BrowserRouter,  Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";

import MainHome  from './pages/pg_home.js';
import PgLogin  from './pages/pg_login.js';
import PgPlay  from './pages/pg_play.js';
import Pghasil from './pages/pg_hasil.js';

import DataStoreku  from './globalstore/start_store.js';



class App extends Component {
  render() {
    return (
      <Provider store={ DataStoreku }>
      <BrowserRouter>
        <Switch>
          <Route path='/play:idx' component={PgPlay} />          
          <Route path='/play' component={PgPlay} />          
          <Route path='/hasilakhir' component={Pghasil} />          
          <Route path='/login' component={PgLogin} />          
          <Route path='/' component={MainHome} />
        </Switch>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

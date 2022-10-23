import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Top } from './components/top/Top';
import { Cat } from './components/cat/Cat';
import { Error } from './components/Error/Error';

function App() {
  return (
    <div className="App">
      <p>test..</p>
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Top} />
        <Route path='/cat' component={Cat} />
        <Route path="*" component={Error} /> {/* 404は機能している */}
      </Switch>

      <Link to='/'>Back To Top</Link> / <Link to='/cat'>Cat</Link>

      </BrowserRouter>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;

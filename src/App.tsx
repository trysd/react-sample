import React from 'react';

import './App.scss';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Top } from './components/top/Top';
import { Cat } from './components/cat/Cat';
import { Error } from './components/Error/Error';
import { Dog } from './components/dog/Dog';

// React hooksを基礎から理解する (useState編)
// https://qiita.com/seira/items/f063e262b1d57d7e78b4
// ..

// propsとstateのイメージをつかむ【はじめてのReact】
// https://qiita.com/rio_threehouse/items/7632f5a593cf218b9504

function App() {
  return (
    <div className="App">

      <p>test.</p>

      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Top} />
        {/* <Route path='/cat' component={Cat} /> */}
        {/* <Route path='/Dog' component={Dog} /> */}
        <Route path="/cat">
          <Cat str="is cat page" />
        </Route>
        <Route path="/dog">
          <Dog str="is dog page" />
        </Route>

        <Route path="*" component={Error} /> {/* 404は機能している */}
      </Switch>

      <p>
        <Link to='/'>Back To Top</Link> / <Link to='/cat'>Cat</Link> / <Link to='/dog'>Dog</Link>
      </p>

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

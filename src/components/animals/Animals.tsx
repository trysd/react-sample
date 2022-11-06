
import * as React from 'react';
import { lazy } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
// import { Cats } from '../cat/Cats'
// import { Dogs } from '../dog/Dogs';

// https://ja.reactjs.org/docs/code-splitting.html
const CatsComponent = lazy(() => import("../cat/Cats").then(({ Cats }) => ({ default: Cats })));
const DogsComponent = lazy(() => import("../dog/Dogs").then(({ Dogs }) => ({ default: Dogs })));

// Lazy Loading は Suspense の子孫に配置する

export const Animals = () => {

  return (
    <div>
      <h3>Animals</h3>
      <BrowserRouter>
        <Switch>
          <Route path="/cats">
            <React.Suspense fallback={<div>Loading cats...</div>}>
              <CatsComponent />
            </React.Suspense>
          </Route>
          <Route path="/dogs">
            <React.Suspense fallback={<div>Loading dogs...</div>}>
              <DogsComponent />
            </React.Suspense>
          </Route>
        </Switch>
        <p>
        <Link to='/'>Back To Top</Link> / <Link to='/cats'>Cats</Link> / <Link to='/dogs'>Dogs</Link>
        </p>
      </BrowserRouter>
    </div>
  );
};

import * as React from 'react';
import { lazy } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

const CatsComponent = lazy(() => import("../cat/Cats").then(({ Cats }) => ({ default: Cats })));
const DogsComponent = lazy(() => import("../dog/Dogs").then(({ Dogs }) => ({ default: Dogs })));

interface Props {}
export const Animals: React.FC<Props> = (props) => {

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
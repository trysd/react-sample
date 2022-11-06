import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Cats } from '../cat/Cats'
import { Dogs } from '../dog/Dogs';

export const Animals = () => {

  return (
    <div>
      <h3>Animals</h3>
      <BrowserRouter>
        <Switch>
          <Route path="/cats">
            <Cats />
          </Route>
          <Route path="/dogs">
            <Dogs />
          </Route>
        </Switch>
        <p>
        <Link to='/'>Back To Top</Link> / <Link to='/cats'>Cats</Link> / <Link to='/dogs'>Dogs</Link>
        </p>
      </BrowserRouter>
    </div>
  );
};
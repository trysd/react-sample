
import * as React from 'react';
import { lazy, Suspense } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

const CatsComponent = lazy(() => import("../cat/Cats").then(({ Cats }) => ({ default: Cats })));
const DogsComponent = lazy(() => import("../dog/Dogs").then(({ Dogs }) => ({ default: Dogs })));

interface Props {}
export const Animals: React.VFC<Props> = (props) => {

  return (
    <div>
      <h3>Animals</h3>

        <Routes>
          <Route path="/cats" element={
            <Suspense fallback={<div>Loading cats...</div>}>
              <CatsComponent />
            </Suspense>
          } />
          <Route path="/dogs" element={
            <Suspense fallback={<div>Loading dogs...</div>}>
              <DogsComponent />
            </Suspense>
          } />
        </Routes>

        <p>
        <Link to='/'>Back To Top</Link> / <Link to='/cats'>Cats</Link> / <Link to='/dogs'>Dogs</Link>
        </p>

    </div>
  );
};
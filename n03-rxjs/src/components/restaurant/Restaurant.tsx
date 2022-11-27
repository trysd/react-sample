
import * as React from 'react';
import { lazy, Suspense } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { DiningHall } from '../dining-hall';
import styles from './Restaurant.module.css'

// const DiningHallComponent = lazy(() => import("../dining-hall").then(({ DiningHall }) => ({ default: DiningHall })));
const KitchenComponent = lazy(() => import("../kitchen").then(({ Kitchen }) => ({ default: Kitchen })));

interface Props { }
export const Restaurant: React.FC<Props> = (props) => {

  // 

  return (
    <div>
      <h3>Restaurant</h3>
      <div>open | close</div>
      <DiningHall />
      <Routes>
        {/* <Route path="*" element={
          <Suspense fallback={<div>Loading dining hall...</div>}>
            <DiningHallComponent />
          </Suspense>
        } /> */}
        <Route path="/kitchen" element={
          <Suspense fallback={<div>Loading kitchen...</div>}>
            <KitchenComponent />
          </Suspense>
        } />
      </Routes>

      <p>
        <span><Link to='/'>Back To Top</Link> | </span>
        <span><Link to='/kitchen'>peek into the kitchen</Link></span>
      </p>

    </div>
  );
};
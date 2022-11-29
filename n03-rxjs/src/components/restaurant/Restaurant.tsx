
import * as React from 'react';
import { lazy, Suspense } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { DiningHall } from '../dining-hall';
import styles from './Restaurant.module.scss'

// const DiningHallComponent = lazy(() => import("../dining-hall").then(({ DiningHall }) => ({ default: DiningHall })));
const KitchenComponent = lazy(() => import("../kitchen").then(({ Kitchen }) => ({ default: Kitchen })));

interface Props { }
export const Restaurant: React.FC<Props> = (props) => {

  // 

  return (
    <div>
      <DiningHall />
      <Routes>
        <Route path="/kitchen" element={
          <Suspense fallback={<div>Loading kitchen...</div>}>
            <KitchenComponent />
          </Suspense>
        } />
      </Routes>

      <div className={styles.links}>
        <span><Link to='/'>Back To Top</Link> | </span>
        <span><Link to='/kitchen'>Peek into the kitchen</Link></span>
      </div>

    </div>
  );
};
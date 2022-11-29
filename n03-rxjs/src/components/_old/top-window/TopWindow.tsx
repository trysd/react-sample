// import type { RootNameState } from '../../store/store-name'
import type { RootAnimalsState } from '../../../store/animals/store-animals'

import { useSelector, useDispatch } from 'react-redux'
// import { registerCatName } from '../../store/reducer/name/nameSlice';
// import { registerCatName } from '../../../store/';

import styles from './TopWindow.module.css'

export const TopWindow = () => {
  const animals = useSelector((state: RootAnimalsState) => state.animals)

  return (
    <div className={styles.pos}>
      <div>cats → {animals.catName}</div>
      <div>dogs → {animals.dogName}</div>
    </div>
  );
};
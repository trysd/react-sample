import type { RootAnimalsState } from '../../store/animals/store-animals'
import { useSelector, useDispatch } from 'react-redux'
import { setCatName  } from '../../store/animals/slice-animals';
import { useState } from 'react';
import styles from './Cats.module.css'

export const Cats = () => {

  // global store
  const animals = useSelector((state: RootAnimalsState) => state.animals)
  const dispatch = useDispatch()

  // local store
  const [nameInput, setNameInput] = useState(animals.catName);

  return (
    <div>
      <h2>Cats: {animals.catName}</h2>
      <div>
        <input
          className={styles.textBox}
          aria-label="cat name"
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
        />
        <button
          onClick={() =>
            dispatch(setCatName(nameInput))
          }>
          registerName
        </button>
      </div>
    </div>
  );
};

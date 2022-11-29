import type { RootAnimalsState } from '../../store/animals/store-animals'
import { useSelector, useDispatch } from 'react-redux'
import { setDogName  } from '../../store/animals/slice-animals';
import { useState } from 'react';
import styles from './Dogs.module.css'

export const Dogs = () => {

  // global store
  const animals = useSelector((state: RootAnimalsState) => state.animals)
  const dispatch = useDispatch()

  // local store
  const [nameInput, setNameInput] = useState(animals.dogName);

  return (
    <div>
      <h2>Dogs: {animals.dogName}</h2>
      <div>
        <input
          className={styles.textBox}
          aria-label="dog name"
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
        />
        <button
          onClick={() =>
            dispatch(setDogName(nameInput))
          }>
          registerName
        </button>
      </div>
    </div>
  );
};

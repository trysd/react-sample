import React, { useState } from 'react'
import type { RootCounterState } from '../../../store/store-counter'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementAsync, incrementByAmount } from '../../../store/counter/slice-counter'
import styles from './Counter.module.css'

export function Counter() {

  // global store
  const count = useSelector((state: RootCounterState) => state.counter.value)
  const dispatch = useDispatch()

  // local store
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
    <div className={styles.row}>
      <button
        className={styles.button}
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        +
      </button>
      <span className={styles.value}>{count}</span>
      <button
        className={styles.button}
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        -
      </button>
    </div>
    <div className={styles.row}>
      <input
        className={styles.textbox}
        aria-label="Set increment amount"
        value={incrementAmount}
        onChange={e => setIncrementAmount(e.target.value)}
      />
      <button
        className={styles.button}
        onClick={() =>
          dispatch(incrementByAmount(Number(incrementAmount) || 0))
        }
      >
        Add Amount
      </button>
      <button
        className={styles.asyncButton}
        onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0) as any)}
      >
        Add Async
      </button>
    </div>
  </div>
  )
}
import React, { useState } from 'react'

export const Cat = () => {

  // count という名前の state 変数を宣言、初期値 initialState をセット
  const [count, setCount] = useState(999)
  // open という名前の state 変数を宣言、初期値 true をセット
  const [open, setOpen] = useState(true)
  // toggleの関数を宣言
  const toggle = () => setOpen(!open)

  return (
    <div>
      <h1>Cat</h1>
      {/* <div>{props.str ? props.str : '..'}</div> */}
      <>
      <button onClick={toggle}>{open ? 'close' : 'open'}</button>
      <div className={open ? 'isOpen' : 'isClose'}>
        <p>現在の数字は{count}です</p>
        {/* setCount()は、countを更新するための関数。countを引数で受け取ることも出来る */}
        <button onClick={() => setCount(prevState => prevState + 1)}>
          + 1
        </button>
        <button onClick={() => setCount(count - 1)}>- 1</button>
        <button onClick={() => setCount(0)}>０</button>
      </div>
    </>
    </div>
  );
};


// Vite で最速 React & TypeScript
// https://zenn.dev/sprout2000/articles/98145cf2a807b1

// Redux入門者向け初めてのRedux ToolkitとRedux Thunkの非同期処理
// https://reffect.co.jp/react/redux-toolkit

// インストール時
// npm create vite
// npm install @reduxjs/toolkit react-redux

import reactLogo from './assets/react.svg'
import './App.css'
import { Counter } from './features/counter/Counter'

function App() {

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Counter />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App

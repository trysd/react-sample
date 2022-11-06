
// Vite で最速 React & TypeScript
// https://zenn.dev/sprout2000/articles/98145cf2a807b1

// Redux入門者向け初めてのRedux ToolkitとRedux Thunkの非同期処理
// https://reffect.co.jp/react/redux-toolkit

// インストール時
// npm create vite
// npm install @reduxjs/toolkit react-redux

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import './App.css'
import { Counter } from './components/counter/Counter'
import { Animals } from './components/animals/Animals';
import { Provider } from 'react-redux';
import { TopWindow } from './components/top-window/TopWindow';
import { storeAnimals } from './store/animals/store-animals';


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
      <BrowserRouter>
        <Provider store={storeAnimals}>
          <Animals />
          <TopWindow />
        </Provider>
      </BrowserRouter>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

    </div>
  )
}

export default App

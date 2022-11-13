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
        <Provider store={storeAnimals}>
          <Animals />
          <TopWindow />
        </Provider>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

    </div>
  )
}

export default App

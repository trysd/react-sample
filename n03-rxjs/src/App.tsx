import './App.css'
import { Counter } from './components/counter/Counter'
import { Animals } from './components/animals/Animals';
import { Provider } from 'react-redux';
import { TopWindow } from './components/top-window/TopWindow';
import { storeAnimals } from './store/animals/store-animals';
import { Kitchen } from './service/Kitchen';
import { TestStore } from './rxjs/core/Store';

function App() {

  const kitchen_ = Kitchen.instance();
  // TestStore.instance();

  return (
    <div className="App">
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

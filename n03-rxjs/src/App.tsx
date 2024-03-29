import './App.css'
import { Provider } from 'react-redux';

// import { storeAnimals } from './store/animals/store-animals';
import { storeSales } from './store/sales/store-sales';

import { Kitchen } from './service/Kitchen';
import { TestStore } from './rxjs/core/Store';
import { Restaurant } from './components/restaurant/';

function App() {

  const kitchen_ = Kitchen.instance();
  // TestStore.instance();

  return (
    <div className="App">

      <Provider store={storeSales}>
        <Restaurant />
      </Provider>
      <p className="read-the-docs">
        Order food
      </p>

    </div>
  )
}

export default App
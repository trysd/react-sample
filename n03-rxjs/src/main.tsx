import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { storeCounter } from './store/counter/store-counter'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={storeCounter}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={ <App /> } />
      </Routes>
    </BrowserRouter>
  </Provider>,
)

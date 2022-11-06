import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { storeCounter } from './store/store-counter'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={storeCounter}>
    <App />
  </Provider>,
)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './main.css';
import { storeUsrProp } from './states/userProp/store-userProp'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={storeUsrProp}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { AuthContextProvider } from './store/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './UI/transition.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);

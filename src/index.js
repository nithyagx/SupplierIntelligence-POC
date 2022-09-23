import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Dashboard from './pages/dashboard/Dashboard';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import MainReducer from './store/reducer/mainReducer';
import thunk from 'redux-thunk';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore (MainReducer, applyMiddleware(thunk));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Dashboard />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

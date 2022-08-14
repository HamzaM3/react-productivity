import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.scss'
import './reset.scss'
import './alarm.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

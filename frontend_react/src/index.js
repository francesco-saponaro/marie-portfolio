import React from 'react';
import ReactDOM from 'react-dom/client';

// Router imports
import { BrowserRouter } from 'react-router-dom'

// Styles imports
import './index.scss';

// Component imports
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

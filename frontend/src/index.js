import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import App from './App';  // Your App component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter> {/* Wrap your app with BrowserRouter */}
    <App />
  </BrowserRouter>
);

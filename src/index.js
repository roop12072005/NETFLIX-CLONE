import React from 'react';
import ReactDOM from 'react-dom/client';
import './pages/Index/index.css';
import App from './pages/Main/App.js';
import WatchlistProvider from './context.js/WatchlistProvider.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
  </React.StrictMode>
);

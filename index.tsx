
import React from 'react';
import ReactDOM from 'react-dom/client';
// Fix: Import the App component from the local App.tsx instead of the Next.js pages/_app.js
// This resolves the missing props error (Component, pageProps, categories) as the React Router version is prop-less.
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

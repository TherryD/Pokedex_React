// src/index.js (ou src/index.jsx)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importa o componente App

// Pega o elemento 'root' no HTML para injetar a aplicação React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza a aplicação
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
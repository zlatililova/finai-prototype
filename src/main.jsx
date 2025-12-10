import React from 'react';
import ReactDOM from 'react-dom/client';
import BudgetAIApp from './BudgetAIApp.jsx';
import './index.css'; // Import the global Tailwind CSS file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BudgetAIApp />
  </React.StrictMode>,
);
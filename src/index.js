import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FoamCard from "./components/FoamCard/FoamCard";
import ExtrasCard from "./components/ExtrasCard/ExtrasCard";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      <FoamCard />
    </div>
    <div>
      <ExtrasCard />
    </div>
  </React.StrictMode>
);

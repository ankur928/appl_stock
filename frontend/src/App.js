import React from 'react';
import './App.css';
import CandlestickChart from './components/CandlestickChart';
import FinancialData from './components/FinancialData';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Apple Stock Dashboard</h1>
      </header>
      <div className="App-content">
        <CandlestickChart />
        <FinancialData />
      </div>
    </div>
  );
}

export default App;

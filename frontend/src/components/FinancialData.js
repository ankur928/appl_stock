import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FinancialData.css';

const FinancialData = () => {
  const [financialData, setFinancialData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8001/financials')
      .then(response => {
        setFinancialData(response.data.financial_data);
      })
      .catch(error => console.error('Error fetching financial data:', error));
  }, []);

  if (!financialData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="financial-data">
      <h2>Financial Data for AAPL</h2>
      <p>Market Cap: ${financialData.market_cap} Billion</p>
      <p>Shares Outstanding: {financialData.shares_outstanding} Million</p>
      <p>P/E Ratio: {financialData.pe_ratio}</p>
      <p>P/S Ratio: {financialData.ps_ratio}</p>
      <p>P/B Ratio: {financialData.pb_ratio}</p>
      <p>PEG Ratio: {financialData.peg_ratio}</p>
      <p>Current Ratio: {financialData.current_ratio}</p>
      <p>Debt to Equity Ratio: {financialData.debt_to_equity_ratio}</p>
      <p>EPS: {financialData.eps}</p>
      <h3>Analyst Estimates</h3>
      <ul>
        {Object.entries(financialData.analyst_estimates).map(([analyst, estimate]) => (
          <li key={analyst}>{analyst}: {estimate}</li>
        ))}
      </ul>
      <h3>News</h3>
      <ul>
        {Object.entries(financialData.news).map(([article, details]) => (
          <li key={article}>{details.summary} - {details.sentiment.value} ({details.sentiment.score})</li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialData;

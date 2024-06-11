import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import './CandlestickChart.css';

const CandlestickChart = () => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: 'candlestick',
      background: '#1c1c3f',
      foreColor: '#e8e8ff'
    },
    title: {
      text: 'Apple Stock Price',
      align: 'center',
      style: {
        color: '#a3a3ff'
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#e8e8ff'
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        style: {
          colors: '#e8e8ff'
        }
      }
    },
    theme: {
      mode: 'dark'
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#00ff00',
          downward: '#ff0000'
        }
      }
    }
  });

  useEffect(() => {
    axios.get('http://localhost:8001/financials')
      .then(response => {
        const stockData = response.data.stock_data.map(data => ({
          x: new Date(data.date),
          y: [data.open, data.high, data.low, data.close]
        }));
        setSeries([{ data: stockData }]);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div id="chart">
      <Chart options={options} series={series} type="candlestick" height={500} />
    </div>
  );
};

export default CandlestickChart;

import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';  // This is needed to auto-register Chart.js components

const ChartComponent = ({ data }) => {
  // Extract the labels (dates) and datasets (open, high, low, close, adjclose)
  const labels = data.map(item => new Date(item.date).toLocaleDateString());

  const openPrices = data.map(item => item.open);
  const highPrices = data.map(item => item.high);
  const lowPrices = data.map(item => item.low);
  const closePrices = data.map(item => item.close);
  const adjClosePrices = data.map(item => item.adjclose);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Open',
        data: openPrices,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
      {
        label: 'High',
        data: highPrices,
        backgroundColor: 'rgba(255,99,132,0.4)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
      {
        label: 'Low',
        data: lowPrices,
        backgroundColor: 'rgba(54,162,235,0.4)',
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 1,
      },
      {
        label: 'Close',
        data: closePrices,
        backgroundColor: 'rgba(255,206,86,0.4)',
        borderColor: 'rgba(255,206,86,1)',
        borderWidth: 1,
      },
      {
        label: 'Adj Close',
        data: adjClosePrices,
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div>
      <h2>Stock Data Chart</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
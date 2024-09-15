// src/components/PriceChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const PriceChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Price Increase Percentage',
        data: Object.values(data),
        borderColor: '#FF5733',
        backgroundColor: 'rgba(255, 87, 51, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h2>Vehicle Price Increase (2020-2024)</h2>
      <Line data={chartData} />
    </div>
  );
};

export default PriceChart;

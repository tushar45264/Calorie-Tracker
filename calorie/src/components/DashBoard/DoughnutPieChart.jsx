import React from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const DoughnutPieChart = ({ data, chartType = 'doughnut',style }) => {
  const chartData = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
      {
        label: 'Weekly Calorie Intake',
        data: data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#F77825',
          '#9966FF',
          '#C9CB3F',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return <div style={style}>{chartType === 'doughnut' ? <Doughnut data={chartData} /> : <Pie data={chartData} />}</div>;
};

export default DoughnutPieChart;

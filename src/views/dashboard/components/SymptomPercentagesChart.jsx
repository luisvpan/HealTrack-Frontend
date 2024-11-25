// SymptomPercentages.jsx
import React, { useEffect, useState } from 'react';
import getSymptomPercentages from 'services/dashboard/get-symptom-pergentages';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './CSSs/SymptomPercentages.css';

// Registra el elemento Arc, Tooltip y Legend en ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const SymptomPercentages = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSymptomPercentages();
      setData(result);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Porcentaje de Síntomas',
        data: data.map((item) => item.percentage),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const percentage = context.raw.toFixed(2);
            const count = data[context.dataIndex]?.count;
            return `Porcentaje de Síntoma: ${percentage}% (${count} casos)`;
          },
        },
      },
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="symptom-percentages-chart">
      <h2>Porcentajes de Síntomas</h2>
      {data.length > 0 ? (
        <Pie data={chartData} options={options} />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default SymptomPercentages;

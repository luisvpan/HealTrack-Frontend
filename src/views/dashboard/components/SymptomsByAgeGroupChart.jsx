import React, { useEffect, useState } from 'react';
import getSymptomsByAgeGroup from 'services/dashboard/get-symptoms-by-age-group';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SymptomsByAgeGroupChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSymptomsByAgeGroup();
      setData(result);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: data.map((item) => item.ageRange),
    datasets: [
      {
        label: 'Fiebre Alta',
        data: data.map((item) => item.symptoms.highTemperature.count), // Usar count en data
        backgroundColor: '#FF6384',
        symptomPercentage: data.map((item) => item.symptoms.highTemperature.percentage), // Guarda el porcentaje en dataset
      },
      {
        label: 'Enrojecimiento',
        data: data.map((item) => item.symptoms.redness.count),
        backgroundColor: '#36A2EB',
        symptomPercentage: data.map((item) => item.symptoms.redness.percentage),
      },
      {
        label: 'Hinchazón',
        data: data.map((item) => item.symptoms.swelling.count),
        backgroundColor: '#FFCE56',
        symptomPercentage: data.map((item) => item.symptoms.swelling.percentage),
      },
      {
        label: 'Secreciones',
        data: data.map((item) => item.symptoms.secretions.count),
        backgroundColor: '#4BC0C0',
        symptomPercentage: data.map((item) => item.symptoms.secretions.percentage),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const count = context.raw;
            const percentage = context.dataset.symptomPercentage[context.dataIndex].toFixed(2);
            return `${context.dataset.label}: ${count} casos (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="chart" 
      style={{
        boxShadow: `
          0 4px 6px rgba(0, 0, 0, 0.2),
          0 8px 12px rgba(0, 0, 0, 0.15),
          0 12px 16px rgba(0, 0, 0, 0.1)
        `,
      }}
    >
      <h2>Síntomas por Grupo de Edad</h2>
      {data.length > 0 ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default SymptomsByAgeGroupChart;

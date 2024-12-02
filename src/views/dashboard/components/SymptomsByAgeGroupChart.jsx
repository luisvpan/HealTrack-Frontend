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
  const [viewMode, setViewMode] = useState('cases'); // 'cases' o 'percentages'

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
        data:
          viewMode === 'cases'
            ? data.map((item) => item.symptoms.highTemperature.count)
            : data.map((item) => item.symptoms.highTemperature.percentage), // Usar porcentaje si el modo es "percentages"
        backgroundColor: '#FF6384',
      },
      {
        label: 'Enrojecimiento',
        data:
          viewMode === 'cases'
            ? data.map((item) => item.symptoms.redness.count)
            : data.map((item) => item.symptoms.redness.percentage),
        backgroundColor: '#36A2EB',
      },
      {
        label: 'Hinchazón',
        data:
          viewMode === 'cases'
            ? data.map((item) => item.symptoms.swelling.count)
            : data.map((item) => item.symptoms.swelling.percentage),
        backgroundColor: '#FFCE56',
      },
      {
        label: 'Secreciones',
        data:
          viewMode === 'cases'
            ? data.map((item) => item.symptoms.secretions.count)
            : data.map((item) => item.symptoms.secretions.percentage),
        backgroundColor: '#4BC0C0',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: viewMode === 'cases' ? 'Número de Casos' : 'Porcentaje (%)',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw.toFixed(2);
            return `${context.dataset.label}: ${value} ${viewMode === 'cases' ? 'casos' : '%'}`;
          },
        },
      },
    },
  };

  return (
    <div
      className="chart"
      style={{
        boxShadow: `
          0 4px 6px rgba(0, 0, 0, 0.2),
          0 8px 12px rgba(0, 0, 0, 0.15),
          0 12px 16px rgba(0, 0, 0, 0.1)
        `,
      }}
    >
      <h2>Síntomas por Grupo de Edad</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',  // Centra horizontalmente
          alignItems: 'center',      // Centra verticalmente si el contenedor tiene altura definida
        }}
      >
        <button
          onClick={() => setViewMode('cases')}
          style={{
            margin: '0 5px',
            backgroundColor: viewMode === 'cases' ? '#4CAF50' : '#f0f0f0',
            color: viewMode === 'cases' ? '#fff' : '#000',
            borderRadius: '5px', // Añadido border-radius
            padding: '8px 12px',  // Añadido padding para mejorar la apariencia
            border: 'none',       // Opcional: quitar el borde por defecto
            cursor: 'pointer',    // Añadido cursor para indicar que es clickeable
          }}
        >
          Mostrar Casos
        </button>
        <button
          onClick={() => setViewMode('percentages')}
          style={{
            margin: '0 5px',
            backgroundColor: viewMode === 'percentages' ? '#4CAF50' : '#f0f0f0',
            color: viewMode === 'percentages' ? '#fff' : '#000',
            borderRadius: '5px', // Añadido border-radius
            padding: '8px 12px',  // Añadido padding para mejorar la apariencia
            border: 'none',       // Opcional: quitar el borde por defecto
            cursor: 'pointer',    // Añadido cursor para indicar que es clickeable
          }}
        >
          Mostrar Porcentajes
        </button>
      </div>
      {data.length > 0 ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default SymptomsByAgeGroupChart;

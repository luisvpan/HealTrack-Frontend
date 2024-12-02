import React, { useEffect, useState } from 'react';
import getSymptomsByGender from 'services/dashboard/get-symptoms-by-gender';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SymptomsByGenderChart = () => {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState('cases'); // 'cases' o 'percentages'

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSymptomsByGender();
      setData(result);
    };
    fetchData();
  }, []);

  // Prepare chart data
  const chartData = {
    labels: data.map((item) => (item.sex === 'M' ? 'Masculino' : 'Femenino')),
    datasets: [
      {
        label: 'Fiebre Alta',
        data:
          viewMode === 'cases'
            ? data.map((item) => item.symptoms.highTemperature.count)
            : data.map((item) => item.symptoms.highTemperature.percentage),
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

  const options = {
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
          label: function (tooltipItem) {
            const dataset = chartData.datasets[tooltipItem.datasetIndex];
            const value = tooltipItem.raw.toFixed(2);
            return `${dataset.label}: ${value} ${viewMode === 'cases' ? 'casos' : '%'}`;
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
      <h2>Síntomas por Género</h2>
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
        <Bar data={chartData} options={options} />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default SymptomsByGenderChart;

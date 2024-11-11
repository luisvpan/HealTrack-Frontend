import React, { useEffect, useState } from 'react';
import getAcceptancePercentages from 'services/dashboard/get-acceptance-percentages';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './CSSs/AcceptancePercentagesChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AcceptancePercentagesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAcceptancePercentages();
      setData(result);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: data.map((item) => item.question),
    datasets: [
      {
        label: 'Porcentaje de Aceptación',
        data: data.map((item) => item.percentage),
        backgroundColor: '#88B04B',
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    // plugins: {
    //   legend: { position: 'top' },
    //   title: { display: true, text: 'Porcentaje de Aceptación de Preguntas' },
    // },
    scales: {
      x: { beginAtZero: true, max: 100 },
      y: {
        ticks: { autoSkip: false },
        barPercentage: 0.9, // Ajusta el tamaño de la barra
        categoryPercentage: 1.0, // Añade espacio entre barras
      },
    },
  };

  return (
    <div className="acceptance-percentages-chart">
      <h2>Porcentaje de Aceptación de Preguntas</h2>
      {data.length > 0 ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default AcceptancePercentagesChart;

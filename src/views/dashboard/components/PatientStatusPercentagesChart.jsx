import React, { useEffect, useState } from 'react';
import getPatientStatusPercentages from 'services/dashboard/get-patient-status-percentages';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './CSSs/PatientStatusPercentages.css'; // Importa tu CSS si es necesario

// Registra el elemento Arc, Tooltip y Legend en ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const PatientStatusPercentagesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPatientStatusPercentages();
        // Accede a la propiedad correcta en la respuesta
        if (result && result.percentages && Array.isArray(result.percentages.percentages)) {
          setData(result.percentages.percentages); // Actualiza data con los porcentajes
        } else {
          console.error("Expected an array, received:", result);
          setData([]); // En caso de error, establece data como un array vacío
        }
      } catch (error) {
        console.error("Error fetching patient status percentages:", error);
        setData([]); // Manejo de errores
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: data.map((item) => item.name), // Asegúrate de que cada item tiene una propiedad 'name'
    datasets: [
      {
        label: 'Porcentaje de Pacientes',
        data: data.map((item) => parseFloat(item.percentage)), // Asegúrate de que cada item tiene una propiedad 'percentage'
        backgroundColor: ['#8E44AD', '#1ABC9C', '#F39C12', '#E74C3C'],
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
            return `Porcentaje: ${percentage}% (${count} pacientes)`;
          },
        },
      },
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="patient-status-percentages-chart">
      <h2>Porcentaje de Pacientes por Estatus</h2>
      <h2>(últimos 3 meses)</h2>
      {data.length > 0 ? (
        <Pie data={chartData} options={options}/>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default PatientStatusPercentagesChart;

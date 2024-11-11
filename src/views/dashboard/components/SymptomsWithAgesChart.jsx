import React, { useEffect, useState, useMemo } from 'react';
import getSymptomsWithAges from 'services/dashboard/get-Symptoms-with-ages';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SymptomPercentages = () => {
  const [data, setData] = useState([]);
  const [selectedAge, setSelectedAge] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSymptomsWithAges();
      setData(result);
    };
    fetchData();
  }, []);

  const ages = useMemo(() => [...new Set(data.map(item => item.age))], [data]);

  const handleAgeChange = (e) => {
    setSelectedAge(e.target.value);
  };

  const filteredData = useMemo(() => {
    return selectedAge
      ? data.filter(item => item.age === parseInt(selectedAge))
      : [];
  }, [data, selectedAge]);

  const chartData = {
    labels: ['Fiebre Alta', 'Enrojecimiento', 'Hinchazón', 'Secreciones'],
    datasets: filteredData.length > 0 ? [{
      label: `Edad: ${filteredData[0].age}`,
      data: [
        filteredData[0].symptoms.highTemperature.count,
        filteredData[0].symptoms.redness.count,
        filteredData[0].symptoms.swelling.count,
        filteredData[0].symptoms.secretions.count,
      ],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      percentages: [
        filteredData[0].symptoms.highTemperature.percentage,
        filteredData[0].symptoms.redness.percentage,
        filteredData[0].symptoms.swelling.percentage,
        filteredData[0].symptoms.secretions.percentage,
      ],
    }] : [],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribución de Síntomas por Edad',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const symptomCount = context.raw;
            const percentage = context.dataset.percentages[context.dataIndex].toFixed(2);
            return `${context.dataset.label}: ${symptomCount} casos (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="chart" 
      style={{ boxShadow: 
        `
        0 4px 6px rgba(0, 0, 0, 0.2),
        0 8px 12px rgba(0, 0, 0, 0.15),
        0 12px 16px rgba(0, 0, 0, 0.1)
        `,
      }}
    >
      <h2>Distribución de Síntomas por Edad</h2>
      <select onChange={handleAgeChange} value={selectedAge}>
        <option value="">Seleccionar edad</option>
        {ages.map((age) => (
          <option key={age} value={age}>
            {age}
          </option>
        ))}
      </select>
      {filteredData.length > 0 ? (
        <Bar data={chartData} options={options} />
      ) : (
        selectedAge === '' ? (
          <p>Seleccione una edad para ver los datos.</p>
        ) : (
          <p>No hay datos disponibles para esta edad.</p>
        )
      )}
    </div>
  );
};

export default SymptomPercentages;

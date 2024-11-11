import React, { useEffect, useState, useMemo } from 'react';
import getSymptomsBySurgeryType from 'services/dashboard/get-symptoms-by-surgery-type';
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

const SymptomsBySurgeryTypeChart = () => {
  const [data, setData] = useState([]);
  const [selectedSurgeryType, setSelectedSurgeryType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSymptomsBySurgeryType();
      setData(result);
    };
    fetchData();
  }, []);

  const surgeryTypes = useMemo(() => [...new Set(data.map(item => item.surgeryType))], [data]);

  const handleSurgeryTypeChange = (e) => {
    setSelectedSurgeryType(e.target.value);
  };

  const filteredData = useMemo(() => {
    return selectedSurgeryType
      ? data.filter(item => item.surgeryType === selectedSurgeryType)
      : [];
  }, [data, selectedSurgeryType]);

  const chartData = {
    labels: ['Fiebre Alta', 'Enrojecimiento', 'Hinchazón', 'Secreciones'],
    datasets: filteredData.map((item) => ({
      label: item.surgeryType,
      data: [
        item.symptoms.highTemperature.count,
        item.symptoms.redness.count,
        item.symptoms.swelling.count,
        item.symptoms.secretions.count,
      ],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      percentages: [
        item.symptoms.highTemperature.percentage,
        item.symptoms.redness.percentage,
        item.symptoms.swelling.percentage,
        item.symptoms.secretions.percentage,
      ],
    })),
  };

  const options = {
    responsive: true,
    plugins: {
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
      <h2>Síntomas por Tipo de Cirugía</h2>
      <select onChange={handleSurgeryTypeChange} value={selectedSurgeryType}>
        <option value="">Seleccionar tipo de cirugía</option>
        {surgeryTypes.map((surgeryType) => (
          <option key={surgeryType} value={surgeryType}>
            {surgeryType}
          </option>
        ))}
      </select>
      {filteredData.length > 0 ? (
        <Bar data={chartData} options={options} />
      ) : selectedSurgeryType === '' ? (
        <p>Seleccione un tipo de cirugía para ver los datos.</p>
      ) : (
        <p>No hay datos disponibles para este tipo de cirugía.</p>
      )}
    </div>
  );
};

export default SymptomsBySurgeryTypeChart;

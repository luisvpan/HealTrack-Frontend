// MostCommonSymptom.jsx
import React, { useEffect, useState } from 'react';
import getLeastCommonSymptom from 'services/dashboard/get-least-common-symptom';
import './CSSs/MostCommonSymptom.css';

const LeastCommonSymptom = () => {
  const [leastCommonSymptom, setLeastCommonSymptom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getLeastCommonSymptom();
      setLeastCommonSymptom(result);
    };
    fetchData();
  }, []);

  return (
    <div className="most-common-symptom-container">
      <div className="most-common-symptom-card">
        <h2>Síntoma Menos Común</h2>
        {leastCommonSymptom ? (
          <div className="symptom-details">
            <p><strong>Síntoma:</strong> {leastCommonSymptom.symptom}</p>
            <p><strong>Porcentaje:</strong> {leastCommonSymptom.percentage}%</p>
            <p><strong>Total:</strong> {leastCommonSymptom.count} casos</p>
          </div>
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
};

export default LeastCommonSymptom;

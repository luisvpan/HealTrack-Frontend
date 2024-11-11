// MostCommonSymptom.jsx
import React, { useEffect, useState } from 'react';
import getMostCommonSymptom from 'services/dashboard/get-most-common-symptom';
import './CSSs/MostCommonSymptom.css';

const MostCommonSymptom = () => {
  const [mostCommonSymptom, setMostCommonSymptom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMostCommonSymptom();
      setMostCommonSymptom(result);
    };
    fetchData();
  }, []);

  return (
    <div className="most-common-symptom-container">
      <div className="most-common-symptom-card">
        <h2>Síntoma Más Común</h2>
        {mostCommonSymptom ? (
          <div className="symptom-details">
            <p><strong>Síntoma:</strong> {mostCommonSymptom.symptom}</p>
            <p><strong>Porcentaje:</strong> {mostCommonSymptom.percentage}%</p>
            <p><strong>Total:</strong> {mostCommonSymptom.count} casos</p>
          </div>
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
};

export default MostCommonSymptom;

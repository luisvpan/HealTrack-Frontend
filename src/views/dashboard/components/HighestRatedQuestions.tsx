// HighestRatedQuestions.jsx
import React, { useEffect, useState } from 'react';
import getHighestRatedQuestions from 'services/dashboard/get-highest-rated-questions';
import './CSSs/HighestRatedQuestions.css';

type RatedQuestion = {
  question: string;
  rating: number;
};

const HighestRatedQuestions = () => {
  const [highestRatedQuestions, setHighestRatedQuestions] = useState<RatedQuestion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getHighestRatedQuestions();
      setHighestRatedQuestions(result.highestRatedQuestions || []); // Fallback a array vacío
    };
    fetchData();
  }, []);

  return (
    <div className="highest-rated-questions-container">
      <div className="highest-rated-questions-card">
        <h2>Preguntas con Mejor Calificación</h2>
        {highestRatedQuestions.length > 0 ? (
          <ul>
            {highestRatedQuestions.map((item, index) => (
              <li key={index}>
                <p><strong>Pregunta:</strong> {item.question}</p>
                <p><strong>Calificación:</strong> {item.rating}%</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
};

export default HighestRatedQuestions;

// LowestRatedQuestions.jsx
import React, { useEffect, useState } from 'react';
import getLowestRatedQuestions from 'services/dashboard/get-lowest-rated-questions';
import './CSSs/LowestRatedQuestions.css';

type RatedQuestion = {
  question: string;
  rating: number;
};

const LowestRatedQuestions = () => {
  const [lowestRatedQuestions, setLowestRatedQuestions] = useState<RatedQuestion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getLowestRatedQuestions();
      setLowestRatedQuestions(result || []); // Asignar directamente `result`
    };
    fetchData();
  }, []);

  return (
    <div className="lowest-rated-questions-container">
      <div className="lowest-rated-questions-card">
        <h2>Preguntas con Peor Calificación</h2>
        {lowestRatedQuestions.length > 0 ? (
          <ul>
            {lowestRatedQuestions.map((item, index) => (
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

export default LowestRatedQuestions;

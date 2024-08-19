import React, { useState } from 'react';
import { importDatabase } from 'services/databaseActions/import-database'; // Asegúrate de que la ruta sea correcta
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

const ImportDatabase = () => {
  const [file, setFile] = useState(null);
  const [importResult, setImportResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0] || null;
    
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      
      if (fileExtension === 'sql') {
        setFile(selectedFile);
        setErrorMessage('');
      } else {
        setFile(null);
        setErrorMessage('Solo se permiten archivos con la extensión .sql');
      }
    }
  };

  const handleImport = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const result = await importDatabase(formData);
        setImportResult(result);

        setTimeout(() => {
          navigate('/pages/login');
        }, 2000); // Redirige después de 2 segundos
        
      } catch (error) {
        console.error('Error importing database:', error);
        setErrorMessage('Ocurrió un error al intentar importar la base de datos.');
      }
    }
  };

  return (
    <div className="import-database-container">
      <div className="import-section">
        <h2>Importar Base de Datos</h2>
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="file-input" 
          accept=".sql"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button 
          className="import-button" 
          onClick={handleImport} 
          disabled={!file}
        >
          Importar
        </button>
        {importResult && <p className="import-result">{importResult}</p>}
      </div>
    </div>
  );
};

export default ImportDatabase;

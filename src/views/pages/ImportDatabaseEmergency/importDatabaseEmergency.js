import React, { useState } from 'react';
import { importDatabaseWithToken } from 'services/databaseActions/import-database-by-token';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

const ImportDatabaseEmergency = () => {
  const [file, setFile] = useState(null);
  const [importResult, setImportResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { token } = useParams();

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

        const result = await importDatabaseWithToken(formData, token);
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
        <h1>Importar Base de Datos</h1>
        <div></div>
        <h5>Al presionar el botón se sobre-escribirá la base de datos eliminando todos los cambios que se tengan hasta la fecha.</h5>
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

export default ImportDatabaseEmergency;

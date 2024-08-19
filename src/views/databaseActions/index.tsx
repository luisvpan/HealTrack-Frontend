import React, { useState } from 'react';
import { exportDatabase } from 'services/databaseActions/export-database';
import { importDatabase } from 'services/databaseActions/import-database';
import './styles.css';

const DatabaseActions: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleExport = async () => {
    try {
      const blob = await exportDatabase();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'database-backup.sql');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting database:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      
      if (fileExtension === 'sql') {
        setFile(selectedFile);
        // setErrorMessage('');  // Clear any previous error message
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
      } catch (error) {
        console.error('Error importing database:', error);
      }
    }
  };

  return (
    <div className="database-actions-container">
      <div className="export-section">
        <h2>Exportar Base de Datos</h2>
        <button className="export-button" onClick={handleExport}>Exportar</button>
      </div>

      <div className="divider" />

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

export default DatabaseActions;

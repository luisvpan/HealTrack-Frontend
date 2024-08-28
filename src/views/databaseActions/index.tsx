import React, { useState } from 'react';
import { Button, Box, Typography, Divider, TextField, Alert } from '@mui/material';
import { exportDatabase } from 'services/databaseActions/export-database';
import { importDatabase } from 'services/databaseActions/import-database';

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
        setErrorMessage('');  // Clear any previous error message
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
    <Box sx={{ p: 3, maxWidth: '600px', margin: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Exportar Base de Datos
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleExport}
          sx={{ mt: 2 }}
        >
          Exportar
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h4" gutterBottom>
          Importar Base de Datos
        </Typography>
        <TextField
          type="file"
          onChange={handleFileChange}
          inputProps={{ accept: '.sql' }}
          fullWidth
          sx={{ mt: 2 }}
        />
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleImport} 
          disabled={!file}
          sx={{ mt: 2 }}
        >
          Importar
        </Button>
        {importResult && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {importResult}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default DatabaseActions;

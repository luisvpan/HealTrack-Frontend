import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import sendResetPasswordEmail from '../../../services/users/sendResetPassword';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      await sendResetPasswordEmail(email);
      setMessage('Se ha enviado un correo con las instrucciones para restablecer tu contraseña.');
    } catch (error) {
      setMessage('Error al enviar el correo de recuperación.');
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      p: 2, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      borderRadius: 2 
    }}>
      <Typography variant="h6" component="h2" sx={{ mb: 1, fontSize: '1.5rem', textAlign: 'center' }}>
        Recuperar contraseña
      </Typography>
      <Typography variant="h6" component="h2" sx={{ mb: 2, fontSize: '1rem', textAlign: 'center' }}>
        Ingrese su correo electrónico, por favor
      </Typography>
      <TextField
        label="Correo electrónico"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
        Enviar
      </Button>
      {message && <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>{message}</Typography>}
    </Box>
  );
};

export default ForgotPassword;

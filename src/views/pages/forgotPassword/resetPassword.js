import { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import resetPassword from '../../../services/users/resetPassword';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    resetPassword({ token, newPassword: password })
      .then(() => {
        setMessage('Tu contraseña ha sido restablecida exitosamente.');
        setTimeout(() => {
          navigate('/pages/login');
        }, 2000); // Redirige después de 2 segundos
      })
      .catch(() => {
        setMessage('Error al restablecer la contraseña.');
      });
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh', // Hace que la sección abarque toda la pantalla
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '95%', 
          height: '95%', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          p: 2,
          border: '1px solid #000',
          borderRadius: 10,
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" component="h2" sx={{ mb: 2, fontSize: '40px' }}>
          Restablecer contraseña
        </Typography>
        <TextField
          label="Nueva contraseña"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: '55%' }} // Misma anchura que el botón
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField
          label="Confirmar nueva contraseña"
          variant="outlined"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ width: '55%', mt: 2 }} // Misma anchura que el botón
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2, width: '55%', fontSize: "20px" }}>
          Restablecer
        </Button>
        {message && <Typography variant="body2" sx={{ mt: 2 }}>{message}</Typography>}
      </Box>
    </Box>
  );
};

export default ResetPassword;

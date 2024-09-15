import { useState } from 'react';
import { Modal, Box, Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import changePassword from "../../../../services/users/change-password";
import { useAppSelector } from "store";

const ChangePasswordModal = ({ open, handleClose }) => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({ email: false, currentPassword: false, newPassword: false });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const currentEmail = useAppSelector((state) => state.auth.user.email);

  const handleSubmit = async () => {
    const newErrors = {
      email: email === '' || email !== currentEmail,
      currentPassword: currentPassword === '',
      newPassword: newPassword === '',
    };
    setErrors(newErrors);

    const isFormValid = !newErrors.email && !newErrors.currentPassword && !newErrors.newPassword;

    if (isFormValid) {
      try {
        await changePassword({ userEmail: email, currentPassword, newPassword });
        handleClose();
      } catch (error) {
        console.error("Error al cambiar la contraseña", error);
      }
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          borderRadius: 5,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Cambiar contraseña
        </Typography>
        <TextField
          label="Correo"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          helperText={errors.email ? (email !== currentEmail ? 'Correo inválido' : 'Campo vacío inválido') : ''}
        />
        <TextField
          label="Contraseña actual"
          variant="outlined"
          type={showCurrentPassword ? 'text' : 'password'}
          fullWidth
          margin="normal"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={errors.currentPassword}
          helperText={errors.currentPassword ? 'Campo vacío inválido' : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField
          label="Nueva contraseña"
          variant="outlined"
          type={showNewPassword ? 'text' : 'password'}
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={errors.newPassword}
          helperText={errors.newPassword ? 'Campo vacío inválido' : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Cambiar contraseña
        </Button>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;

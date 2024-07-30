import { useState } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import changePassword from "../../../../services/users/change-password";
import { useAppSelector } from "store";

const ChangePasswordModal = ({ open, handleClose }) => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const currentEmail = useAppSelector((state) => state.auth.user.email);
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({ email: false, currentPassword: false, newPassword: false });

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
        // Maneja el error aquí (por ejemplo, mostrar un mensaje de error al usuario)
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
          type="password"
          fullWidth
          margin="normal"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={errors.currentPassword}
          helperText={errors.currentPassword ? 'Campo vacío inválido' : ''}
        />
        <TextField
          label="Nueva contraseña"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={errors.newPassword}
          helperText={errors.newPassword ? 'Campo vacío inválido' : ''}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Cambiar contraseña
        </Button>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;

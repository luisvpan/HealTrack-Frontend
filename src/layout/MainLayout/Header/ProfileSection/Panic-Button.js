import { useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import triggerPanicButton from 'services/patients/panic-buttom';

const PanicButtonModal = ({ open, handleClose, patientId }) => {
  const [loading, setLoading] = useState(false);

  const handlePanic = async () => {
    setLoading(true);
    try {
      await triggerPanicButton(patientId);
      handleClose();
    } catch (error) {
      console.error("Error al activar el botón de pánico", error);
    } finally {
      setLoading(false);
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
          width: 300,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          borderRadius: 5,
          boxShadow: 24,
          p: 3,
          textAlign: 'center',
        }}
      >
        <Typography sx={{ fontSize: "20px" }}>
          Activar botón de pánico
        </Typography>
        <Typography sx={{ mt: 2 }}>
          ¿Estás seguro de que deseas activar el botón de pánico?
        </Typography>
        <p></p>
        <Button
          variant="contained"
          color="error"
          onClick={handlePanic}
          sx={{
            mt: 3,
            display: 'block',
            margin: '0 auto', 
            minWidth: 100,
          }}
          disabled={loading}
        >
          {loading ? "Activando..." : "Sí"}
        </Button>
      </Box>
    </Modal>
  );
};

export default PanicButtonModal;

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, ButtonBase, Modal, IconButton } from '@mui/material';
import { IconAlertCircle } from '@tabler/icons'; // Importa un ícono de Tabler Icons
import PanicButtonModal from './Panic-Button';
import { useAppSelector } from "store";

// ==============================|| PANIC BUTTON ||============================== //

const PanicButtonSection = ({ patientId }) => {
  const theme = useTheme();
  const user = useAppSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    setModalOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down('md')]: {
            mr: 2
          }
        }}
      >
        <ButtonBase sx={{ borderRadius: '12px' }}>
          <IconButton
            color="error"
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              }
            }}
          >
            <IconAlertCircle /> {/* Usa el icono de Tabler Icons */}
          </IconButton>
        </ButtonBase>
      </Box>
      <Modal
        open={modalOpen}
        onClose={handleClose}
      >
        <PanicButtonModal open={modalOpen} handleClose={handleClose} patientId={user?.id} />
      </Modal>
    </>
  );
};

export default PanicButtonSection;

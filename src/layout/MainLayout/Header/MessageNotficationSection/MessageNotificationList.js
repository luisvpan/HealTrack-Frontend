import React, { useState, useEffect } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import {
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Modal,
  Box
} from '@mui/material';
import { IconTrash, IconX } from '@tabler/icons';
import { deleteMessageNotification } from 'services/messageNotifications/delete-message-notifications';
import { deleteAllMessageNotificationsByUserId } from 'services/messageNotifications/delete-all-message-notifications';
import getMessageNotificationsByUserId from 'services/messageNotifications/get-message-notifications';
import markMessageMessageNotificationAsRead from 'services/messageNotifications/mark-as-read-message';
import { useAppSelector } from 'store';
import { format } from 'date-fns';

// styles
const ListItemWrapper = styled('div')(({ theme, isRead }) => ({
  cursor: 'pointer',
  padding: 16,
  backgroundColor: isRead ? 'inherit' : theme.palette.action.focus,
  '&:hover': {
    backgroundColor: theme.palette.action.hover, // Color ligeramente más claro en lugar de transparente
  },
  '& .MuiListItem-root': {
    padding: 0
  }
}));

const MessageNotificationList = ({ onNotificationRead }) => {
  const theme = useTheme();
  const user = useAppSelector((state) => state.auth.user);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false); // Nuevo estado para el modal de confirmación

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user) {
        const data = await getMessageNotificationsByUserId(user.id);
        setNotifications(data);
      }
    };

    fetchNotifications();
  }, [user]);

  const handleDeleteNotification = async (id) => {
    await deleteMessageNotification(id);
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleDeleteAllNotifications = async () => {
    if (user) {
      await deleteAllMessageNotificationsByUserId(user.id);
      setNotifications([]);
    }
    setOpenConfirmModal(false); // Cierra el modal de confirmación
  };

  const handleOpenModal = async (notification) => {
    setSelectedNotification(notification);
    setOpenModal(true);
    if (!notification.isRead) {
      await markMessageMessageNotificationAsRead(notification.id);
      onNotificationRead();
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedNotification(null);
  };

  const handleOpenConfirmModal = () => {
    setOpenConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  };

  return (
    <>
      <Button
        onClick={handleOpenConfirmModal}
      >
        Eliminar todas las notificaciones
      </Button>

      <List
        sx={{
          width: '100%',
          maxWidth: 330,
          py: 0,
          borderRadius: '10px',
          [theme.breakpoints.down('md')]: {
            maxWidth: 300
          },
          '& .MuiDivider-root': {
            my: 0
          }
        }}
      >
        {notifications.map((notification) => (
          <ListItemWrapper key={notification.id} isRead={notification.isRead}>
            <ListItem onClick={() => handleOpenModal(notification)}>
              <ListItemText
                primary={notification.title}
                secondary={format(new Date(notification.createdAt), 'dd-MM-yyyy HH:mm')}
              />
              <ListItemSecondaryAction
                sx={{
                  right: -17, // Asegura que el botón esté en el extremo derecho
                  marginLeft: '10px' // Agrega un margen entre el texto y el botón
                }}
              >
                <Button onClick={(e) => { e.stopPropagation(); handleDeleteNotification(notification.id); }}>
                  <IconTrash stroke={1.5} size="1rem" />
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </ListItemWrapper>
        ))}
      </List>

      {/* Modal for notification details */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
      >
        <Box sx={{ ...modalStyle }}>
          <IconX onClick={handleCloseModal} style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }} />
          {selectedNotification && (
            <Card>
              <CardContent sx={{ position: 'relative', p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', mb: 2 }}
                >
                  {selectedNotification.title}
                </Typography>
                <Box
                  sx={{
                    bgcolor: 'grey.200',
                    p: 2,
                    borderRadius: 2,
                    fontSize: '12px',
                    maxHeight: '200px', // Ajusta la altura máxima según lo necesites
                    overflowY: 'auto'  // Añade un scroll vertical
                  }}
                >
                  <Typography 
                    variant="body2"
                    sx={{ fontSize: '15px', fontWeight: 'bold' }}
                  >
                    {selectedNotification.message}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Modal>

      {/* Confirm Delete All Modal */}
      <Modal
        open={openConfirmModal}
        onClose={handleCloseConfirmModal}
      >
        <Box sx={{ ...confirmModalStyle }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            ¿Quieres borrar todas tus notificaciones?
          </Typography>
          <Button
            onClick={handleDeleteAllNotifications}
            sx={{ backgroundColor: 'green', color: 'white', mr: 2 }}
          >
            Sí
          </Button>
          <Button
            onClick={handleCloseConfirmModal}
            sx={{ backgroundColor: 'red', color: 'white' }}
          >
            No
          </Button>
        </Box>
      </Modal>
    </>
  );
};

// Style for modals
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 4,
  p: 4
};

const confirmModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
  textAlign: 'center'
};

export default MessageNotificationList;

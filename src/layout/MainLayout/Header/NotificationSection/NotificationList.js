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
import { deleteNotification } from 'services/notifications/delete-notifications';
import { deleteAllNotificationsByEmployeeId } from 'services/notifications/delete-all-notifications';
import getNotificationsByUserId from 'services/notifications/get-notifications';
import markNotificationAsRead from 'services/notifications/mark-as-read';
import { useAppSelector } from 'store';
import { format } from 'date-fns';

// styles
const ListItemWrapper = styled('div')(({ theme, isRead }) => ({
  cursor: 'pointer',
  padding: 16,
  backgroundColor: isRead ? 'inherit' : theme.palette.action.focus,
  '&:hover': {
    background: theme.palette.primary.light
  },
  '& .MuiListItem-root': {
    padding: 0
  }
}));

const NotificationList = ({ onNotificationRead }) => {
  const theme = useTheme();
  const user = useAppSelector((state) => state.auth.user);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user) {
        const data = await getNotificationsByUserId(user.id);
        setNotifications(data);
      }
    };

    fetchNotifications();
  }, [user]);

  const handleDeleteNotification = async (id) => {
    await deleteNotification(id);
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleDeleteAllNotifications = async () => {
    if (user) {
      await deleteAllNotificationsByEmployeeId(user.id);
      setNotifications([]);
    }
  };

  const handleOpenModal = async (notification) => {
    setSelectedNotification(notification);
    setOpenModal(true);
    if (!notification.isRead) {
      await markNotificationAsRead(notification.id);
      onNotificationRead();
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedNotification(null);
  };

  return (
    <>
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
                  right: -17,  // Asegura que el botón esté en el extremo derecho
                  marginLeft: '10px'  // Agrega un margen entre el texto y el botón
                }}
              >
                <Button onClick={() => handleDeleteNotification(notification.id)}>
                  <IconTrash stroke={1.5} size="1rem" />
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </ListItemWrapper>
        ))}
        {notifications.length > 0 && (
          <Button onClick={handleDeleteAllNotifications}>
            Eliminar todas
          </Button>
        )}
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
              <CardContent>
                <Typography sx = {{variant:"h6", fontSize: "20px"}}>{selectedNotification.title}</Typography>
                <p></p>
                <Typography variant="body2">{selectedNotification.message}</Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Modal>
    </>
  );
};

// Style for modal
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

export default NotificationList;

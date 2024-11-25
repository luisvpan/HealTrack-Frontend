import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  Grid,
  Paper,
  Popper,
  ClickAwayListener,
  Typography,
  useMediaQuery,
  Badge
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MainCard from 'components/cards/MainCard';
import Transitions from 'components/extended/Transitions';
import MessageNotificationList from './MessageNotificationList';
import { IconMessage } from '@tabler/icons';
import { useAppSelector } from 'store';
import { getUnreadMessageNotificationsCount } from 'services/messageNotifications/get-message-notifications-unread';
import { io } from 'socket.io-client';
import { API_BASE_URL } from "config/constants";
import store from "store";

// ==============================|| MESSAGE NOTIFICATION ||============================== //

const MessageNotificationSection = () => {
  const theme = useTheme();
  const user = useAppSelector((state) => state.auth.user);
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const URL = API_BASE_URL.endsWith("/api/v1")
    ? API_BASE_URL.replace("/api/v1", "")
    : API_BASE_URL;

  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const anchorRef = useRef(null);
  const token = store.getState().auth.token;
  const socket = useRef(null);

  useEffect(() => {
    if (!socket.current && URL) {
      socket.current = io(URL, {
        extraHeaders: {
          Authorization: 'Bearer ' + token,
        },
      });

      socket.current.on('connect', () => {
        console.log('Socket connected');
      });
      
      socket.current.on('unread_notifications_count', (data) => {
        const currentUserUnreadCount = data.data[user?.id];
        if (currentUserUnreadCount !== undefined) {
          console.log('New unread count:', currentUserUnreadCount);
          setUnreadCount(currentUserUnreadCount);
        }
      });      

      // Cleanup on component unmount
      return () => {
        if (socket.current) {
          socket.current.disconnect();
        }
      };
    }
  }, [token, URL, user]);

  // Fetch unread notifications count on mount
  const fetchUnreadNotificationsCount = useCallback(async () => {
    try {
      const count = await getUnreadMessageNotificationsCount(user?.id);
      setUnreadCount(count);
    } catch (error) {
      console.error('Error fetching unread notifications count:', error);
    }
  }, [user]);

  useEffect(() => {
    fetchUnreadNotificationsCount();
  }, [fetchUnreadNotificationsCount]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleNotificationRead = async () => {
    await fetchUnreadNotificationsCount(); // Update unread notifications count
  };

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down('md')]: {
            mr: 2,
          },
        }}
      >
        <ButtonBase sx={{ borderRadius: '12px' }}>
          <Badge
            badgeContent={unreadCount}
            color="error"
            invisible={unreadCount === 0}
            sx={{
              '& .MuiBadge-dot': {
                backgroundColor: theme.palette.error.main,
              },
            }}
          >
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                transition: 'all .2s ease-in-out',
                background: theme.palette.secondary.light,
                color: theme.palette.secondary.dark,
                '&[aria-controls="menu-list-grow"],&:hover': {
                  background: theme.palette.secondary.dark,
                  color: theme.palette.secondary.light,
                },
              }}
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              color="inherit"
            >
              <IconMessage stroke={1.5} size="1.3rem" />
            </Avatar>
          </Badge>
        </ButtonBase>
      </Box>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? 5 : 0, 20],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                      <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }}>
                        <Grid item>
                          <Typography variant="subtitle1">Notificaciones</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}>
                        <MessageNotificationList onNotificationRead={handleNotificationRead} />
                      </PerfectScrollbar>
                    </Grid>
                  </Grid>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default MessageNotificationSection;

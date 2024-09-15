import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Typography } from '@mui/material';
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import MessageNotificationSection from './MessageNotficationSection';
import PanicButtonSection from './PanicButton';
import { IconMenu2 } from '@tabler/icons';
import { useAppSelector } from 'store';
import { AllRole } from "core/users/types";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  const user = useAppSelector((state) => state.auth.user);

  const isAdmin = user?.role === AllRole.ADMIN;
  const isSpecialist = user?.role === AllRole.SPECIALIST;
  const isAssistant = user?.role === AllRole.ASSISTANT;
  const isPatient = user?.role === AllRole.PATIENT;

  const getRoleName = (role) => {
    switch(role) {
      case AllRole.ADMIN:
        return 'Administrador(a)';
      case AllRole.ASSISTANT:
        return 'Enfermero(a)';
      case AllRole.SPECIALIST:
        return 'Especialista';
      case AllRole.PATIENT:
        return 'Paciente';
      default:
        return role;
    }
  };

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          },
          position: 'relative',
          alignItems: 'center'
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>

        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
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
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      {false && <SearchSection />}
      <Box sx={{ flexGrow: 1 }} />

        {/* Nombre, Apellido y Rol del Usuario, display es un rango */}
        <Typography variant="body1" sx={{ marginRight: '1rem', fontSize: "30px", display: { xs: 'none', md: 'block' } }}>
          {`${user?.name}, ${getRoleName(user?.role)}`}
        </Typography>
            
        {/* +++++++ DENTRO DEL BOX +++++++ */}

        {/* Panic Button */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          {(isPatient) && <PanicButtonSection />}
        </Box>

        {/* notifications */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          {(isSpecialist || isAssistant) && <NotificationSection />}
        </Box>
        
        {/* Messagenotifications */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          {(!isAdmin) && <MessageNotificationSection />}
        </Box>

      <Box sx={{ flexGrow: 1 }} />
      
      {/* +++++++ FUERA DEL BOX +++++++ */}

      {/* Panic Button */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        {(isPatient) && <PanicButtonSection />}
      </Box>

      {/* notifications */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        {(isSpecialist || isAssistant) && <NotificationSection />}
      </Box>
      
      {/* Messagenotifications */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        {(!isAdmin) && <MessageNotificationSection />}
      </Box>

      {/* Profile Section */}
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;

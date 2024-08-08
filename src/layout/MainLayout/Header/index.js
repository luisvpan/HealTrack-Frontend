import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Typography } from '@mui/material';
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import { IconMenu2 } from '@tabler/icons';
import useScriptRef from 'hooks/useScriptRef';
import { useAppSelector } from 'store';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  const scriptRef = useScriptRef();

  // Obtén la información del usuario desde el store
  const user = useAppSelector((state) => state.auth.user);

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

        {/* App Name */}
        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '57%',
            transform: 'translate(-50%, -50%)',
            color: theme.palette.text.primary,
            zIndex: 1,
            fontSize: '1.2rem'
          }}
        >
          HealTrack
        </Typography>

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

      {/* Nombre, Apellido y Rol del Usuario */}
      <Typography variant="body1" sx={{ marginRight: '1rem', fontSize: "40px" }}>
        {`${user?.name}, ${user?.role}`}
      </Typography>

      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;

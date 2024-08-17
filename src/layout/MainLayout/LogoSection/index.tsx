import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'store';
import { openMenu } from 'store/customizationSlice';

// material-ui
import { ButtonBase, Typography } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'components/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const theme = useTheme();
  const defaultId = useAppSelector((state) => state.customization.defaultId);
  const dispatch = useAppDispatch();

  const onClick = () => dispatch(openMenu(defaultId));

  return (
    <ButtonBase disableRipple
      onClick={onClick}
      component={Link}
      to={config.defaultPath}
    >
      <Logo />

      {/* App Name */}
      <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '72%',
            transform: 'translate(-50%, -50%)',
            color: theme.palette.text.primary,
            zIndex: 1,
            fontSize: '1.2rem'
          }}
        >
          HealTrack
        </Typography>

    </ButtonBase>
  );
};

export default LogoSection;

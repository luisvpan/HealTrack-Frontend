import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery, Box } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import Logo from 'components/Logo';
import AuthFooter from 'components/cards/AuthFooter';

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh', position: 'relative' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)', position: 'relative' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3, position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    <Box
                      sx={{
                        position: 'relative',
                        width: 'fit-content',
                        left: '-25%', // Move logo to the left
                      }}
                    >
                      <Link to="#">
                        <Logo />
                      </Link>
                      {/* App Name */}
                      <Typography
                        variant="h4"
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '88%', // Move text towards the center-left
                          transform: 'translate(-50%, -50%)', // Center the text over the logo
                          color: theme.palette.text.primary,
                          zIndex: 1, // Ensure it's above the Logo
                          fontSize: '2rem' // Adjust font size as needed
                        }}
                      >
                        HealTrack
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                            ¡Hola, Bienvenido de vuelta 👋!
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                            Introduce tus credenciales para continuar
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;

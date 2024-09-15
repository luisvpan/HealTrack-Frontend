import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Link,
  Modal,
} from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import AnimateButton from "components/extended/AnimateButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import login from "services/auth/login";
import { authUser } from "store/authSlice";
import { useAppDispatch, useAppSelector } from "store";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../../forgotPassword/ForgotPassword";

const FirebaseLogin = ({ ...others }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [rememberCheck, setRememberCheck] = useState(true);
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuth);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const handleOpenForgotPassword = () => setOpenForgotPassword(true);
  const handleCloseForgotPassword = () => setOpenForgotPassword(false);

  if (isAuthenticated) {
    window.location.href = window.location.origin + "/";
    return null;
  }

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Necesita ser un email válido")
            .max(255)
            .required("El email es requerido"),
          password: Yup.string().max(255).required("Contraseña es requerida"),
        })}
        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
          login({
            email: values.email,
            password: values.password,
          })
            .then((user) => {
              dispatch(authUser({ ...user, remember: rememberCheck }));
              setErrors({ submit: null });
              setSubmitting(true);
              navigate("/");
            })
            .catch((error) => {
              setErrors({ submit: error.getMessage() });
              setStatus({ success: false });
              setSubmitting(false);
            });
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(event);
            }}
            {...others}
          >
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                Email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberCheck}
                    onChange={(event) => setRememberCheck(event.target.checked)}
                    name="remember"
                    color="primary"
                  />
                }
                name="remember"
                label="Recordar contraseña"
              />
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Entrar
                </Button>
              </AnimateButton>
            </Box>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                ¿Olvidó contraseña?{" "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleOpenForgotPassword}
                >
                  Pulse aquí
                </Link>
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
      <Modal open={openForgotPassword} onClose={handleCloseForgotPassword}>
        <Box sx={{ ...modalStyle }}>
          <ForgotPassword />
        </Box>
      </Modal>
    </>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 4, // añadir borde redondeado
  boxShadow: 24,
  padding: 4,
};

export default FirebaseLogin;

import { Box, Stack, Typography } from "@mui/material";
import { useAppSelector } from "store";

const MainPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h3">Bienvenido a la aplicación, {user?.name}</Typography>
        <Typography variant="body1">
          Esta es la página principal de la aplicación donde encontrarás información relevante.
        </Typography>
      </Stack>
    </Box>
  );
};

export default MainPage;

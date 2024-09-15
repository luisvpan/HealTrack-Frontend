import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import store from "store";

export interface Props {
  warning: boolean;
  isLoading: boolean;
}

const WarningBanner: React.FC<Props> = ({ warning, isLoading }) => {
  const user = store.getState().auth.user;

  if (isLoading) {
    return <CircularProgress />;
  }

  if (user?.role !== "patient") {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: warning ? "green" : "red",
        padding: 2,
        borderRadius: 2,
        color: "white",
        marginTop: 2,
      }}
    >
      <Typography variant="body1">
        {warning
          ? "¡Ya ha subido el reporte del día de hoy!"
          : "Nos interesa saber cómo está su estado ¡Suba el reporte diario!"}
      </Typography>
      {warning ? (
        <CheckCircleIcon sx={{ marginLeft: 1 }} />
      ) : (
        <NotificationsIcon sx={{ marginLeft: 1 }} />
      )}
    </Box>
  );
};

export default WarningBanner;

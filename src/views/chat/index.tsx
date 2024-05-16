import React from "react";
import { Box, TextField, Button, Paper } from "@mui/material";
import ChatMessage from "./ChatMessage";

const Chat = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ flexGrow: 1, p: 2, overflow: "auto" }}>
        <ChatMessage
          message="Hola, ¿cómo estás?"
          sender="person1"
          timestamp="10:00 AM"
        />
        <ChatMessage
          message="Estoy bien, gracias. ¿Y tú?"
          sender="person2"
          timestamp="10:01 AM"
        />
        {/* Agregar más mensajes según sea necesario */}
      </Box>
      <Paper sx={{ display: "flex", p: 2 }}>
        <TextField
          fullWidth
          placeholder="Escribe un mensaje..."
          variant="outlined"
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary">
          Enviar
        </Button>
      </Paper>
    </Box>
  );
};

export default Chat;

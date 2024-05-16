import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const ChatMessage = ({ message, sender, timestamp }) => {
  const isPerson1 = sender === "person1";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isPerson1 ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          backgroundColor: isPerson1 ? "primary.light" : "secondary.light",
          color: "black",
          maxWidth: "70%",
        }}
      >
        <Typography variant="body1">{message}</Typography>
        <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
          {timestamp}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ChatMessage;

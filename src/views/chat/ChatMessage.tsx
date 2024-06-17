import { Box, Typography, Paper } from "@mui/material";

const ChatMessage = ({ message, sender, timestamp, attatchment }: Props) => {
  const isPerson1 = sender === "person1";
  const today = new Date();
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
        {!attatchment ? (
          <>
            <Typography variant="body1">{message}</Typography>
            <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
              {today.toDateString() === new Date(timestamp).toDateString()
                ? new Date(timestamp).toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : new Date(timestamp).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
            </Typography>
          </>
        ) : (
          <Box
            component="img"
            src={attatchment}
            sx={{ maxWidth: "250px", maxHeight: "250px" }}
          />
        )}
      </Paper>
    </Box>
  );
};

export interface Props {
  message: string;
  sender: string;
  timestamp: string;
  attatchment?: string;
}
export default ChatMessage;

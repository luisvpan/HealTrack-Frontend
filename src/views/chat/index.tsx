import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Modal,
} from "@mui/material";
import ChatMessage from "./ChatMessage";
import { ChatInfo, Message } from "core/chats/types";
import store from "store";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import getMessagesById from "services/messages/get-messages-by-id.service";
import sendMessage from "services/messages/create-message.service";
import sendImage from "services/messages/upload-chat-image.service";
import { useNavigate, useParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import MainCard from "components/cards/MainCard";
import { AllRole, TranslatedRole } from "core/users/types";
import BackendError from "exceptions/backend-error";
import { API_BASE_URL } from "config/constants";

const Chat = () => {
  const navigate = useNavigate();
  const [messageToSend, setMessageToSend] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { chatId } = useParams<{ chatId: string }>();

  const token = store.getState().auth.token;
  const userId = store.getState().auth.user?.id;
  const user = store.getState().auth.user;
  const URL = API_BASE_URL!.endsWith("/api/v1")
    ? API_BASE_URL!.replace("/api/v1", "")
    : API_BASE_URL;
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socket.current && URL) {
      socket.current = io(URL, {
        extraHeaders: {
          Authorization: "Bearer " + token,
        },
      });
    }
  }, [token]);

  const getAllMessages = useCallback(async () => {
    try {
      const response = await getMessagesById(Number(chatId));
      setMessages(response.data.items);
      setChatInfo(response.data.chat);

      /*
      if (response.data.chat.created_by.id == user?.id) {
        setOther(response.data.chat.users[0].id);
      } else {
        setOther(response.data.chat.created_by.id);
      } */
    } catch (error) {
      console.log(error);
      if (error instanceof BackendError && error.statusCode === 404) {
        navigate("/chat-list");
      }
    }
  }, [chatId, navigate]);

  useEffect(() => {
    getAllMessages();
  }, [getAllMessages]);

  const submitMessage = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        if (messageToSend === "") return;
        await sendMessage(messageToSend, Number(chatId));
        setMessageToSend("");

        socket.current!.emit("send_message", {
          user,
          message: { message: messageToSend },
        });
      } catch (error) {
        console.log(error);
      }
    },
    [chatId, messageToSend, user]
  );

  const handleImageUpload = async () => {
    if (imageFile) {
      try {
        await sendImage(imageFile, Number(chatId));
        setImageFile(null);
        setIsModalOpen(false);

        socket.current!.emit("send_message", {
          user,
          message: { message: "Image sent" },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    socket.current!.on("connect", () => {
      console.log("Socket connected");
    });
    socket.current!.on("send_message", (newMessage: any) => {
      const adaptedMessage = {
        id: newMessage.message.id,
        message: newMessage.message.message,
        was_edited: newMessage.message.was_edited,
        createdAt: newMessage.message.createdAt,
        updatedAt: newMessage.message.updatedAt,
        user: newMessage.user,
        attachment: newMessage.message.attachment,
      };

      setMessages((prevMessages) => {
        if (!prevMessages.some((message) => message.id === adaptedMessage.id)) {
          return [...prevMessages, adaptedMessage];
        } else {
          return prevMessages;
        }
      });
    });
  }, []);

  return (
    <MainCard
      title={
        <Box>
          {chatInfo && (
            <span className="details">
              {chatInfo.created_by.id === user!.id ? (
                <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
                  {chatInfo.users[0].name} {chatInfo.users[0].lastname}{" "}
                  <span className="role">
                    ({TranslatedRole[chatInfo.users[0].role as AllRole]})
                  </span>
                </Typography>
              ) : (
                <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
                  {chatInfo.created_by.name} {chatInfo.created_by.lastname}{" "}
                  <span className="role">
                    ({TranslatedRole[chatInfo.created_by.role as AllRole]})
                  </span>
                </Typography>
              )}
              {
                //<p>En línea</p> //Ver si se implementa
              }
            </span>
          )}
        </Box>
      }
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          background: "",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            overflow: "auto",
            maxHeight: "450px",
            background: "#EEF2F6",
            borderRadius: "14px",
          }}
        >
          {messages.map((item: Message) => (
            <Box key={item.id}>
              {item.user.id !== userId ? (
                <ChatMessage
                  message={item.message}
                  sender="person1"
                  timestamp={item.updatedAt}
                  attatchment={item.attachment!}
                />
              ) : (
                <ChatMessage
                  message={item.message}
                  sender="person2"
                  timestamp={item.updatedAt}
                  attatchment={item.attachment!}
                />
              )}
            </Box>
          ))}
        </Box>

        <Box component="form" onSubmit={submitMessage}>
          <Paper sx={{ display: "flex", p: 2 }}>
            <TextField
              fullWidth
              placeholder="Escribe un mensaje..."
              variant="outlined"
              sx={{ mr: 2 }}
              onChange={(e) => {
                setMessageToSend(e.target.value);
              }}
              value={messageToSend}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsModalOpen(true)}
              style={{ minWidth: 'auto', padding: 10 }}
              sx={{ mr: 2 }}
            >
              <PhotoCameraIcon />
            </Button>

            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              sx={{ mr: 2 }}
            >
              Enviar
            </Button>
          </Paper>
        </Box>
      </Box>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cargar Imagen
          </Typography>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              if (e.target.files) setImageFile(e.target.files[0]);
            }}
          />
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleImageUpload}
            >
              Enviar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setIsModalOpen(false)}
              sx={{ ml: 2 }}
            >
              Cerrar
            </Button>
          </Box>
        </Box>
      </Modal>
    </MainCard>
  );
};

export default Chat;

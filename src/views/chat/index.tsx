import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import ChatMessage from "./ChatMessage";
import { ChatInfo, Message } from "core/chats/types";
import store from "store";

import getMessagesById from "services/messages/get-messages-by-id.service";
import sendMessage from "services/messages/create-message.service";
import { useParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import MainCard from "components/cards/MainCard";
import { AllRole, TranslatedRole } from "core/users/types";

const Chat = () => {
  const [messageToSend, setMessageToSend] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const { chatId } = useParams<{ chatId: string }>();

  const token = store.getState().auth.token;
  const userId = store.getState().auth.user?.id;
  const user = store.getState().auth.user;

  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io("http://localhost:3000", {
        extraHeaders: {
          Authorization: "Bearer " + token,
        },
      });
    }
  }, [token]);

  const getAllMessages = useCallback(async () => {
    try {
      console.log(chatId);
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
    }
  }, []);

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
    [messageToSend]
  );

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
                //<p>En línea</p>
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
        <Box sx={{ flexGrow: 1, p: 2, overflow: "auto", maxHeight: "450px" }}>
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
            <Button variant="contained" color="primary" type="submit">
              Enviar
            </Button>
          </Paper>
        </Box>
      </Box>
    </MainCard>
  );
};

export default Chat;

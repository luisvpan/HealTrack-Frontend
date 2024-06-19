import { Box, IconButton, Typography } from "@mui/material";
import MainCard from "components/cards/MainCard";
import { AllRole, TranslatedRole } from "core/users/types";
import { useCallback, useEffect, useState } from "react";
import postChat from "services/chats/create-chat.service";
import AddIcon from "@mui/icons-material/Add";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import useData from "./useData";
import { useAppDispatch } from "store";
import { setErrorMessage, setSuccessMessage } from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import getAllUsers from "services/users/get-all-users";

const CreateChat = () => {
  const [users, setUsers] = useState<any>([]);
  const { fetchChats } = useData();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const fetchAllUsers = useCallback(async () => {
    try {
      const response = await getAllUsers();
      setUsers(response);
      console.log(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    }
  }, []);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const createChat = useCallback(async (userId: number) => {
    try {
      await postChat(userId);
      fetchChats();
      dispatch(setSuccessMessage("Se ha creado un chat correctamente"));
      navigate("/chat-list");
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    }
  }, []);

  const goToChatList = useCallback(() => {
    navigate("/chat-list");
  }, []);
  return (
    <MainCard
      title={
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <IconButton
            sx={{ width: "50px", height: "50px" }}
            onClick={() => goToChatList()}
          >
            <ArrowBack />
          </IconButton>
          <Typography sx={{ fontSize: "20px", fontWeight: "800" }}>
            ¡Crea un chat con un usuario!
          </Typography>
        </Box>
      }
    >
      <Box
        sx={{
          background: "#EEF2F6",
          p: "16px",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxHeight: "1000px",
          overflow: "auto",
        }}
      >
        {users.map((user: any) => (
          <Box
            key={user.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "16px",
              mx: { md: "100px", lg: "150px", xl: "250px" },
              background: "white",
              px: "26px",
              py: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontSize: "20px", fontWeight: "800" }}>
                  {user.name && user.name} {user.lastname && user.lastname}
                </Typography>

                <Typography sx={{ fontSize: "16px" }}>
                  Rol: {TranslatedRole[user.role as AllRole]}
                </Typography>
              </Box>
              <IconButton
                onClick={() => {
                  createChat(user.id);
                }}
                sx={{ width: "50px", height: "50px" }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </MainCard>
  );
};

export default CreateChat;

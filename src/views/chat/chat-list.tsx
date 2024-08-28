import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { IconCirclePlus, IconUserCircle } from "@tabler/icons";
import MainCard from "components/cards/MainCard";
import { Box, Button, Typography } from "@mui/material";
import { FunctionComponent, useCallback } from "react";
import useData from "./useData";
import { Chat } from "core/chats/types";
import { AllRole } from "core/users/types";
import store from "store";

const ChatList: FunctionComponent<Prop> = ({ className }) => {
  const role = store.getState().auth.user?.role;
  const { items } = useData();
  const user = store.getState().auth.user;
  const navigate = useNavigate();

  const goToCreate = useCallback(() => {
    navigate("/chat/create");
  }, [navigate]);

  const goToChat = useCallback(
    (chatId: number) => {
      navigate(`/chat/${chatId}`);
    },
    [navigate]
  );

  // Función para truncar texto
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <MainCard
      className={className}
      headerClass={"chats-header"}
      title={
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          alignItems: "center",
          justifyContent: "space-between",
          marginRight: "40px",
          marginLeft: "40px",
        }}>
          <Typography variant="h4" className={"title-header"}>
            Chats
          </Typography>
          {role !== AllRole.PATIENT && (
            <Button
              color="primary"
              variant={"outlined"}
              onClick={goToCreate}
              startIcon={<IconCirclePlus />}
              sx={{ fontSize: "0.8rem", padding: "5px 10px" }}
            >
              Crear
            </Button>
          )}
        </Box>
      }
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "10px",
          flexGrow: 1,
        }}
      >
        {items.map((item: Chat) => (
          <Button
            key={item.id}
            sx={{
              display: "grid",
              gridTemplateColumns: "50px 1fr auto",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #ccc",
              textTransform: "none",
            }}
            onClick={() => goToChat(item.id)}
          >
            <Box
              sx={{
                height: "40px",
                width: "40px",
                maxHeight: "40px",
                maxWidth: "40px",
              }}
            >
              <IconUserCircle height="40px" width="40px" color="gray" />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" noWrap>
                {item.created_by.id === user!.id
                  ? `${item.users[0].name} ${item.users[0].lastname}`
                  : `${item.created_by.name} ${item.created_by.lastname}`}
              </Typography>
              <Typography
                variant="body2"
                noWrap
                color="primary"
                sx={{ color: "blue" }} // Texto en color azul
              >
                {!item.last_message
                  ? "Sé el primero en escribir un mensaje!"
                  : truncateText(item.last_message.message, 20)}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              {item.unread_messages_count > 0 && (
                <Box
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    borderRadius: "50%",
                    padding: "5px",
                    minWidth: "20px",
                    textAlign: "center",
                  }}
                >
                  {item.unread_messages_count}
                </Box>
              )}
              {item.last_message && (
                <Typography variant="caption" color="textSecondary">
                  {new Date(item.last_message.updatedAt).toLocaleDateString(
                    "es-ES",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )}
                </Typography>
              )}
            </Box>
          </Button>
        ))}
      </Box>
    </MainCard>
  );
};

interface Prop {
  className?: string;
}

export default styled(ChatList)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .chats-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }

  .title-header {
    font-size: 1.5rem;
  }
`;


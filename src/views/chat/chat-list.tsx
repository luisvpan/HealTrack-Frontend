import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { IconCirclePlus, IconUserCircle } from "@tabler/icons";
import MainCard from "components/cards/MainCard";
import { Box, Button, Typography } from "@mui/material";
import { FunctionComponent, useCallback } from "react";
import useData from "./useData";
import { Chat } from "core/chats/types";

import store from "store";

const ChatList: FunctionComponent<Prop> = ({ className }) => {
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

  return (
    <MainCard
      className={className}
      headerClass={"chats-header"}
      title={
        <div className={"chats-header"}>
          <Typography variant="h3" className={"title-header"}>
            Chats
          </Typography>
          <Button
            color="primary"
            variant={"outlined"}
            onClick={goToCreate}
            startIcon={<IconCirclePlus />}
          >
            Crear
          </Button>
        </div>
      }
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {items.map((item: Chat) => (
          <Button
            key={item.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              px: "30px",
              py: "10px",
              borderBottom: "1px solid #ccc",
              marginBottom: "10px",
              textTransform: "none",
              justifyContent: "space-between"
            }}
            onClick={() => goToChat(item.id)}
          >
            <Box
              sx={{
                height: "50px",
                width: "50px",
                maxHeight: "50px",
                maxWidth: "50px",
              }}
            >
              <IconUserCircle height="50px" width="50px" color="gray" />
            </Box>

            <Box
              key={item.id}
              sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}
            >
              <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                >
                  {item.created_by.id === user!.id ? (
                    <p>
                      {item.users[0].name} {item.users[0].lastname}
                    </p>
                  ) : (
                    <p>
                      {item.created_by.name} {item.created_by.lastname}
                    </p>
                  )}

                  {!item.last_message ? (
                    <Typography>
                      Se el primero en escribir un mensaje!
                    </Typography>
                  ) : (
                    <Typography>{item.last_message.message}</Typography>
                  )}
                </Box>

                <div className="info-container">
                  {item.unread_messages_count > 0 && (
                    <Box>{item.unread_messages_count}</Box>
                  )}
                  {item.last_message && (
                    <p>
                      {new Date(item.last_message.updatedAt).toLocaleDateString(
                        "es-ES",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </p>
                  )}
                </div>
              </Box>
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
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;

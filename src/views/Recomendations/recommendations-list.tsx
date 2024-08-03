import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { IconCirclePlus, IconFileText, IconEdit, IconTrash } from "@tabler/icons";
import MainCard from "components/cards/MainCard";
import { Box, Button, Typography } from "@mui/material";
import { FunctionComponent, useCallback, useState } from "react";
import useData from "./useData";
import { Recommendation } from "core/recommendations/types";
import store from "store";
import { AllRole } from "core/users/types";
import { setIsLoading, setSuccessMessage, setErrorMessage } from "store/customizationSlice";
import { useAppDispatch } from "store/index";
import BackendError from "exceptions/backend-error";
import deleteRecommendation from "services/recomendations/delete-recommendation";
import DialogDelete from "components/dialogDelete";

const RecommendationList: FunctionComponent<Prop> = ({ className }) => {
  const { items, fetchRecommendations } = useData();
  const userRole = store.getState().auth.user?.role;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [recommendationId, setRecommendationId] = useState<number>(0);

  const goToCreate = useCallback(() => {
    navigate("/recommendations/create");
  }, [navigate]);

  const goToRecommendation = useCallback(
    (recommendationId: number) => {
      navigate(`/recommendations/${recommendationId}`);
    },
    [navigate]
  );

  const handleOpen = useCallback((recommendationId: number) => {
    setOpen(true);
    setRecommendationId(recommendationId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setRecommendationId(0);
  }, []);

  const onDelete = useCallback(
    async (recommendationId: number) => {
      try {
        dispatch(setIsLoading(true));
        await deleteRecommendation(recommendationId);
        dispatch(setSuccessMessage(`Recomendación eliminada correctamente`));
      } catch (error) {
        if (error instanceof BackendError) {
          dispatch(setErrorMessage(error.getMessage()));
        }
      } finally {
        dispatch(setIsLoading(false));
        handleClose();
        fetchRecommendations();
      }
    },
    [dispatch, fetchRecommendations, handleClose]
  );

  return (
    <MainCard
      className={className}
      headerClass={"recommendations-header"}
      title={
        <div className={"recommendations-header"}>
          <Typography variant="h3" className={"title-header"}>
            Recomendaciones
          </Typography>
          {userRole === AllRole.ADMIN && (
            <Button
              color="primary"
              variant={"outlined"}
              onClick={goToCreate}
              startIcon={<IconCirclePlus />}
            >
              Crear
            </Button>
          )}
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
        {items.map((item: Recommendation) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              px: "30px",
              py: "10px",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Box
              sx={{
                height: "50px",
                width: "50px",
                maxHeight: "50px",
                maxWidth: "50px",
              }}
            >
              <IconFileText height="50px" width="50px" color="gray" />
            </Box>

            <Box
              sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}
              onClick={() => goToRecommendation(item.id)}
            >
              <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Typography variant="body2">{item.content}</Typography>
              </Box>
            </Box>
            {userRole === AllRole.ADMIN && (
              <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                <Button
                  color="primary"
                  onClick={() => navigate("/recommendations/edit/" + item.id)}
                  startIcon={<IconEdit />}
                >
                  Editar
                </Button>
                <Button
                  color="secondary"
                  onClick={() => handleOpen(item.id)}
                  startIcon={<IconTrash />}
                >
                  Eliminar
                </Button>
              </Box>
            )}
          </Box>
        ))}
      </Box>
      <DialogDelete
        handleClose={handleClose}
        onDelete={() => {
          onDelete(recommendationId);
        }}
        open={open}
      />
    </MainCard>
  );
};

interface Prop {
  className?: string;
}

export default styled(RecommendationList)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .recommendations-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;

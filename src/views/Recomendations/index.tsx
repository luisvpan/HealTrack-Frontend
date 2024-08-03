import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { IconCirclePlus, IconFileText, IconEdit, IconTrash } from "@tabler/icons";
import MainCard from "components/cards/MainCard";
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);

  const goToCreate = useCallback(() => {
    navigate("/recommendations/create");
  }, [navigate]);

  const goToRecommendation = useCallback(
    (recommendation: Recommendation) => {
      setSelectedRecommendation(recommendation);
      setModalOpen(true);
    },
    []
  );

  const handleOpen = useCallback((recommendationId: number) => {
    setOpen(true);
    setRecommendationId(recommendationId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setRecommendationId(0);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setSelectedRecommendation(null);
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
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "#f5f5f5",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
            onClick={() => goToRecommendation(item)}
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
              sx={{ display: "flex", flexDirection: "row", flexGrow: 1, ml: 2 }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <Typography variant="subtitle1">{item.title}</Typography>
              </Box>
            </Box>

            {userRole === AllRole.ADMIN && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  ml: 2,
                }}
              >
                <Button
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation(); // Previene que el click en el botón afecte el Box principal
                    navigate("/recommendations/edit/" + item.id);
                  }}
                  startIcon={<IconEdit />}
                >
                  Editar
                </Button>
                <Button
                  color="secondary"
                  onClick={(e) => {
                    e.stopPropagation(); // Previene que el click en el botón afecte el Box principal
                    handleOpen(item.id);
                  }}
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
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>Detalles de la Recomendación</DialogTitle>
        <DialogContent>
          {selectedRecommendation && (
            <>
              <Typography variant="h6">{selectedRecommendation.title}</Typography>
              <Typography variant="body1">{selectedRecommendation.content}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
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

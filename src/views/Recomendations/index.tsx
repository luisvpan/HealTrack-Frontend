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

// Define los estilos para el modal
const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '30px',
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 'bold',
  fontStyle: 'italic',
  fontSize: '25px',
  marginBottom: '8px',
}));

const StyledContentContainer = styled('div')(({ theme }) => ({
  width: '100%',
  maxHeight: '200px',  // Ajusta la altura máxima del contenedor de respuesta
  overflowY: 'auto',  // Agrega un scroll si el contenido es muy largo
  padding: '12px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '20px',
  lineHeight: '1',  // Ajusta el interlineado
}));

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
        <Box sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: "20px",
          alignItems: "center",
          justifyContent: {sm: "space-between"}
        }}>
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
        </Box>
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
              flexDirection: {xs: "column", ms: "row"},
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
                <Typography variant="h1" sx={{fontSize: {xs: '15px', sm: '20px'}, fontWeight: 'bold', textAlign: "center"}}>
                  {item.title}
                </Typography>
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
        <StyledDialogTitle>Detalles de la Recomendación</StyledDialogTitle>
        <StyledDialogContent>
          {selectedRecommendation && (
            <>
              <StyledTitle>"{selectedRecommendation.title}"</StyledTitle>
              <StyledContentContainer>{selectedRecommendation.content}</StyledContentContainer>
            </>
          )}
        </StyledDialogContent>
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

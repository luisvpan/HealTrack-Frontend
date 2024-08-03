import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { IconCirclePlus, IconFileText, IconEdit, IconTrash } from "@tabler/icons";
import MainCard from "components/cards/MainCard";
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { FunctionComponent, useCallback, useState } from "react";
import useData from "./useData";
import { FAQs } from "core/FAQs/types";
import store from "store";
import { AllRole } from "core/users/types";
import { setIsLoading, setSuccessMessage, setErrorMessage } from "store/customizationSlice";
import { useAppDispatch } from "store/index";
import BackendError from "exceptions/backend-error";
import deleteFAQ from "services/FAQs/delete-FAQ";
import DialogDelete from "components/dialogDelete";

const FAQList: FunctionComponent<Prop> = ({ className }) => {
  const { items, fetchFAQs } = useData();
  const userRole = store.getState().auth.user?.role;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [faqId, setFaqId] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQs | null>(null);

  const goToCreate = useCallback(() => {
    navigate("/faqs/create");
  }, [navigate]);

  const goToFAQ = useCallback(
    (faq: FAQs) => {
      setSelectedFAQ(faq);
      setModalOpen(true);
    },
    []
  );

  const handleOpen = useCallback((faqId: number) => {
    setOpen(true);
    setFaqId(faqId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setFaqId(0);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setSelectedFAQ(null);
  }, []);

  const onDelete = useCallback(
    async (faqId: number) => {
      try {
        dispatch(setIsLoading(true));
        await deleteFAQ(faqId);
        dispatch(setSuccessMessage(`FAQ eliminada correctamente`));
      } catch (error) {
        if (error instanceof BackendError) {
          dispatch(setErrorMessage(error.getMessage()));
        }
      } finally {
        dispatch(setIsLoading(false));
        handleClose();
        fetchFAQs();
      }
    },
    [dispatch, fetchFAQs, handleClose]
  );

  return (
    <MainCard
      className={className}
      headerClass={"faqs-header"}
      title={
        <div className={"faqs-header"}>
          <Typography variant="h3" className={"title-header"}>
            Preguntas Frecuentes
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
        {items.map((item: FAQs) => (
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
            onClick={() => goToFAQ(item)}
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
                <Typography variant="subtitle1">{item.question}</Typography>
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
                    navigate("/faqs/edit/" + item.id);
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
          onDelete(faqId);
        }}
        open={open}
      />
      <StyledDialog open={modalOpen} onClose={handleModalClose}>
        <StyledDialogTitle>Detalles de la Pregunta</StyledDialogTitle>
        <StyledDialogContent>
          {selectedFAQ && (
            <>
              <StyledQuestion>"{selectedFAQ.question}"</StyledQuestion>
              <StyledAnswerContainer>
                {selectedFAQ.answer}
              </StyledAnswerContainer>
            </>
          )}
        </StyledDialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </StyledDialog>
    </MainCard>
  );
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '80%',  // Ajusta el ancho del diálogo
    maxWidth: '600px',  // Ajusta el ancho máximo del diálogo
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '40px',
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledQuestion = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 'bold',
  fontStyle: 'italic',
  fontSize: '25px',
  marginBottom: '8px',
}));

const StyledAnswerContainer = styled('div')(({ theme }) => ({
  width: '100%',
  maxHeight: '200px',  // Ajusta la altura máxima del contenedor de respuesta
  overflowY: 'auto',  // Agrega un scroll si el contenido es muy largo
  padding: '12px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '20px',
  lineHeight: '1',  // Ajusta el interlineado del texto
}));

interface Prop {
  className?: string;
}

export default styled(FAQList)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .faqs-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;

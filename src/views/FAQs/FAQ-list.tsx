import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { IconCirclePlus, IconFileText, IconEdit, IconTrash } from "@tabler/icons";
import MainCard from "components/cards/MainCard";
import { Box, Button, Typography } from "@mui/material";
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

  const goToCreate = useCallback(() => {
    navigate("/faqs/create");
  }, [navigate]);

  const goToFAQ = useCallback(
    (faqId: number) => {
      navigate(`/faqs/${faqId}`);
    },
    [navigate]
  );

  const handleOpen = useCallback((faqId: number) => {
    setOpen(true);
    setFaqId(faqId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setFaqId(0);
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
            FAQs
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
              flexDirection: {xs: "column", ms: "row"},
              alignItems: "center",
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
              sx={{ display: "flex", flexDirection: {xs: "column", ms: "row"}, flexGrow: 1 }}
              onClick={() => goToFAQ(item.id)}
            >
                <Typography variant="subtitle1">{item.question}</Typography>
                <Typography variant="body2">{item.answer}</Typography>
            </Box>
            {userRole === AllRole.ADMIN && (
              <Box sx={{ display: "flex", flexDirection: {xs: "column", ms: "row"} , gap: 1 }}>
                <Button
                  color="primary"
                  onClick={() => navigate("/faqs/edit/" + item.id)}
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
          onDelete(faqId);
        }}
        open={open}
      />
    </MainCard>
  );
};

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

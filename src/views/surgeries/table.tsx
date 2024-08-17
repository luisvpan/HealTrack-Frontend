import { Button } from "@mui/material";
import { IconTrash, IconEdit } from "@tabler/icons";
import DynamicTable from "components/DynamicTable";
import { Surgery } from "core/surgeries/types";
import { FunctionComponent, useCallback, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useAppDispatch } from "store/index";
import {
  setIsLoading,
  setSuccessMessage,
  setErrorMessage,
} from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import deleteSurgery from "services/surgeries/delete-surgery";
import DialogDelete from "components/dialogDelete";

const Table: FunctionComponent<Props> = ({ items, className, fetchItems }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [surgeryId, setSurgeryId] = useState<string>('');

  const handleOpen = useCallback((surgeryId: string) => {
    setOpen(true);
    setSurgeryId(surgeryId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setSurgeryId('');
  }, []);

  const onDelete = useCallback(
    async (surgeryId: string) => {
      try {
        dispatch(setIsLoading(true));
        await deleteSurgery(surgeryId);
        dispatch(setSuccessMessage(`Cirugía eliminada correctamente`));
      } catch (error) {
        if (error instanceof BackendError) {
          dispatch(setErrorMessage(error.getMessage()));
        }
      } finally {
        dispatch(setIsLoading(false));
        handleClose();
        fetchItems();
      }
    },
    [dispatch, fetchItems, handleClose]
  );

  return (
    <div className={className}>
      <DynamicTable
        headers={[
          { columnLabel: "Id", fieldName: "id", cellAlignment: "left" },
          { columnLabel: "Nombre", fieldName: "name", cellAlignment: "left" },
        ]}
        rows={items}
        components={[
          (row: Surgery) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/surgeries/edit/" + row.id);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Surgery) => (
            <Button
              color="secondary"
              onClick={() => handleOpen(row.id)}
              startIcon={<IconTrash />}
            >
              Eliminar
            </Button>
          ),
        ]}
      />
      <DialogDelete
        handleClose={handleClose}
        onDelete={() => {
          onDelete(surgeryId);
        }}
        open={open}
      />
    </div>
  );
};

type Props = {
  items: Surgery[];
  className?: string;
  fetchItems: () => void;
};

export default styled(Table)`
  display: flex;
  flex-direction: column;

  .paginator-container {
    margin-top: 12px;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
`;

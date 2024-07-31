import { Button } from "@mui/material";
import { IconTrash, IconEdit } from "@tabler/icons";
import DynamicTable from "components/DynamicTable";
import { Hospital } from "core/hospitals/types";
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
import deleteHospital from "services/hospitals/delete-hospital";
import DialogDelete from "components/dialogDelete";

const Table: FunctionComponent<Props> = ({ items, className, fetchItems }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [hospitalId, setHospitalId] = useState<number>(0);

  const handleOpen = useCallback((hospitalId: number) => {
    setOpen(true);
    setHospitalId(hospitalId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setHospitalId(0);
  }, []);

  const onDelete = useCallback(
    async (hospitalId: number) => {
      try {
        dispatch(setIsLoading(true));
        await deleteHospital(hospitalId);
        dispatch(setSuccessMessage(`Hospital eliminado correctamente`));
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
          (row: Hospital) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/hospitals/edit/" + row.id);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Hospital) => (
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
          onDelete(hospitalId);
        }}
        open={open}
      />
    </div>
  );
};

type Props = {
  items: Hospital[];
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

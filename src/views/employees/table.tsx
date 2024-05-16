import { Button } from "@mui/material";
import { IconTrash, IconEdit } from "@tabler/icons";
import DynamicTable from "components/DynamicTable";
// Own
import { Employee } from "core/employees/types";
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
import deleteEmployee from "services/employees/delete-employee";
import DialogDelete from "components/dialogDelete";
import { TranslatedRole } from "core/users/types";

const Table: FunctionComponent<Props> = ({ items, className, fetchItems }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [employeeId, setEmployeeId] = useState<number>(0);

  const handleOpen = useCallback((employeeId: number) => {
    setOpen(true);
    setEmployeeId(employeeId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setEmployeeId(0);
  }, []);

  const onDelete = useCallback(
    async (employeeId: number) => {
      try {
        dispatch(setIsLoading(true));
        await deleteEmployee(employeeId!);
        dispatch(setSuccessMessage(`Empleado eliminado correctamente`));
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
          {
            columnLabel: "Apellido",
            fieldName: "lastname",
            cellAlignment: "left",
          },
          { columnLabel: "Email", fieldName: "email", cellAlignment: "left" },
          {
            columnLabel: "Cedula",
            fieldName: "identification",
            cellAlignment: "left",
          },
          {
            columnLabel: "Hospital",
            onRender: (row: Employee) => row.hospital?.name,
            cellAlignment: "left",
          },
          {
            columnLabel: "Rol",
            cellAlignment: "left",
            onRender: (row: Employee) => TranslatedRole[row.user.role],
          },
        ]}
        rows={items}
        components={[
          (row: Employee) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/employees/edit/" + row.id);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Employee) => (
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
          onDelete(employeeId);
        }}
        open={open}
      />
    </div>
  );
};

type Props = {
  items: Employee[];
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

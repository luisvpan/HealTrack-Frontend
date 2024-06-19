import { Button, Typography } from "@mui/material";
import { IconTrash, IconEdit, IconEye } from "@tabler/icons";
import DynamicTable from "components/DynamicTable";
// Own
import { Report } from "core/reports/types";
import deleteReport from "services/reports/delete-report";
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
import DialogDelete from "components/dialogDelete";
import DialogImage from "components/dialogImage";

const Table: FunctionComponent<Props> = ({ items, className, fetchItems }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [openImage, setOpenImage] = useState<boolean>(false);
  const [dialogImage, setDialogImage] = useState<string | null>("");
  const [reportId, setReportId] = useState<number>(0);

  const handleOpen = useCallback((reportId: number) => {
    setOpen(true);
    setReportId(reportId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setReportId(0);
  }, []);

  const handleOpenImage = useCallback((imageUrl: string | null) => {
    setOpenImage(true);
    setDialogImage(imageUrl);
  }, []);

  const handleCloseImage = useCallback(() => {
    setOpenImage(false);
    setDialogImage("");
  }, []);

  const onDelete = useCallback(
    async (reportId: number) => {
      try {
        dispatch(setIsLoading(true));
        await deleteReport(reportId!);
        dispatch(setSuccessMessage(`Reporte eliminado correctamente`));
      } catch (error) {
        if (error instanceof BackendError) {
          if (error.statusCode === 403) {
            dispatch(
              setErrorMessage(
                "Solo un administrador puede eliminar un reporte."
              )
            );
          } else {
            dispatch(setErrorMessage(error.getMessage()));
          }
        }
      } finally {
        dispatch(setIsLoading(false));
        handleClose();
        fetchItems();
      }
    },
    [dispatch, fetchItems, handleClose]
  );
  console.log(items);
  return (
    <div className={className}>
      <DynamicTable
        headers={[
          { columnLabel: "Id", fieldName: "id", cellAlignment: "center" },
          {
            columnLabel: "¿Tiene temperatura alta?",
            onRender: (row: Report) => (
              <Typography>{row.hasHighTemperature ? "Si" : "No"}</Typography>
            ),
            cellAlignment: "center",
          },
          {
            columnLabel: "¿Tiene enrojecimiento?",
            onRender: (row: Report) => (
              <Typography>{row.hasRedness ? "Si" : "No"}</Typography>
            ),
            cellAlignment: "center",
          },
          {
            columnLabel: "¿Tiene hinchazón?",
            onRender: (row: Report) => (
              <Typography>{row.hasSwelling ? "Si" : "No"}</Typography>
            ),
            cellAlignment: "center",
          },
          {
            columnLabel: "¿Tiene secreciones?",
            onRender: (row: Report) => (
              <Typography>{row.hasSecretions ? "Si" : "No"}</Typography>
            ),
            cellAlignment: "center",
          },
          {
            columnLabel: "Descripción",
            fieldName: "additionalInformation",
            cellAlignment: "center",
          },
        ]}
        rows={items}
        components={[
          (row: Report) =>
            row.fileUrl ? (
              <Button
                color="info"
                onClick={() => handleOpenImage(row.fileUrl)}
                startIcon={<IconEye />}
              >
                Ver Imagen
              </Button>
            ) : null,
          /*
          (row: Report) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/reports/edit/" + row.id);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          */
          (row: Report) => (
            <Button
              color="error"
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
          onDelete(reportId);
        }}
        open={open}
      />
      <DialogImage
        handleClose={handleCloseImage}
        open={openImage}
        imageUrl={dialogImage}
      />
    </div>
  );
};

type Props = {
  items: Report[];
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

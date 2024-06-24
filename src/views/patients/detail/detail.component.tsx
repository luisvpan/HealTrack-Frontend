import { FunctionComponent, useCallback, useState } from "react";
import dayjs from "dayjs";
import { Props } from "./types";
import { useNavigate } from "react-router";
import { Report } from "core/reports/types";
import store, { useAppDispatch } from "store";
import MainCard from "components/cards/MainCard";
import DialogImage from "components/dialogImage";
import DynamicTable from "components/DynamicTable";
import BackendError from "exceptions/backend-error";
import { IconEye, IconMessage } from "@tabler/icons";
import postChat from "services/chats/create-chat.service";
import { TranslatedPatientStatus } from "core/patients/types";
import checkIfChatExists from "services/chats/check-chat-exists";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";
// material-ui
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

const Detail: FunctionComponent<Props> = ({ className, patient }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const employeeId = store.getState().auth.user?.id;
  const [openImage, setOpenImage] = useState<boolean>(false);
  const [dialogImage, setDialogImage] = useState<string | null>("");
  const surgeryDate = dayjs(patient.surgeryDate).format("DD/MM/YYYY");

  const handleOpenImage = useCallback((imageUrl: string | null) => {
    setOpenImage(true);
    setDialogImage(imageUrl);
  }, []);

  const handleCloseImage = useCallback(() => {
    setOpenImage(false);
    setDialogImage("");
  }, []);

  const handleCreateChat = async () => {
    if (!employeeId) return;
    try {
      dispatch(setIsLoading(true));
      const existingChat = await checkIfChatExists(employeeId, patient.user.id);
      if (!!existingChat) {
        navigate(`/chat/${existingChat.id}`);
        return;
      }

      const createdChat = await postChat(patient.user.id);
      navigate(`/chat/${createdChat.id}`);
    } catch (error) {
      console.log(error);
      if (error instanceof BackendError) {
        dispatch(setErrorMessage(error.getMessage()));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className={className}>
      <div className={"container-form-services"}>
        <MainCard
          title={
            <div className="patients-detail-header">
              <Typography variant="h2" className="title-header">
                {`Detalle del paciente ${patient.user.name} ${patient.user.lastname}`}
              </Typography>
              <Button
                color="primary"
                variant={"outlined"}
                startIcon={<IconMessage />}
                onClick={handleCreateChat}
              >
                Chatear
              </Button>
            </div>
          }
        >
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Nombre:</TableCell>
                  <TableCell align="right">
                    {patient.user.name} {patient.user.lastname}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Edad:</TableCell>
                  <TableCell align="right">{patient.age}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Dirección:</TableCell>
                  <TableCell align="right">{patient.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Hospital:</TableCell>
                  <TableCell align="right">{patient.hospital.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Telefono celular:</TableCell>
                  <TableCell align="right">{patient.personalPhone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Telefono de casa:</TableCell>
                  <TableCell align="right">{patient.homePhone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Procedimiento:</TableCell>
                  <TableCell align="right">
                    {patient.surgeryProcedure}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fecha de procedimiento:</TableCell>
                  <TableCell align="right">{surgeryDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Estado:</TableCell>
                  <TableCell align="right">
                    {TranslatedPatientStatus[patient.status]}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </div>
      <br />
      {!!patient.patientReports && (
        <div className={"container-form-services"}>
          <MainCard title={`Reportes del paciente`}>
            <DynamicTable
              headers={[
                { columnLabel: "Id", fieldName: "id", cellAlignment: "center" },
                {
                  columnLabel: "¿Tiene temperatura alta?",
                  onRender: (row: Report) => (
                    <Typography>
                      {row.hasHighTemperature ? "Si" : "No"}
                    </Typography>
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
                  columnLabel: "Fecha",
                  onRender: (row: Report) => (
                    <Typography>
                      {dayjs(row.createdAt).format("DD/MM/YYYY")}
                    </Typography>
                  ),
                  cellAlignment: "center",
                },
              ]}
              rows={patient.patientReports}
              components={[
                (row: Report) =>
                  row.fileUrl ? (
                    <Button
                      color="info"
                      startIcon={<IconEye />}
                      onClick={() => handleOpenImage(row.fileUrl)}
                    >
                      Ver Imagen
                    </Button>
                  ) : null,
              ]}
            />
          </MainCard>
          <DialogImage
            handleClose={handleCloseImage}
            open={openImage}
            imageUrl={dialogImage}
          />
        </div>
      )}
    </div>
  );
};

export default Detail;

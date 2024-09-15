import { FunctionComponent, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Props } from "./types";
import MainCard from "components/cards/MainCard";
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import getMedicName from "services/patients/get-medic-name";

const Detail: FunctionComponent<Props> = ({ className, patient }) => {
  const surgeryDate = dayjs(patient.surgeryDate).format("DD/MM/YYYY");
  const [medicName, setMedicName] = useState<string>("");

  useEffect(() => {
    const fetchMedicName = async () => {
      try {
        const name = await getMedicName(patient.id);
        setMedicName(name);
      } catch (error) {
        console.error(`Error fetching medic name for patient ${patient.id}:`, error);
      }
    };

    fetchMedicName();
  }, [patient.id]);

  return (
    <div className={className}>
      <div className={"container-form-services"}>
        <MainCard
          title={
            <div className="patients-detail-header">
              <Typography variant="h2" className="title-header">
                {`Informacion del usuario ${patient.user.name} ${patient.user.lastname}`}
              </Typography>
            </div>
          }
        >
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Nombre:</TableCell>
                  <TableCell align="right">{patient.user.name} {patient.user.lastname}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Edad:</TableCell>
                  <TableCell align="right">{patient.age}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sexo:</TableCell>
                  <TableCell align="right">{patient.sex === "M" ? "Masculino" : "Femenino"}</TableCell>
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
                  <TableCell>Enfermero/a:</TableCell>
                  <TableCell align="right">{medicName || 'No asignado'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Procedimiento:</TableCell>
                  <TableCell align="right">{patient.surgeryProcedure}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fecha de procedimiento:</TableCell>
                  <TableCell align="right">{surgeryDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Estado:</TableCell>
                  <TableCell align="right">{patient.status}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </div>
    </div>
  );
};

export default Detail;

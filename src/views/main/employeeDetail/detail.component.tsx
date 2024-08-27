import { FunctionComponent } from "react";
import dayjs from "dayjs";
import { Props } from "./types";
import MainCard from "components/cards/MainCard";
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";

const Detail: FunctionComponent<Props> = ({ className, employee }) => {
  const hireDate = dayjs(employee.user?.createdAt).format("DD/MM/YYYY");

  return (
    <div className={className}>
      <div className={"container-form-services"}>
        <MainCard
          title={
            <div className="employee-detail-header">
              <Typography variant="h2" className="title-header">
                {`Información del empleado ${employee.user?.name} ${employee.user?.lastname} (Rol: ${employee.user?.role})`}
              </Typography>
            </div>
          }
        >
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Nombre:</TableCell>
                  <TableCell align="right">{employee.user?.name} {employee.user.lastname}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Hospital:</TableCell>
                  <TableCell align="right">{employee.hospital?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Identificación:</TableCell>
                  <TableCell align="right">{employee.user?.identification}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Correo Electrónico:</TableCell>
                  <TableCell align="right">{employee.user?.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Creado el:</TableCell>
                  <TableCell align="right">{hireDate}</TableCell>
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

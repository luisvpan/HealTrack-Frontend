import React from "react";
import { AllRole } from "core/users/types";
import { Box, Stack, Typography } from "@mui/material";
import { useAppSelector } from "store";
import TableNewestEmployees from "./table-newest-employees";
import TableNewestPatients from "./table-newest-patients";
import { useState, useEffect } from "react";
import getNewestEmployees from "services/employees/get-10-newest-employees";
import getNewestPatients from "services/patients/get-10-newsest-patients";
import { Employee } from "core/employees/types";
import { Patient } from "core/patients/types";
import PatientDetail from "./detail";
import EmployeeDetail from "./employeeDetail";
import useGetWarningInfo from "./warningInfo/use-get-warning-info";
import WarningBanner from "./warningInfo/warning-banner";

const MainPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isLoading: warningLoading, warning } = useGetWarningInfo();

  useEffect(() => {
    if (user?.role !== AllRole.PATIENT) {
      const fetchEmployees = async () => {
        try {
          const response = await getNewestEmployees();
          setEmployees(response);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      };

      const fetchPatients = async () => {
        try {
          const response = await getNewestPatients();
          setPatients(response);
        } catch (error) {
          console.error('Error fetching patients:', error);
        }
      };

      fetchEmployees();
      fetchPatients();
    }
    setLoading(false);
  }, [user?.role]);

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h1" sx={{ textAlign: { xs: "center", sm: "start" } }}>
          Bienvenido a la aplicación HealTrack, {user?.name}
        </Typography>
        
        { user?.role === AllRole.PATIENT ? (
          <WarningBanner warning={warning} isLoading={warningLoading} />
        ) : null}

        {loading ? (
          <Typography variant="body1">Cargando datos...</Typography>
        ) : user?.role === AllRole.PATIENT ? (
          <PatientDetail />
        ) : user?.role === AllRole.ADMIN ? (
          <>
            <Typography variant="body1" sx={{ textAlign: { xs: "center", sm: "start" } }}>
              Esta es la página principal de la aplicación donde encontrarás información relevante.
            </Typography>
            <EmployeeDetail />
            <Typography variant="h3">Últimos 10 empleados en ser registrados:</Typography>
            <TableNewestEmployees items={employees} />
            <Typography variant="h3">Últimos 10 pacientes en ser registrados:</Typography>
            <TableNewestPatients items={patients} />
          </>
        ) : (
          <>
            <Typography variant="body1" sx={{ textAlign: { xs: "center", sm: "start" } }}>
              Esta es la página principal de la aplicación donde encontrarás información relevante.
            </Typography>
            <EmployeeDetail />
          </>
        )}
      </Stack>
    </Box>
  );
};

export default MainPage;

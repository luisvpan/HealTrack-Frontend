import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Table from "./table";
import useData from "./useData";
import { styled } from "styled-components";
import store from "store";
import { AllRole } from "core/users/types";
import { StatusPatient } from "core/patients/types";
import getPatientByUserId from "services/patients/get-patient-by-user-id";
import { calculateTotalSatisfaction } from "services/appForm/total-satisfaction-percentage";
import { exportAppForm } from "services/appForm/export-app-form"; 
import dayjs from "dayjs";
import checkUserFormSubmission from "services/appForm/check-user-form-submission";

// Obtener el rol del usuario
const userRole = store.getState().auth.user?.role;
const userId = store.getState().auth.user?.id;
const isPatient = userRole === AllRole.PATIENT;

const RecommendationsAppPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { items, pagination, fetchFormularies, setPagination } = useData();
  const [patientStatus, setPatientStatus] = useState<StatusPatient | null>(null);
  const [totalSatisfaction, setTotalSatisfaction] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean | null>(null);

  // Efecto para obtener formularios al montar el componente
  useEffect(() => {
    fetchFormularies();
  }, [fetchFormularies]);

  // Efecto para obtener el estado del paciente y verificar si el formulario fue enviado
  useEffect(() => {
    if (isPatient && typeof userId === 'number') {
      const fetchPatientData = async () => {
        const patientData = await getPatientByUserId(userId);
        setPatientStatus(patientData?.status);
        
        try {
          const submitted = await checkUserFormSubmission(userId);
          setHasSubmitted(submitted);
        } catch (error) {
          console.error("Error al verificar si el usuario envió el formulario:", error);
        }
      };
      fetchPatientData();
    }
  }, []);

  // Efecto para obtener el porcentaje total de satisfacción
  useEffect(() => {
    if (!isPatient) {
      const fetchTotalSatisfaction = async () => {
        try {
          const satisfaction = await calculateTotalSatisfaction();
          setTotalSatisfaction(satisfaction);
        } catch (error) {
          console.error("Error al obtener el porcentaje total de satisfacción", error);
        }
      };
      fetchTotalSatisfaction();
    }
  }, []);

  const handleNavigateToForm = () => {
    navigate("/app-recommendations/create");
  };

  const handleExport = async () => {
    try {
      const blob = await exportAppForm();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      const currentDate = dayjs().format("YYYY-MM-DD");
      link.href = url;
      link.setAttribute("download", `app-form-responses-${currentDate}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al exportar el formulario:", error);
    }
  };

  const handleSetPagination = (newPagination: { page: number; totalPages: number }) => {
    setPagination((prev) => {
      if (prev.page !== newPagination.page) {
        return { ...prev, page: newPagination.page };
      }
      return prev;
    });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {isPatient ? (
        <>
          <Typography variant="h2" sx={{ textAlign: "center", marginBottom: "40px" }}>
            ¡Danos tu calificación!
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", marginBottom: "20px" }}>
            Queremos saber tu opinión sobre nuestra aplicación. Tu retroalimentación es muy importante para nosotros. 
            Por favor, califica nuestra aplicación dirigiéndote a nuestro formulario. 
            Apreciamos cada comentario y sugerencia, ya que nos ayuda a mejorar y ofrecerte un mejor servicio. 
            No dudes en ser honesto y detallado en tus respuestas.
          </Typography>
          <Box sx={{ textAlign: "center", marginBottom: "40px" }}>
            {hasSubmitted ? (
              <Typography variant="body1" sx={{ textAlign: "center", color: "green" }}>
                Lo siento, usted ya ha realizado el formulario. Gracias por sus comentarios.
              </Typography>
            ) : (patientStatus === StatusPatient.INACTIVE || patientStatus === StatusPatient.CLOSED) ? (
              <Button variant="contained" onClick={handleNavigateToForm}>
                Ir al formulario
              </Button>
            ) : (
              <Typography variant="body1" sx={{ textAlign: "center", color: "red" }}>
                Lo siento, usted aún no está autorizado a responder la encuesta.
              </Typography>
            )}
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h2" sx={{ textAlign: "center", marginBottom: "40px" }}>
            ¡Bienvenido a la sección de Formulario de satisfacción!
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", marginBottom: "20px" }}>
            Aquí vamos a visualizar todos los formularios con la opinión de los pacientes sobre nuestra aplicación. 
            El botón exportar permitirá la exportación de un archivo Excel con todas las respuestas brindadas por los usuarios para hacer estudios.
          </Typography>
          {totalSatisfaction !== null && (
            <Typography variant="h3" sx={{ textAlign: "center", marginBottom: "20px" }}>
              Porcentaje total de satisfacción: {(totalSatisfaction * 100).toFixed(2)}%.
            </Typography>
          )}
          <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
            <Button variant="contained" onClick={handleExport}>
              Exportar Excel
            </Button>
          </Box>
          <Table
            items={items}
            fetchItems={fetchFormularies}
            paginationData={pagination}
            setPaginationData={handleSetPagination}
          />
        </>
      )}
    </Box>
  );
};

export default styled(RecommendationsAppPage)`
  width: 100%;
`;

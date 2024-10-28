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

// Verificar si el usuario llenó el formulario
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

  useEffect(() => {
    fetchFormularies();

    // Solo obtener el estado si el usuario es paciente
    if (isPatient && typeof userId === 'number') {
      const fetchPatientStatus = async () => {
        const patientData = await getPatientByUserId(userId);
        setPatientStatus(patientData?.status);
      };
      fetchPatientStatus();

      // Verificar si el usuario ya envió el formulario
      const fetchFormSubmissionStatus = async () => {
        try {
          const submitted = await checkUserFormSubmission(userId);
          setHasSubmitted(submitted);
        } catch (error) {
          console.error("Error al verificar si el usuario envió el formulario:", error);
        }
      };
      fetchFormSubmissionStatus();
    }

    // Obtener el porcentaje total de satisfacción para todos los usuarios
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
  }, [fetchFormularies]);

  const handleNavigateToForm = () => {
    navigate("/app-recommendations/create");
  };

  const handleSetPagination = (newPagination: { page: number; totalPages: number }) => {
    setPagination((prev) => ({
      ...prev,
      page: newPagination.page,
    }));
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
            {(hasSubmitted) ? (
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

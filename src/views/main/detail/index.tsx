import { FunctionComponent, useState, useEffect } from "react";
import Detail from "./detail";
import styled from "styled-components";
import getPatientByUserId from "services/patients/get-patient-by-user-id";
import { useAppSelector } from "store";
import { Patient } from "core/patients/types";

const PatientDetail: FunctionComponent<Props> = ({ className }) => {
  const user = useAppSelector((state) => state.auth.user);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPatient = async () => {
      if (user?.id) {
        try {
          const patientData = await getPatientByUserId(user.id);
          setPatient(patientData);
        } catch (error) {
          console.error('Error fetching patient:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [user?.id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!patient) {
    return <div>No se encontró el paciente.</div>;
  }

  return (
    <div className={className}>
      <Detail patient={patient} />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(PatientDetail)`
  display: flex;
  flex-direction: column;

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .form-data {
    margin-top: 16px;
  }

  .form-header-card {
    width: 100%;
  }

  .form-header {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`;

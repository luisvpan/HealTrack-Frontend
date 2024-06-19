import { FunctionComponent } from "react";
import Detail from "./detail";
import styled from "styled-components";
import usePatientId from "../edit/use-patient-id";
import usePatientById from "../edit/use-patient-by-id";

const PatientDetail: FunctionComponent<Props> = ({ className }) => {
  const patientId = usePatientId();
  const patient = usePatientById(patientId);

  if (!patient) return <></>;

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

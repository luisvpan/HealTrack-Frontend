import { FunctionComponent, useCallback } from "react";
// material-ui
import MainCard from "components/cards/MainCard";
import { Typography } from "@mui/material";
import styled from "styled-components";
import BackendError from "exceptions/backend-error";
import { useNavigate } from "react-router";
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import { useAppDispatch } from "../../../store/index";
import Form, { FormValues } from "../form";
import editPatient from "services/patients/edit-patient";
import usePatientById from "./use-patient-by-id";
import usePatientId from "./use-patient-id";
import { FormikHelpers } from "formik";

const EditPatient: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const patientId = usePatientId();
  const patient = usePatientById(patientId);

  const onSubmit = useCallback(
    (values: any, { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>) => {
      dispatch(setIsLoading(true));
      setErrors({});
      setStatus({});
      setSubmitting(true);
  
      const formatedValues = {
        ...values,
        age: Number(values.age),
        automaticTracking: true,
        hospital: {
          name: values.hospital,
        },
        user: {
          name: values.name,
          lastname: values.lastname,
          email: values.email,
          identification: values.identification,
          role: "patient",
        },
      };
      delete formatedValues.name;
      delete formatedValues.lastname;
      delete formatedValues.email;
      delete formatedValues.identification;
      delete formatedValues.password;
      delete formatedValues.submit;
  
      editPatient(patientId!, formatedValues)
        .then(() => {
          navigate("/patients");
          dispatch(
            setSuccessMessage(`Paciente ${values.name} editado correctamente`)
          );
        })
        .catch((error) => {
          if (error instanceof BackendError) {
            setErrors({
              ...error.getFieldErrorsMessages(),
              submit: error.getMessage(),
            });
            dispatch(setErrorMessage(error.getMessage()));
          }
          setStatus({ success: false });
        })
        .finally(() => {
          setSubmitting(false);
          dispatch(setIsLoading(false));
        });
    },
    [dispatch, navigate, patientId]
  );  

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Pacientes
        </Typography>
      </MainCard>
      {patient && (
        <Form
          initialValues={{
            name: patient.user.name,
            lastname: patient.user.lastname,
            age: patient.age,
            address: patient.address,
            personalPhone: patient.personalPhone,
            homePhone: patient.homePhone,
            email: patient.user.email,
            identification: patient.user.identification,
            hospital: patient.hospital.name,
            password: "",
            surgeryDate: patient.surgeryDate,
            surgeryProcedure: patient.surgeryProcedure,
            surgeryType: patient.surgeryType,
            medicId: patient.medic.id,
            submit: null,
          }}
          isEdit
          title={"Editar paciente"}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditPatient)`
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

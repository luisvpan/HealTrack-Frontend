import { FunctionComponent, useCallback } from "react";
// material-ui
import MainCard from "components/cards/MainCard";
import { Typography } from "@mui/material";
import styled from "styled-components";
import BackendError from "exceptions/backend-error";
import createPatient from "services/patients/create-patient";
import { useNavigate } from "react-router";
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import { useAppDispatch } from "../../store/index";
import Form, { FormValues } from "./form";
import { FormikHelpers } from "formik";

const CreatePatient: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    async (
      values: any,
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
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
            password: values.password,
            role: "patient",
          },
        };
        delete formatedValues.name;
        delete formatedValues.lastname;
        delete formatedValues.email;
        delete formatedValues.identification;
        delete formatedValues.password;
        delete formatedValues.submit;
        await createPatient(formatedValues);
        navigate("/patients");
        dispatch(
          setSuccessMessage(`Paciente ${values.name} creado correctamente`)
        );
      } catch (error) {
        if (error instanceof BackendError) {
          setErrors({
            ...error.getFieldErrorsMessages(),
            submit: error.getMessage(),
          });
          dispatch(setErrorMessage(error.getMessage()));
        }
        setStatus({ success: false });
      } finally {
        dispatch(setIsLoading(false));
        setSubmitting(false);
      }
    },
    [dispatch, navigate]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Pacientes
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          name: "",
          lastname: "",
          age: 0,
          address: "",
          personalPhone: "",
          homePhone: "",
          email: "",
          identification: "",
          hospital: "",
          password: "",
          surgeryDate: "",
          surgeryProcedure: "",
          surgeryType: "",
          medicId: null,
          submit: null,
        }}
        title={"Crear paciente"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(CreatePatient)`
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

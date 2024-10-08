import { FunctionComponent, useCallback } from "react";
// material-ui
import MainCard from "components/cards/MainCard";
import { Typography } from "@mui/material";
import styled from "styled-components";
import BackendError from "exceptions/backend-error";
import createReport from "services/reports/create-report";
import { useNavigate } from "react-router";
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import { useAppDispatch } from "../../store/index";
import Form, { FormValues } from "./form";
import { FormikHelpers } from "formik";
import jsonToFormData from "helpers/json-to-formData";

const CreateReport: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    (values: any, { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>) => {
      dispatch(setIsLoading(true));
      setErrors({});
      setStatus({});
      setSubmitting(true);
  
      // Prepare values for submission
      for (const key in values) {
        if (values[key] === "true") {
          values[key] = true;
        }
      }
      if (!values.file) {
        delete values.file;
      }
      delete values.id;
      delete values.submit;
      const valuesToSend = jsonToFormData(values);
  
      createReport(valuesToSend)
        .then(() => {
          navigate("/reports");
          dispatch(setSuccessMessage(`Reporte creado correctamente`));
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
          dispatch(setIsLoading(false));
          setSubmitting(false);
        });
    },
    [dispatch, navigate]
  );  

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Reportes
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          id: 0,
          hasHighTemperature: false,
          hasRedness: false,
          hasSwelling: false,
          hasSecretions: false,
          additionalInformation: null,
          surgeryExpense: "No",
          surgeryExpenseAmount: 0.0,
          fileUrl: null,
          submit: null,
        }}
        title={"Crear reporte"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(CreateReport)`
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

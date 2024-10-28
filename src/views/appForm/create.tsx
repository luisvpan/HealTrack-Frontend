import { FunctionComponent, useCallback } from "react";
// material-ui
import MainCard from "components/cards/MainCard";
import { Typography } from "@mui/material";
import styled from "styled-components";
import BackendError from "exceptions/backend-error";
import createAppForm from "services/appForm/create-appForm";
import { useNavigate } from "react-router";
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import { useAppDispatch } from "../../store/index";
import AppForm, { FormValues } from "./form"
import { FormikHelpers } from "formik";

const CreateAppForm: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    (values: FormValues, { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>) => {
      dispatch(setIsLoading(true));
      setErrors({});
      setStatus({});
      setSubmitting(true);
  
      const { submit, ...formatedValues } = values; // Desestructura el valor submit
  
      createAppForm(formatedValues) // Aquí usas el servicio para crear el formulario
        .then(() => {
          navigate("/app-recommendations"); // Redirige a la página correcta
          dispatch(
            setSuccessMessage(`Formulario enviado correctamente`)
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
          Enviar Formulario
        </Typography>
      </MainCard>

      <AppForm
        initialValues={{
          likeApp: "",
          innescesaryDificultToUse: "",
          easyToUse: "",
          needExpertSupport: "",
          wellIntegratedFunctions: "",
          manyContradictions: "",
          peopleLearnQuickly: "",
          tediousToUse: "",
          feltConfidentUsing: "",
          neededKnowledgeBeforeUse: "",
          additionalInformation: "",
          submit: null,
        }}
        title={"Encuesta de Satisfacción"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(CreateAppForm)`
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

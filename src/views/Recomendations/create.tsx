import { FunctionComponent, useCallback } from "react";
// material-ui
import MainCard from "components/cards/MainCard";
import { Typography } from "@mui/material";
import styled from "styled-components";
import BackendError from "exceptions/backend-error";
import createRecommendation from "services/recomendations/create-recomendations";
import { useNavigate } from "react-router";
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import { useAppDispatch } from "../../store/index";
import Form, { FormValues } from "./Form";
import { FormikHelpers } from "formik";

const CreateRecommendation: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    (values: any, { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>) => {
      dispatch(setIsLoading(true));
      setErrors({});
      setStatus({});
      setSubmitting(true);
  
      const formatedValues = {
        title: values.title,
        content: values.content,
      };
  
      createRecommendation(formatedValues)
        .then(() => {
          navigate("/recommendations");
          dispatch(
            setSuccessMessage(`Recomendación ${values.title} creada correctamente`)
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
          Recomendaciones
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          title: "",
          content: "",
          submit: null,
        }}
        title={"Crear recomendación"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(CreateRecommendation)`
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

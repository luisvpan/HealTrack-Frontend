import { FunctionComponent, useCallback } from "react";
// material-ui
import MainCard from "components/cards/MainCard";
import { Typography } from "@mui/material";
import styled from "styled-components";
import BackendError from "exceptions/backend-error";
import createFAQ from "services/FAQs/create-FAQs";
import { useNavigate } from "react-router";
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import { useAppDispatch } from "../../store/index";
import Form, { FormValues } from "./form";
import { FormikHelpers } from "formik";

const CreateFAQ: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    (values: any, { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>) => {
      dispatch(setIsLoading(true));
      setErrors({});
      setStatus({});
      setSubmitting(true);
  
      const formatedValues = {
        question: values.question,
        answer: values.answer,
      };
  
      createFAQ(formatedValues)
        .then(() => {
          navigate("/faqs");
          dispatch(
            setSuccessMessage(`FAQ "${values.question}" creada correctamente`)
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
          FAQs
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          question: "",
          answer: "",
          submit: null,
        }}
        title={"Crear FAQ"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(CreateFAQ)`
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

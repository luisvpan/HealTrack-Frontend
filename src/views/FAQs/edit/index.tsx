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
import editFAQ from "services/FAQs/edit-FAQ"; // Asegúrate de que la ruta sea correcta
import useFAQById from "./use-FAQ-by-id"; 
import useFAQId from "./use-FAQ-id"; 
import { FormikHelpers } from "formik";

const EditFAQ: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const faqId = useFAQId();
  
  // Convert faqId to a number, if possible
  const faqNumberId = faqId ? Number(faqId) : null;
  const faq = useFAQById(faqNumberId);

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
          question: values.question,
          answer: values.answer,
        };
        await editFAQ(faqNumberId!, formatedValues);
        navigate("/faqs");
        dispatch(
          setSuccessMessage(`FAQ ${values.question} editado correctamente`)
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
        setSubmitting(false);
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, navigate, faqNumberId]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Editar Pregunta Frecuente
        </Typography>
      </MainCard>
      {faq && (
        <Form
          initialValues={{
            question: faq.question,
            answer: faq.answer,
            submit: null,
          }}
          isEdit
          title={"Editar FAQ"}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditFAQ)`
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

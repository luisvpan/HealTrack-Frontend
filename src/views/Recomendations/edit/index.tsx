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
import Form, { FormValues } from "../Form";
import editRecommendation from "services/recomendations/edit-recommendation";
import useRecommendationById from "./use-recommendation-by-id";
import useRecommendationId from "./use-recommendation-id";
import { FormikHelpers } from "formik";

const EditRecommendation: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const recommendationId = useRecommendationId();
  
  // Convert recommendationId to a number, if possible
  const recommendationNumberId = recommendationId ? Number(recommendationId) : null;
  const recommendation = useRecommendationById(recommendationNumberId);

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
          title: values.title,
          content: values.content,
        };
        await editRecommendation(recommendationNumberId!, formatedValues);
        navigate("/recommendations");
        dispatch(
          setSuccessMessage(`Recomendación ${values.title} editada correctamente`)
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
    [dispatch, navigate, recommendationNumberId]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Editar Recomendación
        </Typography>
      </MainCard>
      {recommendation && (
        <Form
          initialValues={{
            title: recommendation.title,
            content: recommendation.content,
            submit: null,
          }}
          isEdit
          title={"Editar recomendación"}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditRecommendation)`
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

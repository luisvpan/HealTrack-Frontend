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
import editSurgery from "services/surgeries/edit-surgery";
import useSurgeryById from "./use-surgery-by-id";
import useSurgeryId from "./use-surgery-id";
import { FormikHelpers } from "formik";

const EditSurgery: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const surgeryId = useSurgeryId();
  const surgery = useSurgeryById(surgeryId);

  const onSubmit = useCallback(
    (values: any, { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>) => {
      dispatch(setIsLoading(true));
      setErrors({});
      setStatus({});
      setSubmitting(true);

      const formatedValues = {
        name: values.name,
      };

      editSurgery(surgeryId!, formatedValues)
        .then(() => {
          navigate("/surgeries");
          dispatch(
            setSuccessMessage(`Cirugía ${values.name} editada correctamente`)
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
    [dispatch, navigate, surgeryId]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Editar Cirugía
        </Typography>
      </MainCard>
      {surgery && (
        <Form
          initialValues={{
            name: surgery.name,
            submit: null,
          }}
          isEdit
          title={"Editar cirugía"}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditSurgery)`
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

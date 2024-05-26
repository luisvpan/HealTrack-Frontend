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
import editReport from "services/reports/edit-report";
import useReportById from "./use-report-by-id";
import useReportId from "./use-report-id";
import { FormikHelpers } from "formik";

const EditReport: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const reportId = useReportId();
  const report = useReportById(reportId);

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
        delete values.id;
        delete values.fileUrl;
        delete values.submit;
        for (const key in values) {
          if (values[key] === "true") {
            values[key] = true;
          }
        }

        await editReport(reportId!, values);
        navigate("/reports");
        dispatch(
          setSuccessMessage(`Paciente ${values.name} editado correctamente`)
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
    [dispatch, navigate, reportId]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Pacientes
        </Typography>
      </MainCard>
      {report && (
        <Form
          initialValues={{
            id: 0,
            isRespondingForEmployee: report.isRespondingForEmployee,
            hasHighTemperature: report.hasHighTemperature,
            hasRedness: report.hasRedness,
            hasSwelling: report.hasSwelling,
            hasSecretions: report.hasSecretions,
            fileUrl: report.fileUrl,
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

export default styled(EditReport)`
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

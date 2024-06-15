import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import styled from "styled-components";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import { FunctionComponent } from "react";
// Own
import changePatientState from "services/patients/change-patient-state";
import { useAppDispatch } from "store";
import SelectField from "components/SelectField";
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import BackendError from "exceptions/backend-error";

const DialogChangeState: FunctionComponent<Prop> = ({
  open,
  handleClose,
  className,
  patientId,
  fetchItems,
}) => {
  const dispatch = useAppDispatch();

  const onSubmit = async (
    values: any,
    {
      setErrors,
      setStatus,
      setSubmitting,
      resetForm,
    }: FormikHelpers<{ status: string }>
  ) => {
    try {
      dispatch(setIsLoading(true));
      setErrors({});
      setStatus({});
      setSubmitting(true);
      await changePatientState(patientId, values);
      dispatch(
        setSuccessMessage(`Estado del paciente actualizado correctamente`)
      );
      resetForm();
      handleClose();
      fetchItems();
    } catch (error) {
      if (error instanceof BackendError) {
        setErrors({
          ...error.getFieldErrorsMessages(),
        });
        dispatch(setErrorMessage(error.getMessage()));
      }
      setStatus({ success: false });
    } finally {
      dispatch(setIsLoading(false));
      setSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={{
          status: null,
        }}
        validationSchema={Yup.object().shape({
          status: Yup.string().required("El estado es requerido"),
        })}
        onSubmit={onSubmit as any}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isValid,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Dialog
              open={open}
              fullWidth
              onClose={handleClose}
              aria-labelledby="alert-changeState-title"
              aria-describedby="alert-changeState-description"
            >
              <DialogTitle id="alert-changeState-title" fontSize="16px">
                Cambiar Estado
              </DialogTitle>
              <DialogContent>
                <SelectField
                  className="field-form"
                  fullWidth={true}
                  name="status"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Estado del paciente"
                  options={[
                    { label: "En seguimiento", value: "active" },
                    { label: "Dado de Alta", value: "inactive" },
                    { label: "Hospitalizado", value: "emergency" },
                    { label: "Caso Cerrado", value: "closed" },
                  ]}
                  helperText={touched.status ? errors.status : ""}
                  error={touched.status && !!errors.status}
                  isAutocomplete={false}
                  value={values.status}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="secondary" size="small">
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  size="small"
                  disabled={!isValid || isSubmitting}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Guardar
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        )}
      </Formik>
    </div>
  );
};

interface Prop {
  open: boolean;
  handleClose: () => void;
  className?: string;
  patientId: number;
  fetchItems: () => void;
}

export default styled(DialogChangeState)`
  display: flex;
  flex-direction: column;
  .field-form {
    margin: 6px;
  }
`;

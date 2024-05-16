import { FunctionComponent } from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
// material-ui
import MainCard from "components/cards/MainCard";
import SelectField from "components/SelectField";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import styled from "styled-components";

const USE_AUTOCOMPLETES = false;

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  isEdit,
}) => {
  const aditionalFieldValidations: any = isEdit
    ? {}
    : {
        password: Yup.string()
          .matches(
            /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            "La contraseña es muy debil"
          )
          .required("La contraseña es requerida"),
      };

  return (
    <div className={className}>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          ...aditionalFieldValidations,
          name: Yup.string().max(20).required("El nombre es requerido"),
          lastname: Yup.string().max(20).required("El apellido es requerido"),
          identification: Yup.string()
            .min(8)
            .max(20)
            .required("La cedula es requerida"),
          email: Yup.string().max(30).required("El email es requerido"),
          hospital: Yup.string().required("El hospital es requerido"),
          role: Yup.string()
            .typeError("El rol es invalido")
            .required("El rol es requerido"),
        })}
        onSubmit={onSubmit as any}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <MainCard className={"form-data"} title={title}>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="name"
                  label="Nombre de empleado"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  helperText={touched.name ? errors.name : ""}
                  error={touched.name && !!errors.name}
                  name="name"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="lastname"
                  label="Apellido de empleado"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastname}
                  helperText={touched.lastname ? errors.lastname : ""}
                  error={touched.lastname && !!errors.lastname}
                  name="lastname"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="identification"
                  label="Cedula de empleado"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.identification}
                  helperText={
                    touched.identification ? errors.identification : ""
                  }
                  error={touched.identification && !!errors.identification}
                  name="identification"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="email"
                  label="Email de empleado"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && !!errors.email}
                  name="email"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="hospital"
                  label="Hospital de empleado"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.hospital}
                  helperText={touched.hospital ? errors.hospital : ""}
                  error={touched.hospital && !!errors.hospital}
                  name="hospital"
                />
              </FormControl>
              <SelectField
                fullWidth={true}
                className="field-form"
                name="role"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Rol de empleado"
                options={[
                  {
                    label: "Administrador",
                    value: "admin",
                  },
                  {
                    label: "Especialista",
                    value: "specialist",
                  },
                  {
                    label: "Asistente",
                    value: "assistant",
                  },
                ]}
                helperText={touched.role ? errors.role : ""}
                error={touched.role && !!errors.role}
                isAutocomplete={USE_AUTOCOMPLETES}
                value={values.role}
              />
              {!isEdit && (
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="password"
                    label="Contraseña del empleado"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && !!errors.password}
                    name="password"
                  />
                </FormControl>
              )}
            </MainCard>
            <MainCard className={"form-data flex-column"}>
              {errors.submit && (
                <FormHelperText error>{errors.submit}</FormHelperText>
              )}
              <Button variant="outlined" type="submit" color="primary">
                Guardar
              </Button>
            </MainCard>
          </form>
        )}
      </Formik>
    </div>
  );
};

interface Props {
  className?: string;
  onSubmit: OnSubmit;
  title: string;
  initialValues: FormValues;
  isEdit?: boolean;
}

export type FormValues = {
  name: string;
  lastname: string;
  identification: string;
  email: string;
  hospital: string;
  password: string;
  role: string;
  submit: string | null;
};

export type OnSubmit = (
  values: FormValues,
  helpers: FormikHelpers<FormValues>
) => void | Promise<any>;

export default styled(Form)`
  display: flex;
  flex-direction: column;

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .field-form {
    margin: 6px 0px;
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

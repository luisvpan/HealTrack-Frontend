import dayjs from "dayjs";
import * as Yup from "yup";
import { FunctionComponent } from "react";
import { Formik, FormikHelpers } from "formik";
import SelectField from "components/SelectField";
import MainCard from "components/cards/MainCard";
import useEmployeesOptions from "core/employees/use-employees-options";
import useHospitalOptions from "core/hospitals/use-hospitals-options";
import useSurgeryOptions from "core/surgeries/use-surgery-options";
// material-ui
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import styled from "styled-components";

const USE_AUTOCOMPLETES = false;

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  isEdit,
}) => {
  const employeeOptions = useEmployeesOptions();
  const hospitalOptions = useHospitalOptions();
  const surgeryOptions = useSurgeryOptions();
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
          name: Yup.string().max(50).required("El nombre es requerido"),
          lastname: Yup.string().max(50).required("El apellido es requerido"),
          age: Yup.number().required("La edad es requerida"),
          sex: Yup.string().oneOf(["M", "F"]).required("El sexo es requerido"),
          address: Yup.string().required("La direccion es requerida"),
          personalPhone: Yup.string().required("El celular es requerido"),
          homePhone: Yup.string().required("El telefono es requerido"),
          identification: Yup.string()
            .min(4)
            .max(20)
            .required("La cedula es requerida"),
          email: Yup.string().max(120).required("El email es requerido"),
          hospital: Yup.string().required("El hospital es requerido"),
          surgeryProcedure: Yup.string().required(
            "El nombre del procedimiento es requerido"
          ),
          surgeryType: Yup.string()
            .typeError("El tipo de procedimiento es invalido")
            .required("El tipo de procedimiento es requerido"),
          surgeryDate: Yup.string().required(
            "La fecha de la cirugia es requerida"
          ),
          medicId: Yup.number()
            .typeError("El especialista es invalido")
            .required("El especialista es requerido"),
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
                  label="Nombre de paciente"
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
                  label="Apellido de paciente"
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
                  id="age"
                  label="Edad de paciente"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.age}
                  helperText={touched.age ? errors.age : ""}
                  error={touched.age && !!errors.age}
                  name="age"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <SelectField
                  fullWidth={true}
                  className="field-form"
                  name="sex"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Sexo"
                  options={[
                    { label: "Masculino", value: "M" },
                    { label: "Femenino", value: "F" },
                  ]}
                  helperText={touched.sex ? errors.sex : ""}
                  error={touched.sex && !!errors.sex}
                  value={values.sex}
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="address"
                  label="Dirección de paciente"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  helperText={touched.address ? errors.address : ""}
                  error={touched.address && !!errors.address}
                  name="address"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="personalPhone"
                  label="Celular de paciente"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.personalPhone}
                  helperText={touched.personalPhone ? errors.personalPhone : ""}
                  error={touched.personalPhone && !!errors.personalPhone}
                  name="personalPhone"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="homePhone"
                  label="Telefono de la casa del paciente"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.homePhone}
                  helperText={touched.homePhone ? errors.homePhone : ""}
                  error={touched.homePhone && !!errors.homePhone}
                  name="homePhone"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="identification"
                  label="Cedula de paciente"
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
                  label="Email de paciente"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && !!errors.email}
                  name="email"
                />
              </FormControl>
              <SelectField
                fullWidth={true}
                className="field-form"
                name="hospital"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Hospital de paciente"
                options={hospitalOptions}
                helperText={touched.hospital ? errors.hospital : ""}
                error={touched.hospital && !!errors.hospital}
                value={values.hospital}
              />
              <SelectField
                fullWidth={true}
                className="field-form"
                name="medicId"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Especialista encargado"
                options={employeeOptions}
                helperText={touched.medicId ? errors.medicId : ""}
                error={touched.medicId && !!errors.medicId}
                isAutocomplete={USE_AUTOCOMPLETES}
                value={values.medicId}
              />
              <FormControl
                className="form-data field-form"
                error={touched.surgeryDate && !!errors.surgeryDate}
                fullWidth
              >
                <DatePicker
                  label="Fecha de cirugia"
                  value={dayjs(values.surgeryDate)}
                  onChange={(newValue: any) => {
                    const newValueFormatted = newValue.format("YYYY-MM-DD"); //'DD-MM-AAAA'
                    handleChange({
                      target: {
                        name: "surgeryDate",
                        id: "surgeryDate",
                        value: newValueFormatted || null,
                      } as any,
                    } as any);
                  }}
                />
                {touched.surgeryDate && !!errors.surgeryDate && (
                  <FormHelperText error>
                    {touched.surgeryDate ? errors.surgeryDate : ""}
                  </FormHelperText>
                )}
              </FormControl>
              <SelectField
                fullWidth={true}
                className="field-form"
                name="surgeryProcedure"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Nombre de procedimiento"
                options={surgeryOptions} // Utiliza las opciones de procedimientos quirúrgicos
                helperText={touched.surgeryProcedure ? errors.surgeryProcedure : ""}
                error={touched.surgeryProcedure && !!errors.surgeryProcedure}
                value={values.surgeryProcedure}
              />
              <SelectField
                fullWidth={true}
                className="field-form"
                name="surgeryType"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Tipo de cirugia"
                options={[
                  {
                    label: "Electiva",
                    value: "A",
                  },
                  {
                    label: "Emergencia",
                    value: "B",
                  },
                ]}
                helperText={touched.surgeryType ? errors.surgeryType : ""}
                error={touched.surgeryType && !!errors.surgeryType}
                isAutocomplete={USE_AUTOCOMPLETES}
                value={values.surgeryType}
              />
              {!isEdit && (
                <FormControl className="field-form" fullWidth>
                  <TextField
                    id="password"
                    label="Contraseña del paciente"
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
  age: number;
  sex: string;
  address: string;
  personalPhone: string;
  homePhone: string;
  email: string;
  identification: string;
  hospital: string;
  password: string;
  surgeryDate: string;
  surgeryProcedure: string;
  surgeryType: string;
  medicId: number | null;
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

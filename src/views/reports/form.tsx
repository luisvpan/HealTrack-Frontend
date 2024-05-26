import dayjs from "dayjs";
import * as Yup from "yup";
import { FunctionComponent } from "react";
import { Formik, FormikHelpers } from "formik";
import SelectField from "components/SelectField";
import MainCard from "components/cards/MainCard";
import useEmployeesOptions from "core/employees/use-employees-options";
// material-ui
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import styled from "styled-components";
import { User } from "core/users/types";
import { display } from "@mui/system";

const USE_AUTOCOMPLETES = false;

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  isEdit,
}) => {
  return (
    <div className={className}>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValues}
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
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "40px" }}
              >
                {" "}
                <FormControl className="field-form" fullWidth>
                  <Typography sx={{ textAlign: "center", fontSize: "16px" }}>
                    ¿Tiene temperatura mayor de 38,5 °C?
                  </Typography>
                  <RadioGroup
                    name="hasHighTemperature"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: "40px",
                    }}
                    onChange={handleChange}
                    value={values.hasHighTemperature}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Sí"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <Typography sx={{ textAlign: "center", fontSize: "16px" }}>
                    ¿Tiene enrojecimiento alrededor de la herida operatoria?
                  </Typography>
                  <RadioGroup
                    name="hasRedness"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: "40px",
                    }}
                    onChange={handleChange}
                    value={values.hasRedness}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Sí"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <Typography sx={{ textAlign: "center", fontSize: "16px" }}>
                    ¿Tiene hinchazón en la herida operatoria?
                  </Typography>
                  <RadioGroup
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: "40px",
                    }}
                    onChange={handleChange}
                    value={values.hasSwelling}
                    name="hasSwelling"
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Sí"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl className="field-form" fullWidth>
                  <Typography sx={{ textAlign: "center", fontSize: "16px" }}>
                    ¿Presenta secreciones que salen a través de la herida
                    operatoria?
                  </Typography>
                  <RadioGroup
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: "40px",
                    }}
                    value={values.hasSecretions}
                    onChange={handleChange}
                    name="hasSecretions"
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Sí"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
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
  id: number;
  isRespondingForEmployee: boolean;
  hasHighTemperature: boolean;
  hasRedness: boolean;
  hasSwelling: boolean;
  hasSecretions: boolean;
  fileUrl: string | null;
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

import { FunctionComponent } from "react";
import { Formik, FormikHelpers } from "formik";
import MainCard from "components/cards/MainCard";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import styled from "styled-components";

const AppForm: FunctionComponent<Props> = ({ className, onSubmit, initialValues, title }) => {
  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <MainCard className={"form-data"} title={title}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                
                {/* Pregunta 1 */}
                <FormControl className="field-form" fullWidth>
                  <Typography variant="h3" sx={{ textAlign: "center" }}>
                    Me gustaría usar esta herramienta más frecuentemente
                  </Typography>
                  <RadioGroup
                    name="likeApp"
                    onChange={handleChange}
                    value={values.likeApp}
                  >
                    <FormControlLabel value="Totalmente de acuerdo" control={<Radio />} label="Totalmente de acuerdo" />
                    <FormControlLabel value="De acuerdo" control={<Radio />} label="De acuerdo" />
                    <FormControlLabel value="Neutral" control={<Radio />} label="Ni de acuerdo, ni en desacuerdo" />
                    <FormControlLabel value="En desacuerdo" control={<Radio />} label="En desacuerdo" />
                    <FormControlLabel value="Totalmente en desacuerdo" control={<Radio />} label="Totalmente en desacuerdo" />
                  </RadioGroup>
                </FormControl>

                {/* Pregunta 2 */}
                <FormControl className="field-form" fullWidth>
                  <Typography variant="h3" sx={{ textAlign: "center" }}>
                    Considero que esta herramienta es innecesariamente compleja
                  </Typography>
                  <RadioGroup
                    name="innescesaryDificultToUse"
                    onChange={handleChange}
                    value={values.innescesaryDificultToUse}
                  >
                    <FormControlLabel value="Totalmente de acuerdo" control={<Radio />} label="Totalmente de acuerdo" />
                    <FormControlLabel value="De acuerdo" control={<Radio />} label="De acuerdo" />
                    <FormControlLabel value="Neutral" control={<Radio />} label="Ni de acuerdo, ni en desacuerdo" />
                    <FormControlLabel value="En desacuerdo" control={<Radio />} label="En desacuerdo" />
                    <FormControlLabel value="Totalmente en desacuerdo" control={<Radio />} label="Totalmente en desacuerdo" />
                  </RadioGroup>
                </FormControl>

                {/* Pregunta 3 */}
                <FormControl className="field-form" fullWidth>
                  <Typography variant="h3" sx={{ textAlign: "center" }}>
                    Considero que la herramienta es fácil de usar
                  </Typography>
                  <RadioGroup
                    name="easyToUse"
                    onChange={handleChange}
                    value={values.easyToUse}
                  >
                    <FormControlLabel value="Totalmente de acuerdo" control={<Radio />} label="Totalmente de acuerdo" />
                    <FormControlLabel value="De acuerdo" control={<Radio />} label="De acuerdo" />
                    <FormControlLabel value="Neutral" control={<Radio />} label="Ni de acuerdo, ni en desacuerdo" />
                    <FormControlLabel value="En desacuerdo" control={<Radio />} label="En desacuerdo" />
                    <FormControlLabel value="Totalmente en desacuerdo" control={<Radio />} label="Totalmente en desacuerdo" />
                  </RadioGroup>
                </FormControl>

                {/* Pregunta 4 */}
                <FormControl className="field-form" fullWidth>
                  <Typography variant="h3" sx={{ textAlign: "center" }}>
                    Considero necesario el apoyo de personal experto para poder utilizar esta herramienta
                  </Typography>
                  <RadioGroup
                    name="needExpertSupport"
                    onChange={handleChange}
                    value={values.needExpertSupport}
                  >
                    <FormControlLabel value="Totalmente de acuerdo" control={<Radio />} label="Totalmente de acuerdo" />
                    <FormControlLabel value="De acuerdo" control={<Radio />} label="De acuerdo" />
                    <FormControlLabel value="Neutral" control={<Radio />} label="Ni de acuerdo, ni en desacuerdo" />
                    <FormControlLabel value="En desacuerdo" control={<Radio />} label="En desacuerdo" />
                    <FormControlLabel value="Totalmente en desacuerdo" control={<Radio />} label="Totalmente en desacuerdo" />
                  </RadioGroup>
                </FormControl>

                {/* Pregunta 5 */}
                <FormControl className="field-form" fullWidth>
                  <Typography variant="h3" sx={{ textAlign: "center" }}>
                    Considero que las funciones de la herramienta están bien integradas
                  </Typography>
                  <RadioGroup
                    name="wellIntegratedFunctions"
                    onChange={handleChange}
                    value={values.wellIntegratedFunctions}
                  >
                    <FormControlLabel value="Totalmente de acuerdo" control={<Radio />} label="Totalmente de acuerdo" />
                    <FormControlLabel value="De acuerdo" control={<Radio />} label="De acuerdo" />
                    <FormControlLabel value="Neutral" control={<Radio />} label="Ni de acuerdo, ni en desacuerdo" />
                    <FormControlLabel value="En desacuerdo" control={<Radio />} label="En desacuerdo" />
                    <FormControlLabel value="Totalmente en desacuerdo" control={<Radio />} label="Totalmente en desacuerdo" />
                  </RadioGroup>
                </FormControl>

                {/* Pregunta 6 */}
                <FormControl className="field-form" fullWidth>
                  <Typography variant="h3" sx={{ textAlign: "center" }}>
                    Considero que la herramienta presenta muchas contradicciones
                  </Typography>
                  <RadioGroup
                    name="manyContradictions"
                    onChange={handleChange}
                    value={values.manyContradictions}
                  >
                    <FormControlLabel value="Totalmente de acuerdo" control={<Radio />} label="Totalmente de acuerdo" />
                    <FormControlLabel value="De acuerdo" control={<Radio />} label="De acuerdo" />
                    <FormControlLabel value="Neutral" control={<Radio />} label="Ni de acuerdo, ni en desacuerdo" />
                    <FormControlLabel value="En desacuerdo" control={<Radio />} label="En desacuerdo" />
                    <FormControlLabel value="Totalmente en desacuerdo" control={<Radio />} label="Totalmente en desacuerdo" />
                  </RadioGroup>
                </FormControl>

                {/* Pregunta 7 */}
                <FormControl className="field-form" fullWidth>
                  <Typography variant="h3" sx={{ textAlign: "center" }}>
                    Imagino que la mayoría de las personas aprenderían a usar esta herramienta rápidamente
                  </Typography>
                  <RadioGroup
                    name="peopleLearnQuickly"
                    onChange={handleChange}
                    value={values.peopleLearnQuickly}
                  >
                    <FormControlLabel value="Totalmente de acuerdo" control={<Radio />} label="Totalmente de acuerdo" />
                    <FormControlLabel value="De acuerdo" control={<Radio />} label="De acuerdo" />
                    <FormControlLabel value="Neutral" control={<Radio />} label="Ni de acuerdo, ni en desacuerdo" />
                    <FormControlLabel value="En desacuerdo" control={<Radio />} label="En desacuerdo" />
                    <FormControlLabel value="Totalmente en desacuerdo" control={<Radio />} label="Totalmente en desacuerdo" />
                  </RadioGroup>
                </FormControl>

                {/* Pregunta 8 */}
                <FormControl className="field-form" fullWidth>
                  <Typography variant="h3" sx={{ textAlign: "center" }}>
                    Considero que el uso de esta herramienta es tedioso
                  </Typography>
                  <RadioGroup
                    name="tediousToUse"
                    onChange={handleChange}
                    value={values.tediousToUse}
                  >
                    <FormControlLabel value="Totalmente de acuerdo" control={<Radio />} label="Totalmente de acuerdo" />
                    <FormControlLabel value="De acuerdo" control={<Radio />} label="De acuerdo" />
                    <FormControlLabel value="Neutral" control={<Radio />} label="Ni de acuerdo, ni en desacuerdo" />
                    <FormControlLabel value="En desacuerdo" control={<Radio />} label="En desacuerdo" />
                    <FormControlLabel value="Totalmente en desacuerdo" control={<Radio />} label="Totalmente en desacuerdo" />
                  </RadioGroup>
                </FormControl>

                {/* Pregunta 9 */}
                <FormControl className="field-form" fullWidth>
                  <Typography variant="h3" sx={{ textAlign: "center" }}>
                    Me sentí muy confiado al usar la herramienta
                  </Typography>
                  <RadioGroup
                    name="feltConfidentUsing"
                    onChange={handleChange}
                    value={values.feltConfidentUsing}
                  >
                    <FormControlLabel value="Totalmente de acuerdo" control={<Radio />} label="Totalmente de acuerdo" />
                    <FormControlLabel value="De acuerdo" control={<Radio />} label="De acuerdo" />
                    <FormControlLabel value="Neutral" control={<Radio />} label="Ni de acuerdo, ni en desacuerdo" />
                    <FormControlLabel value="En desacuerdo" control={<Radio />} label="En desacuerdo" />
                    <FormControlLabel value="Totalmente en desacuerdo" control={<Radio />} label="Totalmente en desacuerdo" />
                  </RadioGroup>
                </FormControl>

                {/* Pregunta 10 */}
                <FormControl className="field-form" fullWidth>
                  <Typography variant="h3" sx={{ textAlign: "center" }}>
                    Necesité saber bastantes cosas antes de poder empezar a usar esta herramienta
                  </Typography>
                  <RadioGroup
                    name="neededKnowledgeBeforeUse"
                    onChange={handleChange}
                    value={values.neededKnowledgeBeforeUse}
                  >
                    <FormControlLabel value="Totalmente de acuerdo" control={<Radio />} label="Totalmente de acuerdo" />
                    <FormControlLabel value="De acuerdo" control={<Radio />} label="De acuerdo" />
                    <FormControlLabel value="Neutral" control={<Radio />} label="Ni de acuerdo, ni en desacuerdo" />
                    <FormControlLabel value="En desacuerdo" control={<Radio />} label="En desacuerdo" />
                    <FormControlLabel value="Totalmente en desacuerdo" control={<Radio />} label="Totalmente en desacuerdo" />
                  </RadioGroup>
                </FormControl>

                {/* Sección de comentarios adicionales */}
                <FormControl className="field-form" fullWidth>
                  <Typography variant="h3" sx={{ textAlign: "center" }}>
                    ¿Hay algo más que te gustaría agregar para mejorar nuestra aplicación?
                  </Typography>
                  <TextField
                    id="additionalInformation"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.additionalInformation}
                    name="additionalInformation"
                    multiline
                    rows={4}
                  />
                </FormControl>
              </Box>
            </MainCard>
            <MainCard className={"form-data flex-column"}>
              {errors.submit && (
                <FormHelperText error>{errors.submit}</FormHelperText>
              )}
              <Button variant="outlined" type="submit" color="primary">
                Enviar
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
  likeApp: string;
  innescesaryDificultToUse: string;
  easyToUse: string;
  needExpertSupport: string;
  wellIntegratedFunctions: string;
  manyContradictions: string;
  peopleLearnQuickly: string;
  tediousToUse: string;
  feltConfidentUsing: string;
  neededKnowledgeBeforeUse: string;
  additionalInformation: string;
  submit: string | null;
};

export type OnSubmit = (
  values: FormValues,
  helpers: FormikHelpers<FormValues>
) => void | Promise<any>;

export default styled(AppForm)`
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
`;

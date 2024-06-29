import Table from "./table";
import useData from "./useData";
import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { IconCirclePlus } from "@tabler/icons";
import MainCard from "components/cards/MainCard";
import { Button, FormControl, Typography } from "@mui/material";
import { FunctionComponent, useCallback } from "react";
import SelectField from "components/SelectField";
import { StatusPatientOptions } from "core/patients/types";
import store from "store";

const Patients: FunctionComponent<Prop> = ({ className }) => {
  const { items, fetchPatients, status, setStatus } = useData();
  const navigate = useNavigate();
  const role = store.getState().auth.user?.role;
  const goToCreate = useCallback(() => {
    navigate("/patients/create");
  }, [navigate]);

  return (
    <MainCard
      className={className}
      headerClass={"patients-header"}
      title={
        <div className={"patients-header"}>
          <Typography variant="h3" className={"title-header"}>
            Pacientes
          </Typography>
          <FormControl className={"field-form-header-container"}>
            <SelectField
              className="field-form-header"
              fullWidth={true}
              name="status"
              onChange={(e) => {
                setStatus(String(e.target.value));
              }}
              label="Estado"
              options={StatusPatientOptions}
              error={false}
              isAutocomplete={false}
              value={status}
            />
          </FormControl>
          <Button
            color="primary"
            variant={"outlined"}
            onClick={goToCreate}
            startIcon={<IconCirclePlus />}
            sx={role !== "assistant" ? { display: "none" } : null}
          >
            Crear
          </Button>
        </div>
      }
    >
      <Table items={items} fetchItems={fetchPatients} />
    </MainCard>
  );
};

interface Prop {
  className?: string;
}

export default styled(Patients)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .field-form-header-container {
    width: 300px;
  }

  .patients-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;

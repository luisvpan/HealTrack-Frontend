import store from "store";
import Table from "./table";
import useData from "./useData";
import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { AllRole } from "core/users/types";
import { IconCirclePlus } from "@tabler/icons";
import MainCard from "components/cards/MainCard";
import SelectField from "components/SelectField";
import { DatePicker } from "@mui/x-date-pickers";
import { FunctionComponent, useCallback } from "react";
import { Button, FormControl, Typography } from "@mui/material";
import usePatientsOptions from "core/patients/use-patients-options";
import dayjs from "dayjs";

const Reports: FunctionComponent<Prop> = ({ className }) => {
  const userRole = store.getState().auth.user?.role;
  const patientOptions = usePatientsOptions();
  const {
    items,
    fetchReports,
    setPatientId,
    patientId,
    setStartDate,
    startDate,
    setEndDate,
    endDate,
  } = useData();
  const navigate = useNavigate();

  const goToCreate = useCallback(() => {
    navigate("/reports/create");
  }, [navigate]);

  return (
    <MainCard
      className={className}
      headerClass={"reports-header"}
      title={
        <div className={"reports-header"}>
          <Typography variant="h3" className={"title-header"}>
            Reportes
          </Typography>
          <div>
            <FormControl className={"field-form-header-container"}>
              <DatePicker
                label="Desde"
                value={dayjs(startDate)}
                format="YYYY-MM-DD"
                slotProps={{
                  field: { clearable: true, onClear: () => setStartDate("") },
                }}
                onChange={(newValue: any) => {
                  if (!!newValue) {
                    setStartDate(newValue?.format("YYYY-MM-DD"));
                  }
                }}
              />
            </FormControl>
            <FormControl className={"field-form-header-container"}>
              <DatePicker
                label="Hasta"
                value={dayjs(endDate)}
                format="YYYY-MM-DD"
                slotProps={{
                  field: { clearable: true, onClear: () => setEndDate("") },
                }}
                onChange={(newValue: any) => {
                  if (!!newValue) {
                    setEndDate(newValue?.format("YYYY-MM-DD"));
                  }
                }}
              />
            </FormControl>
            {userRole !== AllRole.PATIENT && (
              <FormControl className={"field-form-header-container"}>
                <SelectField
                  className="field-form-header"
                  fullWidth={true}
                  name="userId"
                  onChange={(e) => {
                    setPatientId(Number(e.target.value));
                  }}
                  label="Paciente"
                  options={patientOptions}
                  error={false}
                  isAutocomplete={false}
                  value={patientId}
                />
              </FormControl>
            )}
          </div>
          <Button
            color="primary"
            variant={"outlined"}
            onClick={goToCreate}
            startIcon={<IconCirclePlus />}
          >
            Crear
          </Button>
        </div>
      }
    >
      <Table items={items} fetchItems={fetchReports} />
    </MainCard>
  );
};

interface Prop {
  className?: string;
}

export default styled(Reports)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .field-form-header-container {
    width: 200px;
    margin: 5px 10px;
  }

  .reports-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;

import Table from "./table";
import useData from "./useData";
import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { IconCirclePlus, IconDownload } from "@tabler/icons";
import MainCard from "components/cards/MainCard";
import { Button, FormControl, Typography } from "@mui/material";
import { FunctionComponent, useCallback } from "react";
import SelectField from "components/SelectField";
import { StatusPatientOptions } from "core/patients/types";
import store from "store";
import { exportPanicButtonCounts } from "services/notifications/export-panic-button-count";
import { useAppSelector } from 'store';
import { AllRole } from "core/users/types";

const Patients: FunctionComponent<Prop> = ({ className }) => {
  const { items, fetchPatients, status, setStatus } = useData();
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const role = store.getState().auth.user?.role;

  const goToCreate = useCallback(() => {
    navigate("/patients/create");
  }, [navigate]);

  const handleExport = async () => {
    try {
      const blob = await exportPanicButtonCounts();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      // Obtener la fecha actual
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();

      // Formatear el nombre del archivo
      const fileName = `pacientes-panic-button-count-${day}_${month}_${year}.xlsx`;

      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting patient panic button counts:", error);
    }
  };

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
          {user?.role === AllRole.ADMIN && (
            <Button
              color="primary"
              variant={"outlined"}
              onClick={handleExport}
              startIcon={<IconDownload />}
              style={{ marginLeft: "10px" }}
            >
              Exportar
            </Button>
          )}
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

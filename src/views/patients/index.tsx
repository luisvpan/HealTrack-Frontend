import Table from "./table";
import useData from "./useData";
import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { IconCirclePlus } from "@tabler/icons";
import MainCard from "components/cards/MainCard";
import { Button, Typography } from "@mui/material";
import { FunctionComponent, useCallback } from "react";

const Patients: FunctionComponent<Prop> = ({ className }) => {
  const { items, fetchPatients } = useData();
  const navigate = useNavigate();

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

  .patients-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;

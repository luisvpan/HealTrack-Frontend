import Table from "./table";
import useData from "./useData";
import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { IconCirclePlus } from "@tabler/icons";
import MainCard from "components/cards/MainCard";
import { Button, Typography } from "@mui/material";
import { FunctionComponent, useCallback } from "react";

const Employees: FunctionComponent<Prop> = ({ className }) => {
  const { items, fetchEmployees } = useData();
  const navigate = useNavigate();

  const goToCreate = useCallback(() => {
    navigate("/employees/create");
  }, [navigate]);

  return (
    <MainCard
      className={className}
      headerClass={"employees-header"}
      title={
        <div className={"employees-header"}>
          <Typography variant="h3" className={"title-header"}>
            Empleados
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
      <Table items={items} fetchItems={fetchEmployees} />
    </MainCard>
  );
};

interface Prop {
  className?: string;
}

export default styled(Employees)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .employees-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;

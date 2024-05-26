import Table from "./table";
import useData from "./useData";
import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { IconCirclePlus } from "@tabler/icons";
import MainCard from "components/cards/MainCard";
import { Button, Typography } from "@mui/material";
import { FunctionComponent, useCallback } from "react";

const Reports: FunctionComponent<Prop> = ({ className }) => {
  const { items, fetchReports } = useData();
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

  .reports-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;

import Table from "./table";
import useData from "./useData";
import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { IconCirclePlus } from "@tabler/icons";
import MainCard from "components/cards/MainCard";
import { Button, Typography } from "@mui/material";
import { FunctionComponent, useCallback } from "react";

const Surgeries: FunctionComponent<Prop> = ({ className }) => {
  const { items, fetchSurgeries } = useData();
  const navigate = useNavigate();

  const goToCreate = useCallback(() => {
    navigate("/surgeries/create");
  }, [navigate]);

  return (
    <MainCard
      className={className}
      headerClass={"surgeries-header"}
      title={
        <div className={"surgeries-header"}>
          <Typography variant="h3" className={"title-header"}>
            Cirugías
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
      <Table items={items} fetchItems={fetchSurgeries} />
    </MainCard>
  );
};

interface Prop {
  className?: string;
}

export default styled(Surgeries)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .surgeries-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;

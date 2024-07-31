import Table from "./table";
import useData from "./useData";
import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { IconCirclePlus } from "@tabler/icons";
import MainCard from "components/cards/MainCard";
import { Button, Typography } from "@mui/material";
import { FunctionComponent, useCallback } from "react";

const Hospitals: FunctionComponent<Prop> = ({ className }) => {
  const { items, fetchHospitals } = useData();
  const navigate = useNavigate();

  const goToCreate = useCallback(() => {
    navigate("/hospitals/create");
  }, [navigate]);

  return (
    <MainCard
      className={className}
      headerClass={"hospitals-header"}
      title={
        <div className={"hospitals-header"}>
          <Typography variant="h3" className={"title-header"}>
            Hospitales
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
      <Table items={items} fetchItems={fetchHospitals} />
    </MainCard>
  );
};

interface Prop {
  className?: string;
}

export default styled(Hospitals)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .hospitals-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;

import { Button, Typography, Pagination } from "@mui/material";
import DynamicTable, { Settings } from "components/DynamicTable";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { AppFormulary } from "core/appForm/types";
import { calculateSatisfactionById } from "services/appForm/satisfaction-percentage-by-id";

const Table: FunctionComponent<Props> = ({
  items,
  className,
  fetchItems,
  setPaginationData,
  paginationData,
}) => {
  const navigate = useNavigate();
  const [satisfactionScores, setSatisfactionScores] = useState<{ [key: number]: number }>({});

  const handleView = useCallback((formId: number) => {
    navigate(`/app-recommendations/detail/${formId}`);
  }, [navigate]);

  // Asegúrate de que paginationData siempre tenga un valor
  const totalPages = paginationData?.totalPages || 0;
  const currentPage = paginationData?.page || 1;

  useEffect(() => {
    const fetchSatisfactionScores = async () => {
      const scores: { [key: number]: number } = {};
      for (const form of items) {
        try {
          const satisfaction = await calculateSatisfactionById(form.id);
          scores[form.id] = satisfaction;
        } catch (error) {
          console.error(`Error al obtener el porcentaje de satisfacción del formulario ID ${form.id}`, error);
        }
      }
      setSatisfactionScores(scores);
    };

    fetchSatisfactionScores();
  }, [items]);

  return (
    <div className={className}>
      <DynamicTable
        headers={[
          {
            columnLabel: "ID del Formulario",
            cellAlignment: "center" as Settings["cellAlignment"],
            onRender: (row: AppFormulary) => (
              <Typography>{row.id}</Typography>
            ),
          },
          {
            columnLabel: "Usuario",
            cellAlignment: "center",
            onRender: (row: AppFormulary) => (
              <Typography>{`${row.user?.name} ${row.user?.lastname}`}</Typography>
            ),
          },
          {
            columnLabel: "Porcentaje de Satisfacción",
            cellAlignment: "center",
            onRender: (row: AppFormulary) => (
              <Typography>
                {satisfactionScores[row.id] !== undefined
                  ? `${(satisfactionScores[row.id] * 100).toFixed(2)}%`
                  : "Cargando..."}
              </Typography>
            ),
          },
          {
            columnLabel: "Acciones",
            cellAlignment: "center",
            onRender: (row: AppFormulary) => (
              <Button
                color="primary"
                onClick={() => handleView(row.id)}
              >
                Ver Contenido
              </Button>
            ),
          },
        ]}
        rows={items}
      />
      <div className={"paginator-container"}>
        <Pagination
          count={totalPages}
          page={currentPage}
          variant="outlined"
          shape="rounded"
          color="primary"
          onChange={(event, page) => {
            setPaginationData({ ...paginationData, page });
            fetchItems(); // Asegúrate de que se carguen los nuevos elementos
          }}
        />
      </div>
    </div>
  );
};

type Props = {
  items: AppFormulary[];
  className?: string;
  fetchItems: () => void;
  setPaginationData: (paginationData: { page: number; totalPages: number }) => void;
  paginationData: { page: number; totalPages: number };
};

export default styled(Table)`
  display: flex;
  flex-direction: column;

  .paginator-container {
    margin-top: 12px;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
`;

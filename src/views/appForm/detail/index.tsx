import { FunctionComponent } from "react";
import Detail from "./detail";
import styled from "styled-components";
import useAppFormId from "./use-appform-id";
import useAppFormularyById from "./use-appformulary-by-id";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const AppFormularyDetail: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const appFormId = useAppFormId();
  const appFormulary = useAppFormularyById(appFormId); // Hook para obtener el formulario por ID

  if (!appFormulary) return <></>;

  const handleBack = () => {
    navigate("/app-recommendations"); // Función para navegar de regreso
  };

  return (
    <div className={className}>
      <Button 
        variant="outlined" // Estilo del botón (puedes cambiarlo si deseas)
        onClick={handleBack} 
        sx={{ margin: "30px", alignSelf: "center" }} // Estilos adicionales para el botón
      >
        Volver a la lista
      </Button>
      <Detail appFormulary={appFormulary} />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(AppFormularyDetail)`
  display: flex;
  flex-direction: column;

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .form-data {
    margin-top: 16px;
  }

  .form-header-card {
    width: 100%;
  }

  .form-header {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`;

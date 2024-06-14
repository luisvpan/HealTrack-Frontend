import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import styled from "styled-components";
// Own
import { FunctionComponent } from "react";

const DialogImage: FunctionComponent<Prop> = ({
  open,
  handleClose,
  className,
  imageUrl,
}) => {
  return (
    <div className={className}>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        aria-labelledby="alert-delete-title"
      >
        <DialogTitle id="alert-delete-title" fontSize={"16px"}>
          Imagen de reporte
        </DialogTitle>
        <DialogContent style={{ display: "flex", justifyContent: "center" }}>
          {imageUrl && (
            <img
              srcSet={imageUrl}
              src={imageUrl}
              alt="Imagen de reporte"
              loading="lazy"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" size="large">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

interface Prop {
  open: boolean;
  handleClose: () => void;
  className?: string;
  imageUrl: string | null;
}

export default styled(DialogImage)`
  display: flex;
  flex-direction: column;
`;

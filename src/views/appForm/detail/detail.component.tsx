import { FunctionComponent, useState } from "react";
import dayjs from "dayjs";
import { Props } from "./types";
import MainCard from "components/cards/MainCard";

// material-ui
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Button, Modal, Box, Card, CardContent } from "@mui/material";

// Estilos para el modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

const Detail: FunctionComponent<Props> = ({ className, appFormulary }) => {
  const createdAt = dayjs(appFormulary.createdAt).format("DD/MM/YYYY");

  // Estado para controlar el modal
  const [openModal, setOpenModal] = useState(false);

  // Funciones para manejar el estado del modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className={className}>
      <div className={"container-form-services"}>
        <MainCard
          title={
            <div className="appformulary-detail-header">
              <Typography variant="h2" className="title-header">
                {`Detalle del formulario del usuario ${appFormulary.user.name}`}
              </Typography>
            </div>
          }
        >
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Fecha de creación:</TableCell>
                  <TableCell align="right">{createdAt}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>¿Te gustaría usar esta herramienta más frecuentemente?</TableCell>
                  <TableCell align="right">{appFormulary.likeApp}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>¿El sistema es fácil de usar?</TableCell>
                  <TableCell align="right">{appFormulary.easyToUse}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>¿Es innecesariamente complejo de usar?</TableCell>
                  <TableCell align="right">{appFormulary.innescesaryDificultToUse}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>¿Necesitaste apoyo de un experto para usar la herramienta?</TableCell>
                  <TableCell align="right">{appFormulary.needExpertSupport}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>¿Las funciones de la herramienta están bien integradas?</TableCell>
                  <TableCell align="right">{appFormulary.wellIntegratedFunctions}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>¿El sistema presenta muchas contradicciones?</TableCell>
                  <TableCell align="right">{appFormulary.manyContradictions}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>¿Imaginas que la mayoría de las personas aprenderían a usar esta herramienta rápidamente?</TableCell>
                  <TableCell align="right">{appFormulary.peopleLearnQuickly}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>¿Consideras tedioso el uso de esta herramienta?</TableCell>
                  <TableCell align="right">{appFormulary.tediousToUse}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>¿Te sentiste confiado al usar la herramienta?</TableCell>
                  <TableCell align="right">{appFormulary.feltConfidentUsing}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>¿Necesitaste saber bastantes cosas antes de empezar a usar la herramienta?</TableCell>
                  <TableCell align="right">{appFormulary.neededKnowledgeBeforeUse}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Comentarios adicionales:</TableCell>
                  <TableCell align="right">
                    {appFormulary.additionalInformation ? (
                      <Button variant="outlined" onClick={handleOpenModal}>
                        Ver Comentarios
                      </Button>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </div>

      {/* Modal para mostrar la información adicional */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h2" gutterBottom sx={{ textAlign: 'center' }}>
            Comentarios adicionales
          </Typography>
          <Card>
            <CardContent sx={{ backgroundColor: 'grey.200' }}>
              <Typography variant="h5">
                {appFormulary.additionalInformation}
              </Typography>
            </CardContent>
          </Card>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button onClick={handleCloseModal} variant="contained" color="primary">
              Cerrar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Detail;
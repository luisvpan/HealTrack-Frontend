import DynamicTable from "components/DynamicTable";
import { Patient } from "core/patients/types";
import { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import getMedicName from "services/patients/get-medic-name";

const TableNewestPatients: FunctionComponent<Props> = ({ items, className }) => {
  const [medicNames, setMedicNames] = useState<{ [key: number]: string }>({});

  // Fetch medic names for all patients
  useEffect(() => {
    const fetchMedicNames = async () => {
      const names: { [key: number]: string } = {};
      for (const patient of items) {
        try {
          const medicName = await getMedicName(patient.id);
          names[patient.id] = medicName;
        } catch (error) {
          console.error(`Error fetching medic name for patient ${patient.id}:`, error);
        }
      }
      setMedicNames(names);
    };

    fetchMedicNames();
  }, [items]);

  return (
    <div className={className}>
      <DynamicTable
        headers={[
          { columnLabel: "Id", fieldName: "id", cellAlignment: "left" },
          { columnLabel: "Nombre", onRender: (row: Patient) => row.user?.name, cellAlignment: "left" },
          { columnLabel: "Apellido", onRender: (row: Patient) => row.user?.lastname, cellAlignment: "left" },
          { columnLabel: "Email", onRender: (row: Patient) => row.user?.email, cellAlignment: "left" },
          { columnLabel: "Cedula", onRender: (row: Patient) => row.user?.identification, cellAlignment: "left" },
          { columnLabel: "Sexo", fieldName: "sex", cellAlignment: "left" },
          { columnLabel: "Enfermero/a", onRender: (row: Patient) => medicNames[row.id] || 'No asignado', cellAlignment: "left" },
          { columnLabel: "Procedimiento quirúrgico", fieldName: "surgeryProcedure", cellAlignment: "left" },
          { columnLabel: "Estado", fieldName: "status", cellAlignment: "left" },
        ]}
        rows={items}
      />
    </div>
  );
};

type Props = {
  items: Patient[];
  className?: string;
};

export default styled(TableNewestPatients)`
  display: flex;
  flex-direction: column;

  .paginator-container {
    margin-top: 12px;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
`;

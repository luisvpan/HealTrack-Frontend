import DynamicTable from "components/DynamicTable";
import { Employee } from "core/employees/types";
import { FunctionComponent } from "react";
import styled from "styled-components";

const TableNewestEmployees: FunctionComponent<Props> = ({ items, className }) => {
  return (
    <div className={className}>
      <DynamicTable
        headers={[
          { columnLabel: "Id", fieldName: "id", cellAlignment: "left" },
          { columnLabel: "Nombre", onRender: (row: Employee) => row.user?.name, cellAlignment: "left" },
          { columnLabel: "Apellido", onRender: (row: Employee) => row.user?.lastname, cellAlignment: "left" },
          { columnLabel: "Email", onRender: (row: Employee) => row.user?.email, cellAlignment: "left" },
          { columnLabel: "Cedula", onRender: (row: Employee) => row.user?.identification, cellAlignment: "left" },
          { columnLabel: "Hospital", onRender: (row: Employee) => row.hospital?.name, cellAlignment: "left" },
          { columnLabel: "Rol", cellAlignment: "left", onRender: (row: Employee) => row.user?.role },
        ]}
        rows={items}
      />
    </div>
  );
};

type Props = {
  items: Employee[];
  className?: string;
};

export default styled(TableNewestEmployees)`
  display: flex;
  flex-direction: column;
  .paginator-container {
    margin-top: 12px;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
`;

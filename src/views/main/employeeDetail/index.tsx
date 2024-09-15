import { FunctionComponent, useState, useEffect } from "react";
import Detail from "./detail";
import styled from "styled-components";
import getEmployeeByUserId from "services/employees/get-employee-by-id-user";
import { useAppSelector } from "store";
import { Employee } from "core/employees/types";

const EmployeeDetail: FunctionComponent<Props> = ({ className }) => {
  const user = useAppSelector((state) => state.auth.user);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (user?.id) {
        try {
          const employeeData = await getEmployeeByUserId(user.id);
          setEmployee(employeeData);
        } catch (error) {
          console.error('Error fetching employee:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [user?.id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!employee) {
    return <div>No se encontró el empleado.</div>;
  }

  return (
    <div className={className}>
      <Detail employee={employee} />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EmployeeDetail)`
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

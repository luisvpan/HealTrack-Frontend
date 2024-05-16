import { SelectOption } from "components/SelectField";
import { Employee } from "core/employees/types";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import getAllEmployees from "services/employees/get-all-employees";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useEmployeesOptions(): SelectOption[] {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const dispatch = useAppDispatch();

  const fetchEmployees = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllEmployees();
      setEmployees(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return employees
    .filter((item) => item.user.role === "specialist")
    .map((employee) => ({
      label: `${employee.user.name} ${employee.user.lastname}`,
      value: employee.id,
    }));
}

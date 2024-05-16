import { useCallback, useEffect, useState } from "react";
// material-ui
import BackendError from "exceptions/backend-error";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import { useAppDispatch } from "../../../store/index";
import { Employee } from "core/employees/types";
import getEmployee from "services/employees/get-employee";

export default function useEmployeeById(employeeId: number | null) {
  const dispatch = useAppDispatch();
  const [employee, setEmployee] = useState<Employee | null>(null);

  const fetchState = useCallback(
    async (employeeId: number) => {
      try {
        dispatch(setIsLoading(true));
        const response = await getEmployee(employeeId);
        setEmployee(response);
      } catch (error) {
        if (error instanceof BackendError)
          dispatch(setErrorMessage(error.getMessage()));
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (employeeId) fetchState(employeeId);
  }, [fetchState, employeeId]);

  return employee;
}

import { useAppDispatch } from "store";
import { Employee } from "core/employees/types";
import BackendError from "exceptions/backend-error";
import getAllEmployees from "services/employees/get-all-employees";

import { useEffect, useState, useCallback } from "react";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useData() {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<Employee[]>([]);

  const fetchEmployees = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllEmployees();
      const formatedEmployees = response.map((item) => {
        return { ...item, ...item.user, id: item.id };
      });
      setItems(formatedEmployees);
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

  return { items, fetchEmployees } as const;
}

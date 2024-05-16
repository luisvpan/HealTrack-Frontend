import { useAppDispatch } from "store";
import { Patient } from "core/patients/types";
import BackendError from "exceptions/backend-error";
import getAllPatients from "services/patients/get-all-patients";

import { useEffect, useState, useCallback } from "react";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useData() {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<Patient[]>([]);

  const fetchPatients = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllPatients();
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
    fetchPatients();
  }, [fetchPatients]);

  return { items, fetchPatients } as const;
}

import store, { useAppDispatch } from "store";
import { Patient } from "core/patients/types";
import BackendError from "exceptions/backend-error";
import getPatientsByEmployee from "services/patients/get-patients-by-employee";

import { useEffect, useState, useCallback } from "react";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";
import getAllPatients from "services/patients/get-all-patients";

export default function useData() {
  const userEmployeeId = store.getState().auth.user?.employee;
  const role = store.getState().auth.user?.role;
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<string>("");
  const [items, setItems] = useState<Patient[]>([]);

  const fetchPatients = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      if (role === "admin") {
        const response = await getAllPatients(status);
        const formatedPatients = response.map((item) => {
          return { ...item, ...item.user, id: item.id };
        });
        setItems(formatedPatients);
        return;
      }

      if (!!userEmployeeId) {
        const response = await getPatientsByEmployee(userEmployeeId, status);
        const formatedPatients = response.map((item) => {
          return { ...item, ...item.user, id: item.id };
        });
        setItems(formatedPatients);
      }
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, role, status, userEmployeeId]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return { items, fetchPatients, setStatus, status } as const;
}

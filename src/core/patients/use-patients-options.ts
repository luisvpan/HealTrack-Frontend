import { Patient } from "./types";
import { AllRole } from "core/users/types";
import store, { useAppDispatch } from "store";
import BackendError from "exceptions/backend-error";
import { SelectOption } from "components/SelectField";
import { useCallback, useEffect, useState } from "react";
import getAllPatients from "services/patients/get-all-patients";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";
import getPatientsByEmployees from "services/patients/get-patients-by-employee";

export default function usePatientsOptions(): SelectOption[] {
  const dispatch = useAppDispatch();
  const role = store.getState().auth.user?.role;
  const userEmployeeId = store.getState().auth.user?.employee;
  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchPatients = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      if (role === AllRole.ADMIN) {
        const response = await getAllPatients();
        setPatients(response);
        return;
      }
      if (!!userEmployeeId) {
        const response = await getPatientsByEmployees(userEmployeeId);
        setPatients(response);
      }
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, role, userEmployeeId]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return patients.map((patient) => ({
    label: `${patient.user.name} ${patient.user.lastname}`,
    value: patient.user.id,
  }));
}

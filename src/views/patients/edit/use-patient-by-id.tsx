import { useCallback, useEffect, useState } from "react";
// material-ui
import BackendError from "exceptions/backend-error";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import { useAppDispatch } from "../../../store/index";
import { Patient } from "core/patients/types";
import getPatient from "services/patients/get-patient";

export default function usePatientById(patientId: number | null) {
  const dispatch = useAppDispatch();
  const [patient, setPatient] = useState<Patient | null>(null);

  const fetchPatients = useCallback(
    async (patientId: number) => {
      try {
        dispatch(setIsLoading(true));
        const response = await getPatient(patientId);
        setPatient(response);
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
    if (patientId) fetchPatients(patientId);
  }, [fetchPatients, patientId]);

  return patient;
}

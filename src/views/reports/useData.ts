import { AllRole } from "core/users/types";
import { Report } from "core/reports/types";
import store, { useAppDispatch } from "store";
import BackendError from "exceptions/backend-error";
import getAllReports from "services/reports/get-all-reports";
import getReportsByUser from "services/reports/get-reports-by-user";
import getReportsByEmployee from "services/reports/get-reports-by-employee";

import { useEffect, useState, useCallback } from "react";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useData() {
  const userId = store.getState().auth.user?.id;
  const userRole = store.getState().auth.user?.role;
  const userEmployeeId = store.getState().auth.user?.employee;
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<Report[]>([]);
  const [patientId, setPatientId] = useState<number>(0);

  const fetchReports = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      if (userRole === AllRole.ADMIN) {
        const response = await getAllReports(patientId);
        setItems(response);
        return;
      }
      if (userRole === AllRole.PATIENT && userId) {
        const response = await getReportsByUser(userId);
        setItems(response);
        return;
      }
      if (userRole !== AllRole.PATIENT && userEmployeeId) {
        const response = await getReportsByEmployee(userEmployeeId, patientId);
        setItems(response);
        return;
      }
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, patientId, userEmployeeId, userId, userRole]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return { items, fetchReports, setPatientId, patientId } as const;
}

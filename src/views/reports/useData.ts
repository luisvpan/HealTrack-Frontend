import { AllRole } from "core/users/types";
import { PaginationData, Report } from "core/reports/types";
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
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 0,
  });
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [patientId, setPatientId] = useState<number>(0);

  const fetchReports = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      if (userRole === AllRole.ADMIN) {
        const response = await getAllReports(
          patientId,
          startDate,
          endDate,
          pagination.limit,
          pagination.page
        );
        setItems(response.data);
        setPagination(response.paginationData);
        return;
      }
      if (userRole === AllRole.PATIENT && userId) {
        const response = await getReportsByUser(
          userId,
          startDate,
          endDate,
          pagination.limit,
          pagination.page
        );
        setItems(response.data);
        setPagination(response.paginationData);
        return;
      }
      if (userRole !== AllRole.PATIENT && userEmployeeId) {
        const response = await getReportsByEmployee(
          userEmployeeId,
          patientId,
          startDate,
          endDate,
          pagination.limit,
          pagination.page
        );
        setItems(response.data);
        setPagination(response.paginationData);
        return;
      }
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [
    dispatch,
    endDate,
    pagination.limit,
    pagination.page,
    patientId,
    startDate,
    userEmployeeId,
    userId,
    userRole,
  ]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    items,
    pagination,
    setPagination,
    fetchReports,
    setPatientId,
    patientId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } as const;
}

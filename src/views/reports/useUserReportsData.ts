import { useAppDispatch } from "store";
import BackendError from "exceptions/backend-error";
import { useEffect, useState, useCallback } from "react";
import { PaginationData, Report } from "core/reports/types";
import getReportsByUser from "services/reports/get-reports-by-user";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useUserReportsData(userId: number) {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<Report[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 0,
  });

  const fetchReports = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      if (userId) {
        const response = await getReportsByUser(
          userId,
          "",
          "",
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
  }, [dispatch, pagination.limit, pagination.page, userId]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    items,
    pagination,
    setPagination,
    fetchReports,
  } as const;
}

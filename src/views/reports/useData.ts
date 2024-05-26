import { useAppDispatch } from "store";
import { Report } from "core/reports/types";
import BackendError from "exceptions/backend-error";
import getAllReports from "services/reports/get-all-reports";

import { useEffect, useState, useCallback } from "react";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useData() {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<Report[]>([]);

  const fetchReports = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllReports();
      setItems(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return { items, fetchReports } as const;
}

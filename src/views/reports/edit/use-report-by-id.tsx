import { useCallback, useEffect, useState } from "react";
// material-ui
import BackendError from "exceptions/backend-error";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import { useAppDispatch } from "../../../store/index";
import { Report } from "core/reports/types";
import getReport from "services/reports/get-report";

export default function useReportById(reportId: number | null) {
  const dispatch = useAppDispatch();
  const [report, setReport] = useState<Report | null>(null);

  const fetchReports = useCallback(
    async (reportId: number) => {
      try {
        dispatch(setIsLoading(true));

        const response = await getReport(reportId);

        setReport(response);
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
    if (reportId) fetchReports(reportId);
  }, [fetchReports, reportId]);

  return report;
}

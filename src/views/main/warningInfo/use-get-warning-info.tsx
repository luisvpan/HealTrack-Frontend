import { useCallback, useEffect, useState } from "react";
import useErrorToast from "components/ErrorToast";
import BackendError from "exceptions/backend-error";
import store from "store";
import checkDailyReport from "services/reports/check-daily-report.service";

const useGetWarningInfo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<boolean>(false);
  const user = store.getState().auth.user;

  const errorToast = useErrorToast();

  const getWarningInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!user?.id || user.role !== "patient") return;
      const response = await checkDailyReport();
      setWarning(response);
    } catch (error) {
      if (error instanceof BackendError) {
        errorToast(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getWarningInfo();
  }, [getWarningInfo]);
  return { isLoading, warning };
};

export default useGetWarningInfo;

import { SelectOption } from "components/SelectField";
import { Surgery } from "core/surgeries/types";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import getAllSurgeries from "services/surgeries/get-all-surgeries";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useSurgeryOptions(): SelectOption[] {
  const [surgeries, setSurgeries] = useState<Surgery[]>([]);
  const dispatch = useAppDispatch();

  const fetchSurgeries = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllSurgeries();
      setSurgeries(response);
    } catch (error) {
      if (error instanceof BackendError) {
        dispatch(setErrorMessage(error.getMessage()));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchSurgeries();
  }, [fetchSurgeries]);

  return surgeries.map((surgery) => ({
    label: surgery.name,
    value: surgery.name,
  }));
}

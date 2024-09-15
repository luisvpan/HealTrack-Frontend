import { useAppDispatch } from "store";
import { Surgery } from "core/surgeries/types";
import BackendError from "exceptions/backend-error";
import getAllSurgeries from "services/surgeries/get-all-surgeries";

import { useEffect, useState, useCallback } from "react";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useData() {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<Surgery[]>([]);

  const fetchSurgeries = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllSurgeries();
      setItems(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchSurgeries();
  }, [fetchSurgeries]);

  return { items, fetchSurgeries } as const;
}

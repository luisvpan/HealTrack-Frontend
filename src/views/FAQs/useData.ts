import { useAppDispatch } from "store";
import { FAQs } from "core/FAQs/types";
import BackendError from "exceptions/backend-error";
import getAllFAQs from "services/FAQs/get-all-FAQs";

import { useEffect, useState, useCallback } from "react";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useData() {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<FAQs[]>([]);

  const fetchFAQs = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllFAQs();
      setItems(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  return { items, fetchFAQs } as const;
}

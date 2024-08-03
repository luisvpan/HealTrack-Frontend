import { useAppDispatch } from "store";
import { Recommendation } from "core/recommendations/types";
import BackendError from "exceptions/backend-error";
import getAllRecommendations from "services/recomendations/get-all-recommendations";

import { useEffect, useState, useCallback } from "react";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useData() {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<Recommendation[]>([]);

  const fetchRecommendations = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllRecommendations();
      setItems(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return { items, fetchRecommendations } as const;
}

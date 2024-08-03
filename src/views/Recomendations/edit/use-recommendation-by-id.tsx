import { useCallback, useEffect, useState } from "react";
// material-ui
import BackendError from "exceptions/backend-error";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import { useAppDispatch } from "../../../store/index";
import { Recommendation } from "core/recommendations/types";
import getRecommendation from "services/recomendations/get-recommendation";

export default function useRecommendationById(recommendationId: number | null) {
  const dispatch = useAppDispatch();
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const fetchState = useCallback(
    async (recommendationId: number) => {
      try {
        dispatch(setIsLoading(true));
        const response = await getRecommendation(String(recommendationId));
        setRecommendation(response);
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
    if (recommendationId) fetchState(recommendationId);
  }, [fetchState, recommendationId]);

  return recommendation;
}

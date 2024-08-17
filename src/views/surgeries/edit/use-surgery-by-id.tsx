import { useCallback, useEffect, useState } from "react";
// material-ui
import BackendError from "exceptions/backend-error";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import { useAppDispatch } from "../../../store/index";
import { Surgery } from "core/surgeries/types"; 
import getSurgery from "services/surgeries/get-surgery"; // Adaptado a getSurgery

export default function useSurgeryById(surgeryId: string | null) { 
  const dispatch = useAppDispatch();
  const [surgery, setSurgery] = useState<Surgery | null>(null);

  const fetchState = useCallback(
    async (surgeryId: string) => { 
      try {
        dispatch(setIsLoading(true));
        const response = await getSurgery(surgeryId); // Adaptado a getSurgery
        setSurgery(response);
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
    if (surgeryId) fetchState(surgeryId);
  }, [fetchState, surgeryId]); 

  return surgery;
}

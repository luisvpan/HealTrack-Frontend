import { useAppDispatch } from "store";
import { Hospital } from "core/hospitals/types";
import BackendError from "exceptions/backend-error";
import getAllHospitals from "services/hospitals/get-all-hospitals";

import { useEffect, useState, useCallback } from "react";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useData() {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<Hospital[]>([]);

  const fetchHospitals = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllHospitals();
      setItems(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchHospitals();
  }, [fetchHospitals]);

  return { items, fetchHospitals } as const;
}

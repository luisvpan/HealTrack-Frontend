import { useCallback, useEffect, useState } from "react";
// material-ui
import BackendError from "exceptions/backend-error";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import { useAppDispatch } from "../../../store/index";
import { Hospital } from "core/hospitals/types";
import getHospital from "services/hospitals/get-hospital";

export default function useHospitalById(hospitalId: string | null) {
  const dispatch = useAppDispatch();
  const [hospital, setHospital] = useState<Hospital | null>(null);

  const fetchState = useCallback(
    async (hospitalId: string) => {
      try {
        dispatch(setIsLoading(true));
        const response = await getHospital(hospitalId);
        setHospital(response);
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
    if (hospitalId) fetchState(hospitalId);
  }, [fetchState, hospitalId]);

  return hospital;
}

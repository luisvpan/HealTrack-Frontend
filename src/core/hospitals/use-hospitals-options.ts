import { SelectOption } from "components/SelectField";
import { Hospital } from "core/hospitals/types";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import getAllHospitals from "services/hospitals/get-all-hospitals";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useHospitalOptions(): SelectOption[] {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const dispatch = useAppDispatch();

  const fetchHospitals = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllHospitals();
      setHospitals(response);
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

  return hospitals.map((hospital) => ({
    label: hospital.name,
    value: hospital.name,
  }));
}

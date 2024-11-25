import { useCallback, useEffect, useState } from "react";
// material-ui
import BackendError from "exceptions/backend-error";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import { useAppDispatch } from "../../../store/index";
import { AppFormulary } from "core/appForm/types";
import getAppForm from "services/appForm/get-appForm";

export default function useAppFormularyById(appFormId: number | null) {
  const dispatch = useAppDispatch();
  const [appFormulary, setAppFormulary] = useState<AppFormulary | null>(null);

  const fetchAppFormulary = useCallback(
    async (appFormId: number) => {
      try {
        dispatch(setIsLoading(true));
        const response = await getAppForm(appFormId); // Llama al servicio adecuado
        setAppFormulary(response);
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
    if (appFormId) fetchAppFormulary(appFormId);
  }, [fetchAppFormulary, appFormId]);

  return appFormulary;
}

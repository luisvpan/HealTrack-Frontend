import { useEffect, useState, useCallback } from "react";
import { PaginationData, AppFormulary } from "core/appForm/types";
import { useAppDispatch } from "store";
import BackendError from "exceptions/backend-error";
import getAllAppForms from "services/appForm/get-all-appForm";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useData() {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<AppFormulary[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 0,
  });

  const fetchFormularies = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));

      if (!pagination || pagination.limit === undefined || pagination.page === undefined) {
        throw new Error("Pagination is not properly defined");
      }

      const response = await getAllAppForms(pagination.limit, pagination.page);

      if (!response || !response.data || !response.paginationData) {
        throw new Error("Invalid response structure");
      }

      setItems(response.data);
      setPagination(response.paginationData);
    } catch (error) {
      if (error instanceof BackendError) {
        dispatch(setErrorMessage(error.getMessage()));
      } else {
        console.error("Error fetching formularies:", error);
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, pagination.page, pagination.limit]);

  // Este efecto se ejecutará cada vez que cambie `pagination.page` o `pagination.limit`
  useEffect(() => {
    fetchFormularies();
  }, [fetchFormularies]); // Solo dependemos de `fetchFormularies`

  return {
    items,
    pagination,
    setPagination,
    fetchFormularies,
  } as const;
}

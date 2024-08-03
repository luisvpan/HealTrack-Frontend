import { useCallback, useEffect, useState } from "react";
// material-ui
import BackendError from "exceptions/backend-error";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import { useAppDispatch } from "../../../store/index";
import { FAQs } from "core/FAQs/types"; 
import getFAQ from "services/FAQs/get-FAQ";

export default function useFAQById(faqId: number | null) {
  const dispatch = useAppDispatch();
  const [faq, setFAQ] = useState<FAQs | null>(null);

  const fetchState = useCallback(
    async (faqId: number) => {
      try {
        dispatch(setIsLoading(true));
        const response = await getFAQ(String(faqId));
        setFAQ(response);
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
    if (faqId) fetchState(faqId);
  }, [fetchState, faqId]);

  return faq;
}

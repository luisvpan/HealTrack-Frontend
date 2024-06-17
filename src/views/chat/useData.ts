import { useAppDispatch } from "store";

import BackendError from "exceptions/backend-error";

import { useEffect, useState, useCallback } from "react";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";
import { Chat } from "core/chats/types";
import getAllChats from "services/chats/get-all-chats.service";

export default function useData() {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<Chat[]>([]);

  const fetchChats = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllChats();
      setItems(response);
      console.log(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return { items, fetchChats } as const;
}

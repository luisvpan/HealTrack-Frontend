import axios from "axios";
import store from "../../store";
import { Chat } from "core/chats/types";
import { API_BASE_URL } from "../../config/constants";
import BackendError from "../../exceptions/backend-error";

// Own

const URL = `${API_BASE_URL}/chats/exists`;

export default async function checkIfChatExists(
  userId1: number,
  userId2: number
): Promise<Chat> {
  try {
    const response = await axios.get(`${URL}/${userId1}/${userId2}`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

import axios from "axios";
import store from "../../store";
import { Chat } from "core/chats/types";
import { API_BASE_URL } from "../../config/constants";
import BackendError from "../../exceptions/backend-error";
// Own

const URL = `${API_BASE_URL}/chats`;

export default async function postChat(
  userId: number,
  userId2: number
): Promise<Chat> {
  try {
    const response = await axios.post(
      `${URL}`,
      {
        users: [
          {
            id: userId,
          },
          {
            id: userId2,
          },
        ],
        title: "chat",
      },
      {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

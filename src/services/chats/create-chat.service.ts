import axios from "axios";
import { API_BASE_URL } from "../../config/constants";
import store from "../../store";
import BackendError from "../../exceptions/backend-error";
// Own

const URL = `${API_BASE_URL}/chats`;

export default async function postChat(userId: number): Promise<any> {
  try {
    const response = await axios.post(
      `${URL}`,
      {
        users: [
          {
            id: userId,
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

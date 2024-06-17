import axios from "axios";
import BackendError from "../../exceptions/backend-error";
import store from "../../store";
import { API_BASE_URL } from "../../config/constants";
// Own

const URL = `${API_BASE_URL}/chats`;

export default async function getMessagesById(otherId: number): Promise<any> {
  try {
    console.log(otherId);
    const response = await axios.get(`${URL}/${otherId}/messages`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

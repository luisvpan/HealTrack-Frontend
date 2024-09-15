import axios from "axios";
import store from "../../store";
import { API_BASE_URL } from "../../config/constants";
import BackendError from "../../exceptions/backend-error";
// Own

const URL = `${API_BASE_URL}/reports`;

export default async function checkDailyReport(): Promise<boolean> {
  try {
    const response = await axios.get<boolean>(`${URL}/reported`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

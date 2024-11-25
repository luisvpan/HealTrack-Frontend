import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/app-formulary`;

export async function calculateTotalSatisfaction(): Promise<number> {
  try {
    const response = await axios.get(`${URL}/satisfaction/total`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data.totalSatisfaction;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
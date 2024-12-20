import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/app-formulary`;

export async function calculateSatisfactionById(formId: number): Promise<number> {
  try {
    const response = await axios.get(`${URL}/satisfaction/${formId}`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data.satisfactionPercentage;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
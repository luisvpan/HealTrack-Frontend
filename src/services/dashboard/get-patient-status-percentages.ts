import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/patients`;

// Function to fetch patient status percentages
export default async function getPatientStatusPercentages() {
  try {
    const response = await axios.get<{ percentages: Array<{ name: string; percentage: string }> }>(
      `${URL}/status-percentages`,
      {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

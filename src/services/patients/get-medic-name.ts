import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/patients`;

export default async function getMedicName(patientId: number): Promise<string> {
  try {
    const response = await axios.get<{ medicName: string }>(`${URL}/${patientId}/medic-name`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data.medicName;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

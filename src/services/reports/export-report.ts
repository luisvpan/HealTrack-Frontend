import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/reports/export`;

export async function exportReports(): Promise<Blob> {
  try {
    const response = await axios.get<Blob>(URL, {
      responseType: 'blob',
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

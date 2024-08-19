import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const EXPORT_URL = `${API_BASE_URL}/database-actions/export`;

export async function exportDatabase(): Promise<Blob> {
  try {
    const response = await axios.get<Blob>(EXPORT_URL, {
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
